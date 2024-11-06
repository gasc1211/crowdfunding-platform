import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { getUserData } from "@/app/api/handler";

export default function ProfileImageUpload() {
    const [userData, setUserData] = useState<Users | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const router = useRouter();
    const supabase = createClient();
    const [loading, setLoading] = useState(false);
    const [profilePicture, setProfilePicture] = useState<File | null>(null);
    
    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getUserData();
                setUserData(data);
            } catch (err) {
                console.error(err);
                setError(err instanceof Error ? err : new Error("An unknown error occurred."));
            }
        }
        fetchData();
    }, []);
    
    if (error) return <div>Error: {error.message}</div>;
    if (!userData) return <div>Loading...</div>;

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setProfilePicture(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!profilePicture) {
            alert("Please select a profile picture to upload.");
            setLoading(false);
            return;
        }

        try {
            const sanitizedFileName = profilePicture.name
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/\s+/g, "_")
                .replace(/[^a-zA-Z0-9._-]/g, "");

            // Upload the image to the Supabase bucket
            const { error: uploadError } = await supabase.storage
                .from("Images_Projects")
                .upload(`profileImages/${sanitizedFileName}`, profilePicture);

            if (uploadError) throw new Error(uploadError.message);

            // Get the public URL of the uploaded image
            const { data: urlData } = supabase.storage
                .from("Images_Projects")
                .getPublicUrl(`profileImages/${sanitizedFileName}`);
            
            const userImgUrl = urlData?.publicUrl;
            if (!userImgUrl) throw new Error("Failed to retrieve image URL");

            // Update the user's profile image URL in the database
            const { error: updateError } = await supabase
                .from("users")
                .update({ profileImg: userImgUrl })
                .eq("id", userData.user_id); // Use the user ID to update the correct record

            if (updateError) throw new Error(updateError.message);

            console.log("Profile image updated successfully!");
            router.push("/dashboard/inversor");
        } catch (error) {
            console.error("Error updating profile image:", error);
            alert("Error updating profile image. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button type="submit" disabled={loading}>
                {loading ? "Uploading..." : "Upload Profile Image"}
            </button>
        </form>
    );
}

