"use client";
import Hero from "@/app/ui/components/Hero";
import ProjectCard from "@/app/ui/components/ProjectCard";
import { Database } from "@/database.types";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

const supabase = createClient();
type Project = Database["public"]["Tables"]["projects"]["Row"];

export default function InversorDashboard() {

    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        async function fetchProjects() {
            const { data, error } = await supabase.from("projects").select("*").limit(5);
            if (!error) {
                setProjects(data as Project[]);
            } else {
                setProjects([]);
            }
        }
        fetchProjects();
    }, [projects]);

    return (
        <>
            <div className="min-h-screen flex flex-col">
                <main className="flex-grow">
                    <Hero />
                    <div className="container mx-auto py-8 px-4">
                        {projects && projects.map((project, index) => (
                            <ProjectCard key={index} project={project} />
                        ))}
                    </div>
                </main>
            </div>
        </>
    );
}
