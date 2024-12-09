"use client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { createClient } from "@/utils/supabase/client";
import { getUserId } from "@/app/api/handler";
import { UUID } from "crypto";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { getCategories } from "@/app/api/handler";
import { CheckCircle2, XCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type AlertType = "success" | "error" | null;

const hnl = new Intl.NumberFormat("es-HN", {
    style: "currency",
    currency: "HNL",
});

export default function CreateProjectForm() {
    const router = useRouter();

    const [userId, setUserId] = useState<UUID>();
    const [error, setError] = useState<Error | null>(null); // Updated type to Error | null
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [categories, setCategories] = useState<Categories[]>([]);
    const [loading, setLoading] = useState(false);
    const [alertType, setAlertType] = useState<AlertType>(null);
    const [project, setProject] = useState<ProjectInsert>({
        beneficios: "",
        description: "",
        expected_finish_date: "",
        investment_goal: 0,
        location: "",
        name: "",
        producer_id: userId,
        progress: 0,
        project_banner_url: "",
        start_date: "",
        total_invested: 0,
    });
    /*  const [projectCategory, setProjectCategory] = useState<ProjectCategoriesInsert>(); */

    const [bannerFile, setBannerFile] = useState<File | null>(null);
    const [images, setImages] = useState<File[]>([]);

    const supabase = createClient();

    const handleImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files).slice(0, 6); // Limit to 6 files
            setImages(selectedFiles);
        }
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const allCategories = await getCategories();
                setCategories(allCategories);
            } catch (err) {
                console.error("Fetch error:", err);
                if (err instanceof Error) {
                    setError(err);
                } else {
                    setError(new Error("An unknown error occurred."));
                }
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        async function fetchId() {
            try {
                console.log("Fetching user data..."); // Debugging line
                const data = await getUserId();
                setUserId(data.user_id);
                setProject((prev) => ({ ...prev, producer_id: data.user_id }));
            } catch (err) {
                console.error(err); // Log the error
                if (err instanceof Error) {
                    setError(err); // Set the error safely
                } else {
                    setError(new Error("An unknown error occurred.")); // Fallback
                }
            }
        }

        fetchId();
    }, []);

    useEffect(() => {
        const goal = project.investment_goal || 1; // Use 1 as a fallback to avoid division by zero
        const invested = project.total_invested || 0; // Default to 0 if undefined

        setProject((prev) => ({
            ...prev,
            progress: Math.min((invested / goal) * 100, 100),
        }));
    }, [project.total_invested, project.investment_goal]);

    if (error) return <div>Error: {error.message}</div>;
    if (!userId) return <div>Loading...</div>;

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setProject((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setBannerFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (bannerFile) {
            // Generar un nombre único para el archivo del banner
            const uniqueBannerName = `${Date.now()}-${Math.random().toString(36).substring(7)}-${bannerFile.name
                .normalize("NFD") // Descompone caracteres acentuados
                .replace(/[\u0300-\u036f]/g, "") // Elimina los acentos
                .replace(/\s+/g, "_") // Reemplaza espacios con guiones bajos
                .replace(/[^a-zA-Z0-9._-]/g, "")}`; // Elimina caracteres no permitidos

            // Sube la imagen al bucket de Supabase
            const { error: uploadError } = await supabase.storage
                .from("Images_Projects")
                .upload(`banners/${uniqueBannerName}`, bannerFile);

            if (uploadError) {
                console.error("Error al subir la imagen:", uploadError.message);
                setLoading(false);
                setAlertType("error");

                setTimeout(() => {
                    setAlertType(null);
                }, 3000);
                return;
            }

            // Obtener la URL pública de la imagen
            const { data: urlData } = supabase.storage
                .from("Images_Projects")
                .getPublicUrl(`banners/${uniqueBannerName}`);

            const projectBannerUrl = urlData?.publicUrl || "";
            console.log(projectBannerUrl);

            if (!projectBannerUrl) {
                console.error("Error: No se pudo obtener la URL de la imagen");
                setLoading(false);
                setAlertType("error");

                setTimeout(() => {
                    setAlertType(null);
                }, 3000);
                return;
            }

            project.project_banner_url = projectBannerUrl;
        }

        // Inserta los datos del proyecto en la tabla, incluyendo la URL de la imagen
        // Antes de la inserción, ajusta el valor de progress
        const adjustedProgress = Math.round(project.progress ?? 0); // Usa 0 si progress es null o undefined

        try {
            const { data: projectData, error: projectError } = await supabase
                .from("projects")
                .insert([{ ...project, progress: adjustedProgress }])
                .select();

            if (projectError) {
                console.error("Error inserting project:", projectError.message);
                setLoading(false);
                setAlertType("error");

                setTimeout(() => {
                    setAlertType(null);
                }, 3000);
                return;
            }

            if (projectData && projectData.length > 0) {
                const createdProject = projectData[0];
                console.log("createdProject: ", createdProject.project_id);

                // Associate the project with the selected category
                if (selectedCategory) {
                    const { error: categoryError } = await supabase
                        .from("project_categories") // Adjust table name as needed
                        .insert([
                            {
                                project_id: createdProject.project_id,
                                category_id: selectedCategory,
                            },
                        ]);

                    if (categoryError) {
                        console.error(
                            "Error associating project with category:",
                            categoryError.message
                        );
                        setAlertType("error");

                        setTimeout(() => {
                            setAlertType(null);
                        }, 3000);
                    } else {
                        console.log("Category successfully linked to project.");
                    }
                }
            }

            const createdProject = projectData[0];

            // Upload images
            // Upload images
            // Inside handleSubmit function
            const uploadedImageUrls: string[] = [];
            for (const image of images) {
                // Generate a unique filename
                const uniqueFileName = `${Date.now()}-${Math.random().toString(36).substring(7)}-${image.name
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .replace(/\s+/g, "_")
                    .replace(
                        /[^a-zA-Z0-9._-]/g,
                        ""
                    )}.${image.name.split(".").pop()}`;

                const { error: imageError } = await supabase.storage
                    .from("Images_Projects")
                    .upload(`projectImages/${uniqueFileName}`, image);

                if (!imageError) {
                    const { data: imageUrlData } = supabase.storage
                        .from("Images_Projects")
                        .getPublicUrl(`projectImages/${uniqueFileName}`);

                    if (imageUrlData?.publicUrl) {
                        uploadedImageUrls.push(imageUrlData.publicUrl);
                    }
                }
            }

            // Insert image URLs into project_images table
            if (uploadedImageUrls.length > 0) {
                const imageInserts = uploadedImageUrls.map((url) => ({
                    project_id: createdProject.project_id,
                    image_url: url,
                }));

                const { error: imageInsertError } = await supabase
                    .from("project_images")
                    .insert(imageInserts);

                if (imageInsertError) {
                    console.error("Error saving image URLs", imageInsertError);
                    throw new Error("Error saving image URLs");
                }
            }
            setAlertType("success");

            setTimeout(() => {
                setAlertType(null);
                router.push("/dashboard/emprendedores");
            }, 3000);
        } catch (error) {
            console.error("Error creating project:", error);
            setAlertType("error");

            setTimeout(() => {
                setAlertType(null);
            }, 3000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex md:items-stretch md:justify-around flex-col md:flex-row mx-4 lg:mx-8 mb-8 ">
            <div className="md:w-1/2 ">
                <Card className="w-full max-w-2xl mx-auto m-0">
                    <CardHeader>
                        <CardTitle>Crear Un Nuevo Proyecto</CardTitle>
                        <CardDescription>
                            Llene los campos que a continuación se presentan:
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">
                                    Nombre del Proyecto
                                </Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={project.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">Descripción</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    value={project.description ?? ""}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">Beneficios</Label>
                                <Textarea
                                    id="beneficios"
                                    name="beneficios"
                                    value={project.beneficios ?? ""}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="project_banner_url">
                                    Subir un ilustrativo
                                </Label>
                                <Input
                                    id="project_banner_url"
                                    name="project_banner_url"
                                    type="file"
                                    className="cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                    onChange={handleFileChange}
                                    accept="image/*"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="images">
                                    Subir Imágenes del Proyecto (Máximo 6)
                                </Label>
                                <Input
                                    id="images"
                                    name="images"
                                    type="file"
                                    multiple
                                    className="cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                    onChange={handleImagesChange}
                                    accept="image/*"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="start_date">
                                        Fecha de Inicio
                                    </Label>
                                    <Input
                                        id="start_date"
                                        name="start_date"
                                        type="date"
                                        value={project.start_date ?? ""}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="expected_finish_date">
                                        Fecha de Finalización
                                    </Label>
                                    <Input
                                        id="expected_finish_date"
                                        name="expected_finish_date"
                                        type="date"
                                        value={
                                            project.expected_finish_date ?? ""
                                        }
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="investment_goal">
                                        Meta de Inversión
                                    </Label>
                                    <Input
                                        id="investment_goal"
                                        name="investment_goal"
                                        type="number"
                                        step="1.0"
                                        value={project.investment_goal}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="total_invested">
                                        Inversión Inicial
                                    </Label>
                                    <Input
                                        id="total_invested"
                                        name="total_invested"
                                        type="number"
                                        step="1.0"
                                        value={project.total_invested}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="location">Ubicación</Label>
                                <Input
                                    id="location"
                                    name="location"
                                    value={project.location ?? ""}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="block">
                                    Seleccionar Categoria
                                </Label>
                                <select
                                    className="h-10 px-4 py-2 bg-white border border-gray-300 rounded-md"
                                    value={selectedCategory}
                                    onChange={(e) =>
                                        setSelectedCategory(e.target.value)
                                    }
                                >
                                    <option value="">
                                        Seleccionar Categoria
                                    </option>
                                    {categories.map((category) => (
                                        <option
                                            key={category.category_id}
                                            value={category.category_id}
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <CardFooter className="p-0 place-self-center">
                                <Button type="submit" disabled={loading}>
                                    {loading
                                        ? "Creando Nuevo Proyecto..."
                                        : "Crear Proyecto"}
                                </Button>
                            </CardFooter>
                        </form>
                    </CardContent>
                </Card>
                {alertType && (
                    <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
                        <Alert
                            className={`w-80 ${
                                alertType === "success"
                                    ? "border-green-500 bg-green-50 text-green-800"
                                    : "border-red-500 bg-red-50 text-red-800"
                            }`}
                        >
                            {alertType === "success" ? (
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                            ) : (
                                <XCircle className="h-4 w-4 text-red-500" />
                            )}
                            <AlertTitle>
                                {alertType === "success"
                                    ? "¡Exito!"
                                    : "¡Error!"}
                            </AlertTitle>
                            <AlertDescription>
                                {alertType === "success"
                                    ? "El proyecto fue creado correctamente."
                                    : "Ocurrio un error al crear el proyecto. Por favor intentalo de nuevo."}
                            </AlertDescription>
                        </Alert>
                    </div>
                )}
            </div>
            <div className="md:w-1/2 md:ml-6 mt-4 md:mt-0">
                {bannerFile && (
                    <Image
                        className="w-full h-1/3 object-cover rounded-md"
                        src={URL.createObjectURL(bannerFile)}
                        alt="Project Profile Photo"
                        width={500}
                        height={100}
                    />
                )}
                <h1 className="font-bold text-2xl mt-6">{project.name}</h1>
                {project.investment_goal != 0 && (
                    <div className="mb-6 mt-4">
                        <Progress value={project.progress} />
                        <div className="flex mt-2">
                            <p>
                                <strong>Actualmente: </strong>{" "}
                                {hnl.format(project.total_invested as number)}
                            </p>
                            <p className="ml-auto">
                                <strong>Meta: </strong>{" "}
                                {hnl.format(project.investment_goal as number)}
                            </p>
                        </div>
                    </div>
                )}
                {project.location && (
                    <p>
                        <strong>Ubicación:</strong> {project.location}
                    </p>
                )}
                {project.start_date && (
                    <p>
                        <strong>Fecha de Inicio:</strong> {project.start_date}
                    </p>
                )}
                {project.expected_finish_date && (
                    <p>
                        <strong>Fecha de Finalización:</strong>{" "}
                        {project.expected_finish_date}
                    </p>
                )}
                <p className="mt-2">{project.description}</p>
            </div>
        </div>
    );
}
