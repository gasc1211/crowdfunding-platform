import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@/components/ui/avatar";

export default function InversorCard() {
    return (
        <aside className="md:col-span-1">
            <Card className="bg-red-100">
                <CardContent className="p-6">
                    <div className="text-center mb-4">
                        <Avatar className="w-24 h-24 mx-auto">
                            <AvatarImage
                                src="/placeholder.svg?height=96&width=96"
                                alt="Juan Zambrano"
                            />
                            <AvatarFallback>JZ</AvatarFallback>
                        </Avatar>
                        <h3 className="text-xl font-bold mt-2">
                            Juan Zambrano
                        </h3>
                    </div>
                    <div className="text-sm">
                        <p>
                            <strong>Edad:</strong> 35 años
                        </p>
                        <p className="mt-2">
                            <strong>Proyectos de interés:</strong>
                        </p>
                        <ul className="list-disc list-inside">
                            <li>Ganadería</li>
                            <li>Agricultura</li>
                            <li>Energía Renovable</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </aside>
    );
}
