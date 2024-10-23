import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto text-center">
                <p className="mb-4">Síguenos en:</p>
                <div className="flex justify-center space-x-4 mb-4">
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
                <div className="text-sm">
                    <Link href="#" className="hover:underline">
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
            </div>
        </footer>
    );
}
