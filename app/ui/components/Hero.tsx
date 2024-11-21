/* import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Menu } from "lucide-react"; */

type HeroInversorProps = {
    userName: string;
};

export default function Hero() {
    return (
        <div className="mx-auto">

          <div className="h-[20vh] flex items-center justify-center rounded-xl bg-[url('/banner2.png')] bg-cover">
            <h1 className="text-primary text-4xl md:text-6xl font-bold text-center px-4">Proyectos Para Invertir</h1>
          </div>

        </div>
    );
}

export function HeroInversor({ userName }: HeroInversorProps) {
    return (
        <div className="mx-auto">
            <div className="h-[20vh] flex items-center justify-center rounded-xl bg-[url('/banner3.png')] bg-cover">
                <h1 className="text-white text-4xl font-bold text-center px-4">
                    Bienvenido a tu Dashboard {userName}
                </h1>
            </div>
        </div>
    );
}
