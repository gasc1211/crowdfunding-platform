"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { UUID } from "crypto";
import { useRouter } from "next/navigation";
import { getUserId } from "@/app/api/handler";
import { createClient } from "@/utils/supabase/client";
import { Textarea } from "@/components/ui/textarea";

export default function Profile() {

    const router = useRouter();
    const [userId, setUserId] = useState<UUID>();
    const [error, setError] = useState<Error | null>(null); // Updated type to Error | null
    const [loading, setLoading] = useState(false);
    const [profileImg, setProfileImg] = useState<File | null>(null);
    const [banner, setBanner] = useState<File | null>(null);
    const supabase = createClient();
    
    const [producer, setProducer] = useState<ProducerInsert>({
        user_id: userId,
        profile_image_url: "",
        profile_banner_url: "",
        biography: "",
        location: "",
    });

    useEffect(() => {
        async function fetchId() {
            try {
                console.log("Fetching user data..."); // Debugging line
                const data = await getUserId();
                setUserId(data.user_id);
                setProducer((prev) => ({ ...prev, user_id: data.user_id }));
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

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (profileImg) {
            // Reemplazar espacios y caracteres especiales en el nombre del archivo
            // Normalizar el nombre del archivo eliminando espacios y caracteres especiales
            const sanitizedFileName = profileImg.name
                .normalize("NFD") // Descompone caracteres acentuados
                .replace(/[\u0300-\u036f]/g, "") // Elimina los acentos
                .replace(/\s+/g, "_") // Reemplaza espacios con guiones bajos
                .replace(/[^a-zA-Z0-9._-]/g, ""); // Elimina caracteres no permitidos
        
            // Sube la imagen al bucket de Supabase
            const { error: uploadError } = await supabase.storage
                .from("Images_Projects")
                .upload(`profiles/${sanitizedFileName}`, profileImg);
        
            if (uploadError) {
                console.error("Error al subir la imagen:", uploadError.message);
                setLoading(false);
                return;
            }
        
            // Obtener la URL pública de la imagen
            const { data: urlData } = supabase.storage
                .from("Images_Projects")
                .getPublicUrl(`profiles/${sanitizedFileName}`);
        
            const projectImgUrl = urlData?.publicUrl || "";
        
            if (!projectImgUrl) {
                console.error("Error: No se pudo obtener la URL de la imagen");
                setLoading(false);
                return;
            }
            producer.profile_image_url = projectImgUrl;
        }

        if (banner) {
            // Reemplazar espacios y caracteres especiales en el nombre del archivo
            // Normalizar el nombre del archivo eliminando espacios y caracteres especiales
            const sanitizedName = banner.name
                .normalize("NFD") // Descompone caracteres acentuados
                .replace(/[\u0300-\u036f]/g, "") // Elimina los acentos
                .replace(/\s+/g, "_") // Reemplaza espacios con guiones bajos
                .replace(/[^a-zA-Z0-9._-]/g, ""); // Elimina caracteres no permitidos
        
            // Sube la imagen al bucket de Supabase
            const { error: uploadError } = await supabase.storage
                .from("Images_Projects")
                .upload(`profiles/${sanitizedName}`, banner);
        
            if (uploadError) {
                console.error("Error al subir la imagen:", uploadError.message);
                setLoading(false);
                return;
            }
        
            // Obtener la URL pública de la imagen
            const { data: urlData } = supabase.storage
                .from("Images_Projects")
                .getPublicUrl(`banners/${sanitizedName}`);
        
            const projectBannerUrl = urlData?.publicUrl || "";
            console.log(projectBannerUrl);
        
            if (!projectBannerUrl) {
                console.error("Error: No se pudo obtener la URL de la imagen");
                setLoading(false);
                return;
            }
            producer.profile_banner_url = projectBannerUrl;
        }

        try {
            const { data, error } = await supabase
                .from("producer")
                .insert(producer);

            if (error) {
                console.error("Error al crear el perfil de productor:", error.message);
            } else {
                console.log("Perfil creado:", data);
                router.push("/dashboard/emprendedores");
            }
        } catch (error) {
            console.error("Error creating prodcer:", error);
            alert("Error creating project. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg mt-24 p-6 mb-8">
            <h1 className="text-center text-xl">Crea tu perfil de productor</h1>
                <div className="space-y-2 mb-8">
                    {" "}
                    {/* Ajustamos el ancho del contenedor principal */}
                    <p className="text-gray-700 font-semibold">Ubicación:</p>
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
                    {" "}
                    {/* Ajustamos el ancho del contenedor principal */}
                    <p className="text-gray-700 font-semibold">Imagen de perfil del productor:</p>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="w-full p-4 border border-gray-300 rounded-lg mb-8"
                        accept="image/*"
                    />
                </div>
                <div className="space-y-2 mb-8">
                    {" "}
                    {/* Ajustamos el ancho del contenedor principal */}
                    <p className="text-gray-700 font-semibold">Imagen de banner del productor:</p>
                    <input
                        type="file"
                        onChange={handleFileChange2}
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
                    <Button type="submit" disabled={loading} className="text-white p-3 rounded-lg bg-orange-500 hover:bg-orange-600 w-2/5 h-15">
                        {loading ? "Creating..." : "Crear perfil de productor"}
                    </Button>
                </div>
            </div>
        </form>    
    );
}
