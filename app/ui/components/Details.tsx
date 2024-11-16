import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
  import { useState } from "react"
  import Link from "next/link"



export default function Details({ project }: { project: Project }){
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)

    return(
        <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm" onClick={() => setSelectedProject(project)}>
                    Más Detalles
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>{selectedProject?.name}</AlertDialogTitle>
                    <AlertDialogDescription>
                        Project progress: {selectedProject?.progress}%
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <p className="py-4">
                        <ul>
                            <li>Nombre del Proyecto: {project.name}</li>
                            <li>Ubicación: {project.location}</li>
                            {/* <li>Inversión Projectada: {project.investment_goal}</li> */}
                            <li>Inversión Projectada: {" "}
                                {new Intl.NumberFormat("es-HN", {
                                    style: "currency",
                                    currency: "HNL", // Replace with your desired currency
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                }).format(project.investment_goal)}
                            </li>
                            <li>
                                Inversión Actual:{" "}
                                {new Intl.NumberFormat("es-HN", {
                                    style: "currency",
                                    currency: "HNL", // Replace with your desired currency
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                }).format(project.total_invested)}
                            </li>
                            {/* <li>Inversión Actual: {project.total_invested}</li> */}
                            <li>Fecha de Inicio: {project.start_date}</li>
                            <li>Fecha de Finalización: {project.finish_date }</li>
                        </ul>
                    </p>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cerrar</AlertDialogCancel>|
                    <AlertDialogAction><Link href={"/proyecto"}>Ver Todos Los Detalles</Link></AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
    )
    
    }
