'use client'

import { Card } from "@/components/ui/card";
import { CardHeader } from "@/components/ui/card";
import { CardTitle } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getUserId, getUserInvestments } from "@/app/api/handler";
import { useEffect, useState } from "react";
import { UUID } from "crypto";
import { getAllProjects } from "@/app/api/handler";


export default function InversorDetails() {
    const [userId, setUserId] = useState<UUID>();
    const [invest, setInvest] = useState<Investments[]>();
    const [allProjects, setAllProjects] = useState<Project[]>();
    // Sum the total_invested values from all projects
   
    useEffect(() => {
        async function fetchId() {
            try {
                    const data = await getUserId();
                    setUserId(data.user_id);
                } catch (err) {
                console.error(err);
            }
        }
        fetchId();
    }, []);

    useEffect(() => {
        async function fetchInvestments() {
          if (!userId) return; // Avoid calling API when userId is undefined
          try {
            const data = await getUserInvestments(userId);
            setInvest(data);
          } catch (err) {
            console.error(err);
          }
        }
        fetchInvestments();
      }, [userId]); // Fetch investments only when userId is defined

      useEffect(() => {
        async function fetchProjects() {
            try {
                const data = await getAllProjects();
                setAllProjects(data);
            } catch (err) {
                console.error(err);
            }
        }
        fetchProjects();
        }, []);

    const totalInvested = invest?.reduce((acc, inv) => acc + (inv.investment_amount || 0), 0) || 0;

      // Count the number of unique projects based on project_id
    const uniqueProjects = new Set(invest?.map((investment) => investment.project_id));
    const numberOfProjectsInvested = uniqueProjects.size;

    // Count the number of completed projects (progress = 100) that the user has invested in
    const completedProjects = allProjects?.filter(project =>
        project.progress === 100 && uniqueProjects.has(project.project_id)
    ).length || 0;

    // Count the number of projects with progress less than 100 that the user has invested in
    const projectsInProcess = allProjects?.filter(project =>
        project.progress! < 100 && uniqueProjects.has(project.project_id)
    ).length || 0;

    // Count the unique number of investments made by the user (counting each investment even if it was made more than once in the same project)
    const numberOfInvestments = invest?.length || 0;

    /* // Count unique locations
    const uniqueLocations = new Set(projects.map((project) => project.location).filter(Boolean)).size;
    
    // Count the number of projects where progress is not 100
    const projectsInProgress = projects.filter(project => project.progress !== 100).length;

    // Count the number of projects where progress is  100
    const projectsCompleted = projects.filter(project => project.progress == 100).length; */

    
    return (
        <main className="w-full lg:w-3/4 h-full">
            <h2 className="text-2xl font-bold mb-4 ml-4">Resumen de inversiones</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-bold	">
                            Proyectos Financiados
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-orange-500 place-self-center">
                            {numberOfProjectsInvested} {/* Display number of unique projects */}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-bold">
                            Total invertido
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-orange-500 place-self-center">
                            {new Intl.NumberFormat("es-HN", {
                                style: "currency",
                                currency: "HNL", // Replace with your desired currency
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            }).format(totalInvested)}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0">
                        <CardTitle className="text-sm font-bold">
                            Inversiones Realizadas
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-orange-500 place-self-center">
                            {numberOfInvestments} {/* Display number of investments made */}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <h2 className="text-2xl font-bold mb-4 ml-4">Progreso de Inversiones</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Proyectos financiados en progreso</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-2">
                            Proyectos que aún están a la espera de poder lograr
                            su meta para ser completados.
                        </p>
                        <div className="text-4xl font-bold text-orange-500 mb-4 place-self-center">
                            {projectsInProcess} {/* Display number of projects with progress < 100 */}
                        </div>
                        <div className="place-self-center">
                            <Button className="bg-orange-500 hover:bg-orange-600" variant="outline">Más detalles</Button>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Proyectos financiados completados</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-2">
                            Proyectos culminados con éxito en los que usted
                            realizó inversión.
                        </p>
                        <div className="text-4xl font-bold text-orange-500 mb-4 place-self-center">
                            {completedProjects} {/* Display number of completed projects */}
                        </div>
                        <div className="place-self-center">
                            <Button className="bg-orange-500 hover:bg-orange-600" variant="outline">Más detalles</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}
