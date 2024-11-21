'use client';
import Banner from "@/app/ui/components/Banner";
import SidebarProject from "@/app/ui/components/SidebarProject";
import ProjectDetails from "@/app/ui/components/ProjectDetails";
import ProjectGallery from "@/app/ui/components/ProjectGallery";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getProject } from "@/app/api/handler";

export default function DetalleProyecto({ params }: { params: { projectId: string } }) {

    const [project, setProject] = useState<Project | null>(null);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true);
        const fetchProjectData = async () => {
            try {
                const data = await getProject(params.projectId);
                setProject(data);
            } catch (error) {
                console.error(error);
                setError(error as string);
            }
        }
        fetchProjectData();
        setLoading(false);
    }, [params.projectId]);

    if (error)
        return <p>Ha ocurrido un error: {error}</p>;

    return (
        <>
            {!isLoading && project &&
                <div className="min-h-screen flex flex-col">
                    <div className="container mx-auto p-4">
                        <Banner imageUrl={project.project_banner_url as string} />
                        <div className="flex-grow">
                            <div className="flex flex-col lg:flex-row gap-6 mt-4">
                                <div className="lg:w-1/3 xl:w-1/4">
                                    <SidebarProject producerId={project.producer_id} />
                                </div>
                                <div className="lg:w-2/3 xl:w-3/4 h-full">
                                    <ProjectDetails key={project.project_id} project={project} />
                                </div>
                            </div>
                            <div className="mt-8">
                                <ProjectGallery projectId={project.project_id} />
                            </div>
                            <div className="flex justify-center mt-8">
                                <Button className="w-1/2 h-16">
                                    <Link href="/dashboard/inversor" className="flex items-center justify-center w-full h-full">
                                        Volver A Lista de Proyectos
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}