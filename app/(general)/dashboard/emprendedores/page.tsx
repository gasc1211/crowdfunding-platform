"use client";

import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    getUserData,
    getUserProjects,
    getProductorData,
} from "@/app/api/handler";
// import { calculateAge } from "@/app/api/edad";
import Details from "@/app/ui/components/Details";
import Link from "next/link";
import ProfileImageUpload from "@/app/ui/components/ProfileImageUpload";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const [userData, setUserData] = useState<Users | null>(null);
    const [producerData, setProducerData] = useState<Producer | null>(null);
    const [error, setError] = useState<Error | null>(null); // Updated type to Error | null
    const [projects, setProjects] = useState<Project[]>([]); // State to store projects
    const router = useRouter();

    useEffect(() => {
        async function fetchData() {
            try {
                console.log("Fetching user data..."); // Debugging line
                const data = await getUserData();

                const producer = await getProductorData(data.user_id);
                console.log(producer);
                if (producer.length == 0) {
                    return router.push("/productor/editar");
                }

                setUserData(data);
                setProducerData(producer[0]);
                // Fetch projects for the logged-in user using their user_id
                const userProjects = await getUserProjects(data.user_id);

                const randomProjects = userProjects
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 3);
                setProjects(randomProjects);
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
    }, [router]);
    if (error) return <div>Error: {error.message}</div>;
    if (!userData) return <div>Loading...</div>;
    if (!producerData) return <div>Loading...</div>;


  return (
    <>
        <div className="mx-auto">
          <div className="h-[20vh] flex items-center justify-center rounded-xl bg-[url('/dashboard-plant2.png')] bg-cover">
            <h1 className="text-white text-4xl font-bold text-center px-4">Bienvenido a tu Dashboard {userData.first_name}</h1>
          </div>
        </div>
        <br />
        <div className="flex flex-col lg:flex-row justify-between mt-4">
          <Card className="w-full lg:w-1/4 mr-4 md:mb-0 mb-4">
            {/* <CardHeader className="text-center">
              <CardTitle>Perfil</CardTitle>
            </CardHeader> */}
                    <CardContent className="flex flex-col items-center h-full mt-12">
                        <div
                            key={userData.auth_id}
                            className="flex flex-col items-center justify-between"
                        >
                            <ProfileImageUpload profileId={producerData!.user_id} type="producer"/>
                            <h2 className="text-2xl font-bold mb-2 text-center">{`${userData?.first_name} ${userData?.last_name}`}</h2>
                            <p className="text-center">{userData.email}</p>
                            <br />
                            <div className="flex flex-col w-full [&>*]:mt-3">
                                <Button className="w-full">
                                    <Link href={"/proyecto/nuevo"}>
                                        Crear Nuevo Proyecto 🌱
                                    </Link>
                                </Button>
                                <Button className="w-full">
                                    <Link href={"/proyecto/historial"}>
                                        Ver Proyectos Completados 🧑‍🌾
                                    </Link>
                                </Button>
                                {/* <Button className="w-full">
                                    <Link href={"/productor/actualizar"}>
                                        Editar Perfil
                                    </Link>
                                </Button> */}
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="w-full lg:w-3/4 h-full">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">
                            Proyectos en Desarrollo
                        </CardTitle>
                        <CardDescription>
                            El Progreso de los Proyectos Actuales
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-14">
                            {projects.map((project) => (
                                <div
                                    key={project.project_id}
                                    className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4"
                                >
                                    <div className="flex-1">
                                        <h2 className="text-xl font-bold">
                                            {project.name}
                                        </h2>
                                        <p className="text-sm text-gray-600">
                                            {project.description}
                                        </p>
                                    </div>
                                    <div className="w-full md:w-1/3">
                                        <p className="text-sm font-medium leading-none mb-2">
                                            Progreso
                                        </p>

                                        <Progress
                                            value={project.progress}
                                            className="w-full"
                                        />
                                    </div>
                                    <div className="flex justify-start">
                                        <Details
                                            key={project.project_id}
                                            project={project}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                    <br />
                    <CardFooter>
                        <Button variant="outline" className="w-full">
                            <ChevronRight className="mr-2 h-4 w-4" />
                            <Link
                                href={{
                                    pathname: "/dashboard/inversor",
                                    query: {
                                        userId: JSON.stringify(
                                            userData.user_id
                                        ),
                                    }, // Serialize project object
                                }}
                            >
                                Ver Todos Los Proyectos
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </>
    );
}
