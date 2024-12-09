'use client'
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { getProductorData, getUserData } from "@/app/api/handler";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useRouter } from "next/navigation";
import Image from "next/image";
//import { useUser } from "@clerk/nextjs";
type ProfileImageUploadProps = {
    profileId: string;
    type: "investor" | "producer" | "projectUserId";
  };

export default function ProfileImageUpload({ profileId, type }: ProfileImageUploadProps) {
    const [error, setError] = useState<Error | null>(null);
    const supabase = createClient();
    const [loading, setLoading] = useState(false);
    const [profilePicture, setProfilePicture] = useState<File | null>(null);
    const [userUpdate, setUserUpdate] = useState<UserUpdate>()
    const [producerUpdate, setProducerUpdate] = useState<ProducerUpdate>()
    const router = useRouter();

    //const { user } = useUser();

    useEffect(() => {
        async function fetchData() {
            try {
                if (type == "investor") {
                    const data = await getUserData();
                    setUserUpdate(data);
                }
                else {
                    const data = await getProductorData(profileId);
                    setProducerUpdate(data[0]);
                }
                

            } catch (err) {
                console.error(err);
                setError(err instanceof Error ? err : new Error("An unknown error occurred."));
            }
        }
        fetchData();
    }, [profileId, type]);
    //console.log("UserUpdate", userUpdate)
    if (error) return <div>Error: {error.message}</div>;
    /* if (type=="investor" && !userUpdate) return <div>Loading...</div>;
    if ((type=="producer" || type == "projectUserId") && !userUpdate) return <div>Loading...</div>; */

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setProfilePicture(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (profilePicture) {
            // Reemplazar espacios y caracteres especiales en el nombre del archivo
            // Normalizar el nombre del archivo eliminando espacios y caracteres especiales
            const sanitizedFileName = profilePicture.name
                .normalize("NFD") // Descompone caracteres acentuados
                .replace(/[\u0300-\u036f]/g, "") // Elimina los acentos
                .replace(/\s+/g, "_") // Reemplaza espacios con guiones bajos
                .replace(/[^a-zA-Z0-9._-]/g, ""); // Elimina caracteres no permitidos

            // Sube la imagen al bucket de Supabase
            const { error: uploadError } = await supabase.storage
                .from("Images_Projects")
                .upload(`profileImages/${sanitizedFileName}`, profilePicture);

            if (uploadError) {
                console.error("Error al subir la imagen:", uploadError.message);
                setLoading(false);
                return;
            }

            // Obtener la URL pública de la imagen
            const { data: urlData } = supabase.storage
                .from("Images_Projects")
                .getPublicUrl(`profileImages/${sanitizedFileName}`);

            const userImgUrl = urlData?.publicUrl || "";
            console.log(userImgUrl);

            if (!userImgUrl) {
                console.error("Error: No se pudo obtener la URL de la imagen");
                setLoading(false);
                return;
            }
            if(userUpdate) {
                userUpdate.profileImg = userImgUrl;
            }
            else {
                producerUpdate!.profile_image_url = userImgUrl
            }
            
        }

        try {
            if (userUpdate) {
                    const { data, error } = await supabase
                    .from("users")
                    .update({ profileImg: userUpdate.profileImg })
                    .eq("user_id", userUpdate.user_id);

                if (error) {
                    console.error("Error al actualizar imagen de perfil:", error.message);
                } else {
                    console.log("Imagen Actualizada:", data);
                }
            }
            else{
                const { data, error } = await supabase
                    .from("producer")
                    .update({ profile_image_url: producerUpdate?.profile_image_url })
                    .eq("user_id", producerUpdate?.user_id);

                if (error) {
                    console.error("Error al actualizar imagen de perfil:", error.message);
                } else {
                    console.log("Imagen Actualizada:", data);
                }
            }
            
            if (userUpdate) {
                router.push("/dashboard/profileInversor"); // Redirect to projects list page
            } else router.push("/dashboard/emprendedores"); // Redirect to projects list page
            
        } catch (error) {
            console.error("Error creating project:", error);
            alert("Error creating project. Please try again.");
        } finally {
            setLoading(false);
        }

    };

    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <button>
                        <div className="relative w-32 h-32 mb-4 mx-auto">
                            <Image
                                src={
                                    type === "investor"
                                        ? userUpdate?.profileImg || "/avatar.png"
                                        : (type === "producer" || type === "projectUserId")
                                        ? producerUpdate?.profile_image_url || "/avatar.png"
                                        : "/avatar.png"
                                }
                                alt="Profile picture"
                                sizes="(max-width: 768px) 50vw, 25vw"
                                fill
                                className="rounded-full object-cover"
                            />
                        </div>
                    </button>
                </AlertDialogTrigger>
                {type !== "projectUserId" && (
                <AlertDialogContent>
                    <AlertDialogHeader className="flex justify-center items-center">
                        <AlertDialogTitle>Seleccionar Imagen de Perfil</AlertDialogTitle>
                        <AlertDialogDescription></AlertDialogDescription>
                    </AlertDialogHeader>

                    <div className="flex justify-center mb-4">
                        <Image
                            src={
                                type === "investor"
                                    ? userUpdate?.profileImg || "/avatar.png"
                                    : (type === "producer")
                                    ? producerUpdate?.profile_image_url || "/avatar.png"
                                    : "/avatar.png"
                            }
                            alt="Profile picture"
                            width={400}
                            height={400}
                        />
                    </div>

                    <form onSubmit={handleSubmit}>
                        <input id="img" name="img" type="file" onChange={handleFileChange} accept="image/*" />
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction type="submit" disabled={loading}>
                                {loading ? "Uploading..." : "Subir Imagen de Perfil"}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </form>
                </AlertDialogContent>
            )}
            </AlertDialog>
        </>
    );
    
}

