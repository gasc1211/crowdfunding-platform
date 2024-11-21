'use client';
import Banner from "@/app/ui/components/Banner";
import SidebarProject from "@/app/ui/components/SidebarProject";
import ProjectDetails from "@/app/ui/components/ProjectDetails";
import ProjectGallery from "@/app/ui/components/ProjectGallery";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DetalleProyecto() {
    const searchParams = useSearchParams();
    const [project, setProject] = useState<Project | null>(null);

    useEffect(() => {
        const projectQuery = searchParams.get('project');

        if (projectQuery) {
            try {
                const parsedProject = JSON.parse(projectQuery);
                setProject(parsedProject);
            } catch (err) {
                console.error('Failed to parse project:', err);
            }
        } else {
            console.error('No project data found in query');
        }
    }, [searchParams]);

    if (!project) {
        return <p>Loading project details...</p>;
    }
    return (
        <div className="min-h-screen flex flex-col">
            <div className="container mx-auto p-4">
                <Banner />
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
    );
}