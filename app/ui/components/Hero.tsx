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
        <div className="mx-auto">
          <div className="h-[20vh] flex items-center justify-center rounded-xl bg-[url('/banner3.png')] bg-cover">
            <h1 className="text-white text-4xl font-bold text-center px-4">Bienvenido a tu Dashboard {userName}</h1>
          </div>
        </div>
    );
}
