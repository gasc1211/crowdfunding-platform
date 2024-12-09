"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProfileImageUpload from "./ProfileImageUpload";
import { calculateAge } from "@/app/api/edad";
import { useEffect, useState } from "react";
import { getUserData, isProducer, getNotifications } from "@/app/api/handler";
import BellNotification from "@/app/ui/components/BellNotification";

export default function Sidebar() {
    const [userData, setUserData] = useState<Users | null>(null);
    const [isUserProducer, setIsUserProducer] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null); // Updated type to Error | null
    const [notifications, setNotifications] = useState<Notifications[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                console.log("Fetching user data..."); // Debugging line
                const data = await getUserData();
                //console.log("User Data:", data); // Log the fetched data
                setUserData(data);

                // Fetch projects for the logged-in user using their user_id
                const producerStatus = await isProducer(data.user_id); // Verificamos si es productor
                setIsUserProducer(producerStatus);
                // Fetch notifications
                const userNotifications = await getNotifications(data.user_id);
                setNotifications(userNotifications);
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
    if (!userData) return <div>Loading...</div>;

    return (
        <Card className="w-full lg:w-1/4 mr-4 md:mb-0 mb-4">
            <CardHeader className="flex-row items-center justify-between">
                <div className="w-8">
                    {" "}
                    {/* Placeholder to balance the layout */}
                    {/* You can remove this div if you don't need a perfect balance */}
                </div>
                <CardTitle className="flex-grow text-center">Perfil</CardTitle>
                <div className="w-8">
                    {" "}
                    {/* Ensure the bell has consistent width */}
                    <BellNotification notifications={notifications} />
                </div>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
                <div
                    key={userData.auth_id}
                    className="flex flex-col items-center"
                >
                    <ProfileImageUpload profileId={userData.user_id} type="investor"/>
                    <h2 className="text-2xl font-bold mb-2 text-center">
                        {userData.first_name}
                    </h2>
                    <p className="text-gray-500 mb-4 text-center">
                        Edad: {calculateAge(new Date(userData.birth_date!))}{" "}
                        Años
                    </p>
                    <br />
                    <p className="text-center">{userData.email}</p>
                    <br />
                    <div className="flex flex-col gap-4 w-full">
                        <Button className="w-full">
                            <div>
                                <Link href={"/dashboard/inversor"}>
                                    Ver Proyectos
                                </Link>
                            </div>
                        </Button>
                        {/* <Button className="w-full">
                            <div> Ver Proyectos Completados </div>
                        </Button> */}
                        {isUserProducer ? (
                            <Button className="w-full">
                                <Link href={"/dashboard/emprendedores"}>
                                    Perfil Emprendedor
                                </Link>
                            </Button>
                        ) : (
                            <Button className="w-full">
                                <Link href={"/productor/editar"}>
                                    ¿Deseas empezar una Campaña?
                                </Link>
                            </Button>
                        )}
                        <Button className="w-full">
                            <Link href={"/pagos/historial"}>Historial de Inversiones</Link>
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card >
    );
}
