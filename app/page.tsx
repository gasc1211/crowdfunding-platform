"use client";
import Link from "next/link";
import Image from "next/image";
import { apfel_regular, ortica } from "./ui/fonts";
import Cartas from "./ui/components/Cartas";
import Footer from "./ui/components/Footer";
import Navbar from "./ui/components/Navbar";
// import Mision from "./ui/components/Mision";
import Carrousel from "./ui/components/Carrousel";

export default function HomePage() {
    return (
        <>
            <Navbar />
            <br />
            <div className="min-h-full mt-10">
                <main className="flex min-h-screen flex-col p-6">
                    <div className="mx-4 flex grow flex-col gap-4 md:flex-row justify-between">
                        <div className="flex flex-col justify-center gap-6 rounded-3xlpx-6 py-10 md:w-3/5 md:px-20 mx-4">
                            <div />
                            <p
                                className={`${ortica.className} font-bold text-md md:text-2xl md:leading-normal`}
                            >
                                <strong>
                                    HAGA REALIDAD SUS IDEAS CON NUESTRA
                                    PLATAFORMA DE FINANCIACIÓN COLECTIVA.
                                </strong>
                            </p>
                            <p className={`${apfel_regular.className}`}>
                                Lanza y gestiona fácilmente tu campaña de
                                crowdfunding. Conéctese con patrocinadores,
                                realice un seguimiento del progreso y convierta
                                su visión en realidad.
                                <br />
                                <br />
                                Además, puedes convertirte también en un
                                patrocinador
                            </p>
                            <div className="mt-4 flex items-center justify-center gap-x-6 lg:justify-start">
                                <Link
                                    href="/auth/login"
                                    className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
                                >
                                    <span>Empezar Campaña</span>
                                </Link>
                                <Link
                                    href="/auth/login"
                                    className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
                                >
                                    <span>Explorar y Donar</span>
                                </Link>
                            </div>
                        </div>

                        <div className="flex items-center justify-center">
                            <Image
                                src="/productor.webp"
                                alt="Screenshots of the dashboard project showing desktop version"
                                className="md:block rounded-3xl"
                                width={800}
                                height={1000}
                                priority={true}
                            />
                        </div>
                    </div>
                    <div className="mt-10">
                        <Carrousel />
                    </div>
                    <div>
                        <Cartas />
                        {/* <Mision /> */}
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
}
