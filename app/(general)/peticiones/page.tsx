"use client";
import Peticion from "@/app/ui/components/Peticion";
import NotFound from "@/app/not-found";
import { useEffect, useState } from "react";
import { getUserData, isAdmin } from "@/app/api/handler";
import Loading from "@/app/loading";

export default function Peticiones() {
    const [isUserAdmin, setIsUserAdmin] = useState<boolean | null>(null);
    const [error, setError] = useState<Error | null>(null); // Updated type to Error | null

    useEffect(() => {
        async function fetchData() {
            try {
                console.log("Fetching user data..."); // Debugging line
                const data = await getUserData();

                // Verificar si el usuario es administrador
                const adminStatus = await isAdmin(data.user_id); // Verificamos si es administrador
                setIsUserAdmin(adminStatus);
            } catch (err) {
                console.error(err); // Log the error
                if (err instanceof Error) {
                    setError(err); // Set the error safely
                } else {
                    setError(new Error("An unknown error occurred.")); // Fallback
                }
            }
        }

        fetchData();
    }, []);
    if (error) return <div>Error: {error.message}</div>;

    if (isUserAdmin === null) {
        return <Loading />;
    }

    return isUserAdmin ? <Peticion /> : <NotFound />;
}
