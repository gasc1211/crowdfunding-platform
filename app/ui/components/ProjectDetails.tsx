import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ProjectDetails() {
    return (
        <Card className="w-full lg:w-full h-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Proyectos en Desarrollo</CardTitle>
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
                        $1000.00
                    </span>
                    <span className="text-2xl font-bold text-green-500">
                        $800.00
                    </span>
                </div>
                <Progress value={50} className="mb-4 h-4" />
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <h3 className="font-bold mb-2">
                            Descripción del Proyecto
                        </h3>
                        <p>
                            Un huerto comunitario fortalece el sentimiento de
                            pertenencia en los barrios y ayuda a que las
                            comunidades rescaten, revalorizan y se apropien de
                            sitios eriazos que de otra manera, probablemente
                            terminarían llenos de basura. Ayuda a reducir los
                            desechos orgánicos de la comunidad, al ser
                            utilizados como compostaje.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-bold mb-2">Beneficios</h3>
                        <p>
                            Permite reducir los gastos en alimentos y funciona
                            como sistema de apoyo alimentario para aquellas
                            familias con menores ingresos. Facilita el acceso a
                            alimentos frescos y de calidad como frutas y
                            vegetales y por ende a una mejor calidad de vida y
                            salud.
                        </p>
                    </div>
                </div>
                <p className="mb-4">Fecha de cierre de inversión: 30/01/2025</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
            <Button className="w-full bg-orange-500 hover:bg-orange-600">
                <Link href="/pagos/confirmacionPagos">Invertir Ahora</Link>
            </Button>
        </CardFooter>
      </Card>
    );
}
