'use client'

import { Card } from "@/components/ui/card";
import { CardHeader } from "@/components/ui/card";
import { CardTitle } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";


export default function InversorDetails({ projects }: {projects: Project[]}) {

    // Sum the total_invested values from all projects
    const totalInvested = projects.reduce((acc, project) => acc + (project.total_invested || 0), 0);


    // Count the number of projects where progress is not 100
    const projectsInProgress = projects.filter(project => project.progress !== 100).length;

    // Count the number of projects where progress is  100
    const projectsCompleted = projects.filter(project => project.progress == 100).length;
  


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
                            {projects.length}
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
                            Familias beneficiadas
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-orange-500 place-self-center">
                            15
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
                            {projectsInProgress}
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
                            {projectsCompleted}
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
