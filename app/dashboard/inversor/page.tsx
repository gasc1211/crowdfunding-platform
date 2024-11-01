'use client'
import Hero from "@/app/ui/components/Hero";
import ProjectCard from "@/app/ui/components/ProjectCard";
import { useEffect, useState } from "react";
import { getAllProjects } from "@/app/api/handler";

export default function InversorDashboard() {
    const [projects, setProjects] = useState<Project[]>([]); // State to store projects
    const [error, setError] = useState<Error | null>(null); // Updated type to Error | null
    useEffect(()=>{
        async function fetchData() {
            try {
                        
                // Fetch projects for the logged-in user using their user_id
                const allProjects = await getAllProjects();
                setProjects(allProjects);
                console.log("Fetched projects: ", projects)
        
        
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
    },[]);
    if (error) return <div>Error: {error.message}</div>;
    console.log('projects')
    return (
        <>
            <div className="min-h-screen flex flex-col">
                <main className="flex-grow">
                    <Hero />
                    <div className="container mx-auto py-8 px-4">
                        {projects.map((proj) => (
                            <ProjectCard key={proj.project_id} project={proj} />
                        ))}
                    </div>
                </main>
            </div>
        </>
    );
}
