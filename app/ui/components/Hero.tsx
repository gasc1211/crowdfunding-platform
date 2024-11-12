/* import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Menu } from "lucide-react"; */

type HeroInversorProps = {
    userName: string;
};

export default function Hero() {
    return (
        <>
            <br />
            <br />
            <div
                className="bg-white py-12 px-4 z-0"
                style={{
                    backgroundImage: "url('/banner2.png')",
                }}
            >
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl font-bold mb-4">
                        ¡Bienvenido!
                    </h1>
                    <p className="text-xl mb-8">
                        Estos son los proyectos en los que puedes invertir
                    </p>
                </div>
            </div>
        </>
    );
}

export function HeroInversor({ userName }: HeroInversorProps) {
    return (
        <section
            className="relative h-64 bg-cover bg-center"
            style={{
                backgroundImage: "url('/banner3.png')",
            }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center">
                <div className="text-center text-white">
                    <h1 className="text-4xl font-bold mb-2">
                        ¡Bienvenido, Juan!
                    </h1>
                    <p className="text-xl">
                        ¿Listo para ayudar a crear un mejor futuro?
                    </p>
                </div>
            </div>
        </section>
    );
}
