import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-primary opacity-80 text-white py-2">
            <div className="container mx-auto text-center">
                {/* <p className="mb-1">Síguenos en:</p> */}
                <div className="flex justify-center space-x-4 mb-1">
                    <Link href="#" className="hover:text-green-500">
                        Facebook
                    </Link>
                    <Link href="#" className="hover:text-green-500">
                        Twitter
                    </Link>
                    <Link href="#" className="hover:text-green-500">
                        Instagram
                    </Link>
                </div>
                <div className="text-sm [&>*]:px-2">
                    <Link href="/contact" className="hover:underline">
                        Contacto
                    </Link>{" "}
                    |
                    <Link href="#" className="hover:underline">
                        {" "}
                        Términos y Condiciones
                    </Link>{" "}
                    |
                    <Link href="#" className="hover:underline">
                        {" "}
                        Política de Privacidad
                    </Link>
                </div>
                <p className="mt-1">©️AgroStart 2024</p>
            </div>
        </footer>
    );
}
