import Hero from "@/app/ui/components/Hero";
import ProjectCard from "@/app/ui/components/ProjectCard";
import { createClient } from "@/utils/supabase/client";

export default async function InversorDashboard() {

    const supabase = createClient();

    const results = await supabase.from("projects").select("*").limit(5);
    const projects = results.data;

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
