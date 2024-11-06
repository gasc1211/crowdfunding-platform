"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
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

export default function CreateProjectForm() {
    const router = useRouter();

    const [userId, setUserId] = useState<UUID>();
    const [error, setError] = useState<Error | null>(null); // Updated type to Error | null

    const [loading, setLoading] = useState(false);
    const [project, setProject] = useState<ProjectInsert>({
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

    const [bannerFile, setBannerFile] = useState<File | null>(null);

    const supabase = createClient();

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
            // Reemplazar espacios y caracteres especiales en el nombre del archivo
            // Normalizar el nombre del archivo eliminando espacios y caracteres especiales
            const sanitizedFileName = bannerFile.name
                .normalize("NFD") // Descompone caracteres acentuados
                .replace(/[\u0300-\u036f]/g, "") // Elimina los acentos
                .replace(/\s+/g, "_") // Reemplaza espacios con guiones bajos
                .replace(/[^a-zA-Z0-9._-]/g, ""); // Elimina caracteres no permitidos

            // Sube la imagen al bucket de Supabase
            const { error: uploadError } = await supabase.storage
                .from("Images_Projects")
                .upload(`banners/${sanitizedFileName}`, bannerFile);

            if (uploadError) {
                console.error("Error al subir la imagen:", uploadError.message);
                setLoading(false);
                return;
            }

            // Obtener la URL pública de la imagen
            const { data: urlData } = supabase.storage
                .from("Images_Projects")
                .getPublicUrl(`banners/${sanitizedFileName}`);

            const projectBannerUrl = urlData?.publicUrl || "";
            console.log(projectBannerUrl);

            if (!projectBannerUrl) {
                console.error("Error: No se pudo obtener la URL de la imagen");
                setLoading(false);
                return;
            }
            project.project_banner_url = projectBannerUrl;
        }

        // Inserta los datos del proyecto en la tabla, incluyendo la URL de la imagen
        // Antes de la inserción, ajusta el valor de progress
        const adjustedProgress = Math.round(project.progress ?? 0); // Usa 0 si progress es null o undefined

        try {
            const { data, error } = await supabase
                .from("projects")
                .insert([{ ...project, progress: adjustedProgress }]);

            if (error) {
                console.error("Error al crear el proyecto:", error.message);
            } else {
                console.log("Proyecto creado:", data);
            }

            router.push("/dashboard/inversor"); // Redirect to projects list page
        } catch (error) {
            console.error("Error creating project:", error);
            alert("Error creating project. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <br />
            <br />
            <br />
            <br />
            <Card className="w-full max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Crear Un Nuevo Proyecto</CardTitle>
                    <CardDescription>
                        Llene Los Campos Que Acontinuación Se Presentan Para
                        Crear Un Nuevo Proyecto
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nombre del Proyecto</Label>
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
                            <Label htmlFor="start_date">
                                Subir un ilustrativo
                            </Label>
                            <Input
                                id="img"
                                name="img"
                                type="file"
                                className="cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                onChange={handleFileChange}
                                accept="image/*"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
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
                                        Ficha Final Proyectada
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
                            <Label htmlFor="progress">Progreso (%)</Label>
                            <Input
                                value={project.progress?.toFixed(2)}
                                readOnly
                            />
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
                        <CardFooter className="px-0">
                            <Button type="submit" disabled={loading}>
                                {loading ? "Creating..." : "Crear Proyecto"}
                            </Button>
                        </CardFooter>
                    </form>
                </CardContent>
            </Card>
        </>
    );
}
