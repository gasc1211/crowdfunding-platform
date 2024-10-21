import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Menu } from "lucide-react"

export default function Hero() {
    return (
        <div className="bg-green-100 py-12 px-4">
            <div className="container mx-auto text-center">
                <h1 className="text-4xl font-bold mb-4">
                    ¡Bienvenido, Daniel!
                </h1>
                <p className="text-xl mb-8">
                    Estos son los proyectos en los que puedes invertir
                </p>
                <div className="flex justify-center items-center space-x-4">
                    <Input
                        className="max-w-md"
                        placeholder="Buscar proyectos..."
                    />
                    <Button variant="default">
                        <Search className="w-5 h-5" />
                    </Button>
                    <Button variant="outline">
                        <Menu className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
