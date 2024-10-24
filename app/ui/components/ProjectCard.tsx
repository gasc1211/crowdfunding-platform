"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Database } from "@/database.types";

import Image from "next/image";

export default function ProjectCard({ project }: { project: Database["public"]["Tables"]["projects"]["Row"] }) {

    const currentProgress = (project.total_invested / project.investment_goal);

    return (
        <Card className="flex flex-col md:flex-row items-center p-4 mb-4">
            {project.project_banner_url && <Image
                src={project.project_banner_url}
                alt={project.name}
                className="w-full md:w-40 h-auto md:h-28 rounded-md mb-4 md:mb-0 md:mr-4"
                width={100}
                height={150}
            />}
            <div className="flex-grow">
                <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex items-center justify-between">
                    <div className="w-2/3 mr-4">
                        <Progress value={currentProgress} className="w-full h-4" />
                    </div>
                    <Button
                        variant="default"
                        className="bg-orange-500 hover:bg-orange-600"
                    >
                        Más detalles
                    </Button>
                </div>
            </div>
        </Card>
    );
}
