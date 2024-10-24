"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Project, UsuarioProductor } from "@/lib/definitions";
import { calculateAge } from "../api/edad";
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
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function Dashboard() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(
        null
    );

    const projects: Project[] = [
        {
            id: 1,
            name: "Creación de Huerto Comunitario",
            info: "Desarrollo de un espacio para cultivo de consumo local.",
            progress: 75,
        },
        {
            id: 2,
            name: "Producción de Alimentos Orgánicos",
            info: "Gran impacto en la salud y el bienestar de la población local al mejorar la calidad de los alimentos y la producción agrícola",
            progress: 40,
        },
        {
            id: 3,
            name: "Mejora de Calidad de Suelos",
            info: "Se lleva a cabo mediante la reducción de la contaminación, el uso eficiente de los recursos naturales y el manejo adecuado de los desechos",
            progress: 90,
        },
    ];

    const users: UsuarioProductor[] = [
        {
            idusuario: 1,
            descripcion:
                "Intereses: Agricultura, ganadería e ingeniería de producción",
            nombre: "Juan Ramirez",
            fechaNacimiento: new Date(1991, 1, 24),
            email: "andre.herrera@unah.hn",
        },
    ];

    return (
        <>
            <div className="mx-auto">
                <div className="relative h-[20vh] overflow-hidden m-5">
                    <Image
                        src="/dashboard-plant2.png"
                        alt="Dashboard plant"
                        fill
                        className="object-cover rounded-xl"
                        sizes="100vw"
                        priority
                    />
                    {}
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-xl">
                        <h1 className="text-white text-4xl font-bold text-center px-4">
                            Bienvenido a tu Dashboard {users[0]?.nombre}
                        </h1>
                    </div>
                </div>
            </div>
            <div className="container mx-auto p-4">
                <div className="flex flex-col lg:flex-row justify-between gap-6">
                    <Card className="w-full lg:w-1/3">
                        <CardHeader className="text-center">
                            <CardTitle>Profile</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center">
                            {users.map((user) => (
                                <div
                                    key={user.idusuario}
                                    className="flex flex-col items-center"
                                >
                                    <div className="relative w-32 h-32 mb-4 mx-auto">
                                        <Image
                                            src="/avatar.png"
                                            alt="Profile picture"
                                            fill
                                            className="rounded-full object-cover"
                                        />
                                    </div>
                                    <h2 className="text-2xl font-bold mb-2 text-center">
                                        {user.nombre}
                                    </h2>
                                    <p className="text-gray-500 mb-4 text-center">
                                        Edad:{" "}
                                        {calculateAge(user.fechaNacimiento)}{" "}
                                        Años
                                    </p>
                                    <br />
                                    <p className="w-3/5 text-center">
                                        {user.descripcion}
                                    </p>
                                    <br />
                                    <div className="flex flex-col gap-4 w-full">
                                        <Button className="w-full">
                                            <div> Crear Nuevo Proyecto </div>
                                        </Button>
                                        <Button className="w-full">
                                            <div>
                                                {" "}
                                                Ver Proyectos Completados{" "}
                                            </div>
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                    <Card className="w-full lg:w-3/5">
                        <CardHeader>
                            <CardTitle>Proyectos en Desarrollo</CardTitle>
                            <CardDescription>
                                El Progreso de los Proyyectos Actuales
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-14">
                                {projects.map((project) => (
                                    <div
                                        key={project.id}
                                        className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4"
                                    >
                                        <div className="flex-1">
                                            <h2 className="text-xl font-bold">
                                                {project.name}
                                            </h2>
                                            <p className="text-sm text-gray-600">
                                                {project.info}
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
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() =>
                                                            setSelectedProject(
                                                                project
                                                            )
                                                        }
                                                    >
                                                        Más Detalles
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>
                                                            {
                                                                selectedProject?.name
                                                            }
                                                        </AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Project progress:{" "}
                                                            {
                                                                selectedProject?.progress
                                                            }
                                                            %
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <p className="py-4">
                                                        This is where you would
                                                        display more detailed
                                                        information about the
                                                        selected project, such
                                                        as team members,
                                                        deadlines, and specific
                                                        tasks.
                                                    </p>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>
                                                            Close
                                                        </AlertDialogCancel>
                                                        <AlertDialogAction>
                                                            View Full Details
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                        <br />
                        <CardFooter>
                            <Button variant="outline" className="w-full">
                                <ChevronRight className="mr-2 h-4 w-4" /> Ver
                                todos los Proyectos
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </>
    );
}
