"use client";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

interface ProducerRequest {
    id: string;
    user_id: string;
    username: string;
    location: string;
    description: string;
    profile_image_url: string;
}

export default function Peticion() {
    const [producerRequests, setProducerRequests] = useState<ProducerRequest[]>(
        []
    );
    const supabase = createClient();

    // Función para obtener solicitudes de productores desde Supabase
    useEffect(() => {
        async function fetchProducerRequests() {
            const { data, error } = await supabase
                .from("producer_requests")
                .select(
                    "id, user_id, biography, location, profile_image_url, status, username"
                )
                .eq("status", "pending");

            if (error) {
                console.error("Error fetching producer requests:", error);
            } else {
                // Mapear data para adaptarlo a la interfaz
                const requests = data.map((request) => ({
                    id: request.id,
                    user_id: request.user_id,
                    username: request.username || "Productor",
                    location: request.location,
                    description: request.biography,
                    profile_image_url: request.profile_image_url,
                }));
                setProducerRequests(requests);
            }
        }

        fetchProducerRequests();
    }, [supabase]);

    // Función para aprobar una solicitud
    const handleApprove = async (id: string) => {
        try {
            const request = producerRequests.find((req) => req.id === id);
            if (!request) return;

            // Insertar el productor en la tabla definitiva `producer`
            const { error: insertError } = await supabase
                .from("producer")
                .insert({
                    user_id: request.user_id,
                    profile_image_url: request.profile_image_url,
                    biography: request.description,
                    location: request.location,
                });

            if (insertError) throw insertError;

            // Actualizar el estado de la solicitud a "approved"
            await supabase
                .from("producer_requests")
                .update({ status: "approved" })
                .eq("id", id);

            // Actualizar la interfaz
            setProducerRequests(
                producerRequests.filter((req) => req.id !== id)
            );
            console.log(`Approved producer ${id}`);
        } catch (error) {
            console.error("Error approving producer:", error);
        }
    };

    // Función para rechazar una solicitud
    const handleReject = async (id: string) => {
        try {
            await supabase
                .from("producer_requests")
                .update({ status: "rejected" })
                .eq("id", id);
            setProducerRequests(
                producerRequests.filter((req) => req.id !== id)
            );
            console.log(`Rejected producer ${id}`);
        } catch (error) {
            console.error("Error rejecting producer:", error);
        }
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

            {producerRequests.length === 0 ? (
                <p className="text-center text-muted-foreground">
                    No hay solicitudes pendientes en este momento.
                </p>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {producerRequests.map((request) => (
                        <Card key={request.id} className="overflow-hidden">
                            <CardHeader className="pb-4">
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-12 w-12">
                                        <AvatarImage
                                            src={request.profile_image_url}
                                            alt={request.username}
                                        />
                                        <AvatarFallback>
                                            {request.username.slice(0, 2)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <CardTitle className="text-lg">
                                            {request.username}
                                        </CardTitle>
                                        <p className="text-sm text-muted-foreground">
                                            {request.location}
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
                                        onClick={() =>
                                            handleApprove(request.id)
                                        }
                                    >
                                        <Check className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
