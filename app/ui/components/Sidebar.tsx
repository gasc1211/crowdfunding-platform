import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface SidebarProps {
    name: string;
    url: string;
}

export default function Sidebar({ name, url }: SidebarProps) {
    return (
        <aside className="w- bg-red-100 p-4 rounded-lg mb-4 md:mb-0">
            <div className="text-center">
                <h2 className="text-xl font-bold">Juan Ramirez</h2>
                <Image
                    src="/avatar.png"
                    alt="Juan Ramirez"
                    className="mx-auto rounded-full w-24 h-24 mb-2"
                    width={100}
                    height={100}
                />
                <p>Edad: 45 años.</p>
                <p>
                    Intereses: Agricultura, ganadería e ingeniería de
                    producción.
                </p>
                <Link href={url} passHref>
                    <Button className="mt-4 bg-orange-500 hover:bg-orange-600">
                        {name}
                    </Button>
                </Link>
            </div>
        </aside>
    );
}
