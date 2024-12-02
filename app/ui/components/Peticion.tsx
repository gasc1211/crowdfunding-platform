"use client";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProducerRequest {
    id: string;
    name: string;
    type: string;
    description: string;
    imageUrl: string;
}

export default function Peticion() {
    const producerRequests: ProducerRequest[] = [
        {
            id: "1",
            name: "María González",
            type: "Granja de Hortalizas Orgánicas",
            description:
                "Agricultora dedicada al cultivo de productos orgánicos frescos para nuestra comunidad local",
            imageUrl: "/placeholder.svg?height=400&width=400",
        },
        {
            id: "2",
            name: "Carlos Ruiz",
            type: "Miel Artesanal",
            description:
                "Apicultor especializado en la producción de miel orgánica y productos derivados de la colmena",
            imageUrl: "/placeholder.svg?height=400&width=400",
        },
        {
            id: "3",
            name: "Alberto Romero",
            type: "Agricultor",
            description:
                "Apicultor especializado en la producción de miel orgánica y productos derivados de la colmena",
            imageUrl: "/placeholder.svg?height=400&width=400",
        },
    ];

    const handleApprove = (id: string) => {
        console.log(`Approved producer ${id}`);
    };

    const handleReject = (id: string) => {
        console.log(`Rejected producer ${id}`);
    };

    return (
        <div className="container mx-auto px-4 py-8 pt-24">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-center mb-2 mt-4">
                    Solicitudes de Productores
                </h1>
                <p className="text-muted-foreground text-center">
                    Revise y apruebe las solicitudes de nuevos productores para
                    unirse a nuestra comunidad
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {producerRequests.map((request) => (
                    <Card key={request.id} className="overflow-hidden">
                        <CardHeader className="pb-4">
                            <div className="flex items-center gap-4">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage
                                        src={request.imageUrl}
                                        alt={request.name}
                                    />
                                    <AvatarFallback>
                                        {request.name.slice(0, 2)}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <CardTitle className="text-lg">
                                        {request.name}
                                    </CardTitle>
                                    <p className="text-sm text-muted-foreground">
                                        {request.type}
                                    </p>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">
                                {request.description}
                            </p>
                            <div className="flex gap-2 justify-end">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                    onClick={() => handleReject(request.id)}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                    onClick={() => handleApprove(request.id)}
                                >
                                    <Check className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
