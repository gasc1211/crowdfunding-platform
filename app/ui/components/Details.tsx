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



export default function Details({ project }: { project: Project }) {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)

    return (
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
                        Progreso del Proyecto: {selectedProject?.progress}%
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="py-4">
                    <ul>
                        {[
                        { label: "Nombre del Proyecto:", value: project.name },
                        { label: "Ubicación:", value: project.location },
                        {
                            label: "Inversión Projectada:",
                            value: new Intl.NumberFormat("es-HN", {
                            style: "currency",
                            currency: "HNL",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                            }).format(project.investment_goal),
                        },
                        {
                            label: "Inversión Actual:",
                            value: new Intl.NumberFormat("es-HN", {
                            style: "currency",
                            currency: "HNL",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                            }).format(project.total_invested),
                        },
                        { label: "Fecha de Inicio:", value: project.start_date },
                        { label: "Fecha de Finalización:", value: project.finish_date },
                        ].map((item, index) => (
                        <li key={index} className="flex">
                            {item.label} <div className="font-bold ml-2">{item.value}</div>
                        </li>
                        ))}
                    </ul>
                </div>

                <AlertDialogFooter>
                    <AlertDialogCancel>Cerrar</AlertDialogCancel>
                    <AlertDialogAction>
                        <Link href={`/proyecto/${project.project_id}`}>
                            Ver Todos Los Detalles
                        </Link>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )

}
