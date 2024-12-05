"use client";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { getUserId } from "@/app/api/handler";
import { CheckCircle2, XCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Image from "next/image";

type AlertType = "approved" | "rejected" | null;

interface ProducerRequest {
    id: string;
    user_id: string;
    username: string;
    location: string;
    description: string;
    profile_image_url: string;
    profile_banner_url: string;
    dni_image_url: string;
}

export default function Peticion() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDniImage, setSelectedDniImage] = useState<string | null>(
        null
    );

    const [alertType, setAlertType] = useState<AlertType>(null);
    const [producerRequests, setProducerRequests] = useState<ProducerRequest[]>(
        []
    );
    const [notifications, setNotifications] = useState<Record<string, string>>(
        {}
    );
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [userData, setUserData] = useState<Users["user_id"] | null>(null);
    const supabase = createClient();

    const openModal = (dniImageUrl: string) => {
        setSelectedDniImage(dniImageUrl);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedDniImage(null);
    };

    // Función para obtener solicitudes de productores desde Supabase
    useEffect(() => {
        async function fetchProducerRequests() {
            const { data, error } = await supabase
                .from("producer_requests")
                .select(
                    "id, user_id, biography, location, profile_image_url, profile_banner_url,status, username, dni_image_url"
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
                    profile_banner_url: request.profile_banner_url,
                    dni_image_url: request.dni_image_url,
                }));
                setProducerRequests(requests);

                const userInfo = await getUserId();
                setUserData(userInfo.user_id);
            }
        }

        fetchProducerRequests();
    }, [supabase]);

    // Handle textarea change
    const handleChange = (id: string, value: string) => {
        setNotifications((prev) => ({ ...prev, [id]: value }));
        if (errors[id]) {
            setErrors((prev) => ({ ...prev, [id]: "" }));
        }
    };

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
                    profile_banner_url: request.profile_banner_url,
                    biography: request.description,
                    location: request.location,
                });

            if (insertError) throw insertError;

            // Actualizar el estado de la solicitud a "approved"
            await supabase
                .from("producer_requests")
                .update({ status: "approved" })
                .eq("id", id);

            await supabase.from("notifications").insert({
                user_id: request.user_id,
                admin_id: userData,
                message: notifications[id] || "",
            });

            // Actualizar la interfaz
            setProducerRequests(
                producerRequests.filter((req) => req.id !== id)
            );

            setAlertType("approved");

            setTimeout(() => {
                setAlertType(null);
            }, 3000);

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

            setAlertType("rejected");

            setTimeout(() => {
                setAlertType(null);
            }, 3000);

            console.log(`Rejected producer ${id}`);

            await supabase
                .from("notifications")
                .insert({ 
                    user_id: id, 
                    admin_id: userData, 
                    message: notifications[id] || "",
                 });

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
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                        openModal(request.dni_image_url)
                                    }
                                    className="mb-4 primary bg-orange-500 hover:bg-orange-600 text-white hover:text-white"
                                >
                                    Ver DNI
                                </Button>
                                <div className="flex flex-col">
                                    <label
                                        htmlFor="message"
                                        className="mb-1 font-medium text-gray-700"
                                    >
                                        Comentario
                                    </label>
                                    <textarea
                                        id={`message-${request.id}`}
                                        name={`message-${request.id}`}
                                        value={notifications[request.id] || ""}
                                        onChange={(e) =>
                                            handleChange(
                                                request.id,
                                                e.target.value
                                            )
                                        }
                                        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        rows={4}
                                    />
                                    {errors.message && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.message}
                                        </p>
                                    )}
                                </div>
                                <br />
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
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-lg font-bold mb-4 place-self-center">
                            DNI del Solicitante
                        </h2>
                        {selectedDniImage ? (
                            <Image
                                src={selectedDniImage}
                                alt="DNI del Solicitante"
                                className="w-full h-auto rounded-md"
                                width={500}
                                height={500}
                            />
                        ) : (
                            <p className="text-center text-gray-500">
                                No se encontró la imagen.
                            </p>
                        )}
                        <div className="flex justify-end mt-4">
                            <Button variant="outline" onClick={closeModal}>
                                Cerrar
                            </Button>
                        </div>
                    </div>
                </div>
            )}
            {alertType && (
                <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
                    <Alert
                        className={`w-80 ${
                            alertType === "approved"
                                ? "border-green-500 bg-green-50 text-green-800"
                                : "border-red-500 bg-red-50 text-red-800"
                        }`}
                    >
                        {alertType === "approved" ? (
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                        ) : (
                            <XCircle className="h-4 w-4 text-red-500" />
                        )}
                        <AlertTitle>
                            {alertType === "approved" ? "¡Exito!" : "¡Exito!"}
                        </AlertTitle>
                        <AlertDescription>
                            {alertType === "approved"
                                ? "Se acepto la peticion."
                                : "Se rechazo la peticion."}
                        </AlertDescription>
                    </Alert>
                </div>
            )}
        </div>
    );
}
