import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import ElementsCheckoutForm from "@/components/ElementsCheckoutForm";

export default function ProjectDetails({ project }: { project: Project }) {
    return (
        <Card className="w-full lg:w-full h-full">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">{project.name}</CardTitle>
                <CardDescription>El Progreso de los Proyectos Actuales</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-14">
                    <div className="bg-white p-4 rounded-lg shadow">
                        <div className="flex justify-between mb-2">
                            <span>Total necesario</span>
                            <span>Total recaudado</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span className="text-2xl font-bold text-orange-500">
                                {new Intl.NumberFormat("es-HN", {
                                    style: "currency",
                                    currency: "HNL", // Replace with your desired currency
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                }).format(project.investment_goal)}
                            </span>
                            <span className="text-2xl font-bold text-green-500">
                                {new Intl.NumberFormat("es-HN", {
                                    style: "currency",
                                    currency: "HNL", // Replace with your desired currency
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                }).format(project.total_invested)}
                            </span>
                        </div>
                        <Progress value={(project.total_invested / project.investment_goal) * 100} className="mb-4 h-4" />
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <h3 className="font-bold mb-2">
                                    Descripción del Proyecto
                                </h3>
                                <p>
                                    {project.description!.split('\n').map((line, index) => (
                                        <span key={index}>
                                            {line}
                                            <br />
                                        </span>
                                    ))}
                                </p>
                            </div>
                            <div>
                                <h3 className="font-bold mb-2">Beneficios</h3>
                                <p>
                                    {project.beneficios!.split('\n').map((line, index) => (
                                        <span key={index}>
                                            {line}
                                            <br />
                                        </span>
                                    ))}
                                </p>
                            </div>
                        </div>
                        <p className="mb-4">Fecha de cierre de inversión: {project.expected_finish_date}</p>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <div className="w-full">
                    {/* <Button className="w-full bg-orange-500 hover:bg-orange-600">
                        <Link href={`/pagos/confirmar?${project.project_id}`}>Invertir Ahora [Hosted Page]</Link>
                    </Button> */}
                    <div className="mt-4">
                        <h2 className="font-bold text-xl my-2">Invierte Ahora</h2>
                        <ElementsCheckoutForm project={project} />

                    </div>
                </div>
            </CardFooter>
        </Card>
    );
}
