"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
// import { UUID } from "crypto";
import { useRouter } from "next/navigation";
import { getUserData } from "@/app/api/handler";
import { createClient } from "@/utils/supabase/client";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, XCircle } from "lucide-react";

export default function Profile() {
    const router = useRouter();
    const [userId, setUserId] = useState<string>();
    const [username, setUsername] = useState<string>("");
    const [, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState(false);
    const [profileImg, setProfileImg] = useState<File | null>(null);
    const [banner, setBanner] = useState<File | null>(null);
    const [dniImage, setDniImage] = useState<File | null>(null);
    const [alertType, setAlertType] = useState<"success" | "error" | null>(
        null
    );
    const supabase = createClient();

    const [producer, setProducer] = useState<ProducerInsert>({
        user_id: userId!,
        profile_image_url: "",
        profile_banner_url: "",
        biography: "",
        location: "",
    });

    useEffect(() => {
        async function fetchId() {
            try {
                console.log("Fetching user data...");
                const data = await getUserData();
                setUserId(data.user_id);
                setUsername(data.username);
                setProducer((prev) => ({ ...prev, user_id: data.user_id }));
            } catch (err) {
                console.error(err);
                if (err instanceof Error) {
                    setError(err);
                } else {
                    setError(new Error("An unknown error occurred."));
                }
            }
        }

        fetchId();
    }, []);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setProducer((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setProfileImg(e.target.files[0]);
        }
    };

    const handleFileChange2 = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setBanner(e.target.files[0]);
        }
    };

    // Manejar cambios en el input de imagen de DNI
    const handleDniImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setDniImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (profileImg) {
                const uniqueProfileName = `${Date.now()}-${Math.random()
                    .toString(36)
                    .substring(7)}-${profileImg.name
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .replace(/\s+/g, "_")
                    .replace(/[^a-zA-Z0-9._-]/g, "")}`;

                const { error: uploadError } = await supabase.storage
                    .from("Images_Projects")
                    .upload(`profiles/${uniqueProfileName}`, profileImg);

                if (uploadError) {
                    throw new Error("Error al subir la imagen de perfil");
                }

                const { data: urlData } = supabase.storage
                    .from("Images_Projects")
                    .getPublicUrl(`profiles/${uniqueProfileName}`);

                if (!urlData?.publicUrl) {
                    throw new Error(
                        "Error: No se pudo obtener la URL de la imagen"
                    );
                }
                producer.profile_image_url = urlData.publicUrl;
            }

            if (banner) {
                const uniqueBannerName = `${Date.now()}-${Math.random()
                    .toString(36)
                    .substring(7)}-${banner.name
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .replace(/\s+/g, "_")
                    .replace(/[^a-zA-Z0-9._-]/g, "")}`;

                const { error: uploadError } = await supabase.storage
                    .from("Images_Projects")
                    .upload(`banners/${uniqueBannerName}`, banner);

                if (uploadError) {
                    throw new Error("Error al subir la imagen de banner");
                }

                const { data: urlData } = supabase.storage
                    .from("Images_Projects")
                    .getPublicUrl(`banners/${uniqueBannerName}`);

                if (!urlData?.publicUrl) {
                    throw new Error(
                        "Error: No se pudo obtener la URL de la imagen"
                    );
                }
                producer.profile_banner_url = urlData.publicUrl;
            }

            let dniImageUrl = null;
            if (dniImage) {
                const uniqueDniName = `${Date.now()}-${Math.random()
                    .toString(36)
                    .substring(7)}-${dniImage.name
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .replace(/\s+/g, "_")
                    .replace(/[^a-zA-Z0-9._-]/g, "")}`;

                const { error: uploadError } = await supabase.storage
                    .from("Images_Projects")
                    .upload(`dni/${uniqueDniName}`, dniImage);

                if (uploadError) {
                    throw new Error("Error al subir la imagen del DNI");
                }

                const { data: urlData } = supabase.storage
                    .from("Images_Projects")
                    .getPublicUrl(`dni/${uniqueDniName}`);

                if (!urlData?.publicUrl) {
                    throw new Error(
                        "Error: No se pudo obtener la URL de la imagen del DNI"
                    );
                }

                dniImageUrl = urlData.publicUrl;
            }

            // Insertar los datos en la tabla producer_requests
            const { error } = await supabase.from("producer_requests").insert({
                user_id: producer.user_id,
                username: username,
                profile_image_url: producer.profile_image_url,
                profile_banner_url: producer.profile_banner_url,
                dni_image_url: dniImageUrl,
                biography: producer.biography,
                location: producer.location,
                status: "pending",
            });

            if (error) {
                throw error;
            }

            setAlertType("success");
            setTimeout(() => {
                setAlertType(null);
                router.push("/dashboard/profileInversor");
            }, 3000);
        } catch (error) {
            console.error("Error creando solicitud de productor:", error);
            setAlertType("error");
            setTimeout(() => {
                setAlertType(null);
            }, 3000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg mt-24 p-6 mb-8">
                    <h1 className="text-center text-3xl">
                        Envia tu peticion para ser productor
                    </h1>
                    <div className="space-y-2 mb-8 mt-8">
                        <p className="text-gray-700 font-semibold">
                            Ubicación:
                        </p>
                        <input
                            id="location"
                            name="location"
                            value={producer.location ?? ""}
                            onChange={handleChange}
                            className="w-full p-4 border border-gray-300 rounded-lg mb-8"
                            placeholder="De dónde eres..."
                            required
                        />
                    </div>
                    <div className="space-y-2 mb-8">
                        <p className="text-gray-700 font-semibold">
                            Imagen de perfil del productor:
                        </p>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="w-full p-4 border border-gray-300 rounded-lg mb-8"
                            accept="image/*"
                        />
                    </div>
                    <div className="space-y-2 mb-8">
                        <p className="text-gray-700 font-semibold">
                            Imagen de banner del productor:
                        </p>
                        <input
                            type="file"
                            onChange={handleFileChange2}
                            className="w-full p-4 border border-gray-300 rounded-lg mb-8"
                            accept="image/*"
                        />
                    </div>
                    <div className="space-y-2 mb-8">
                        <p className="text-gray-700 font-semibold">
                            Imagen de ID o RTN:
                        </p>
                        <input
                            type="file"
                            onChange={handleDniImageChange}
                            className="w-full p-4 border border-gray-300 rounded-lg mb-8"
                            accept="image/*"
                        />
                    </div>
                    <div className="space-y-2 mb-8">
                        <label
                            htmlFor="descripcion"
                            className="block text-gray-600 font-semibold"
                        >
                            Descripción Personal
                        </label>
                        <Textarea
                            id="biography"
                            name="biography"
                            className="w-full p-4 border border-gray-300 rounded-lg mb-8"
                            value={producer.biography ?? ""}
                            rows={4}
                            onChange={handleChange}
                            placeholder="Describe tu experiencia y proyectos..."
                            required
                        />
                    </div>

                    <div className="flex justify-center">
                        <Button
                            type="submit"
                            disabled={loading}
                            className="text-white p-3 rounded-lg bg-orange-500 hover:bg-orange-600 w-2/5 h-15"
                        >
                            {loading
                                ? "Creando..."
                                : "Crear perfil de productor"}
                        </Button>
                    </div>
                </div>
            </form>

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
                            {alertType === "success" ? "¡Éxito!" : "¡Error!"}
                        </AlertTitle>
                        <AlertDescription>
                            {alertType === "success"
                                ? "El formulario fue enviado."
                                : "Ocurrió un error al enviar el formulario. Por favor inténtalo de nuevo."}
                        </AlertDescription>
                    </Alert>
                </div>
            )}
        </div>
    );
}
