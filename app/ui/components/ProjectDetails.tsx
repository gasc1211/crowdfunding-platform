import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react";
import { getUserId } from "@/app/api/handler";

export default function ProjectDetails({ project }: { project: Project }) {
    const [user_id, setUser_id] = useState<Users['user_id']>();
    const [error, setError] = useState<Error | null>(null); // Updated type to Error | null
    
    useEffect(() => {
        async function fetchId() {
            try {
                console.log("Fetching user data..."); // Debugging line
                const data = await getUserId();
                setUser_id(data.user_id);
            } catch (err) {
                console.error(err); // Log the error
                if (err instanceof Error) {
                    setError(err); // Set the error safely
                } else {
                    setError(new Error("An unknown error occurred.")); // Fallback
                }
            }
        }

        fetchId();
    }, []);
    if (error) return <div>Error: {error.message}</div>;
  if (!user_id) return <div>Loading...</div>;
  if (!project) return <div>Loading...</div>;

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
                <Progress value={project.progress} className="mb-4 h-4" />
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
            <Button className="w-full bg-orange-500 hover:bg-orange-600">
                <Link href="/pagos/confirmar">Invertir Ahora</Link>
            </Button>
            {/* Conditional Button */}
            {user_id === project.producer_id && (
                    <Button className="ml-5 w-full bg-blue-500 hover:bg-blue-600">
                        <Link href={{
                                    pathname: "/proyecto/edit",
                                    query: { projectId: JSON.stringify(project.project_id) }, // Serialize project object
                                }}>
                            Editar Perfil de Proyecto
                        </Link>
                    </Button>
                )}
        </CardFooter>
      </Card>
    );
}
