"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { apfel_regular, ortica } from "./ui/fonts";
import Cartas from "./ui/components/Cartas";
/* import Footer from "./ui/components/Footer"; */
import Navbar from "./ui/components/Navbar";
import Carrousel from "./ui/components/Carrousel";
import { createClient } from "@/utils/supabase/client";
import { getUserDataNav, isProducer } from "@/app/api/handler";

export default function HomePage() {
    const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
    const [userData, setUserData] = useState<Users | null>(null);
    const [isUserProducer, setIsUserProducer] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null); // Updated type to Error | null

    useEffect(() => {
        const fetchProjectsData = async () => {
            // Fetch projects data in the format required for the carrousel
            const supabase = createClient();
            const result = await supabase.from("projects").select("*").limit(5);

            // Set projects data if succesfully fetched
            if (!result.error) setFeaturedProjects(result.data as Project[]);
        };

        fetchProjectsData();
    }, [featuredProjects]);

    useEffect(() => {
        async function fetchData() {
            try {
                console.log("Fetching user data...");
                const data = await getUserDataNav();

                if (data) {
                    setUserData(data);
                    const producerStatus = await isProducer(data.user_id);
                    setIsUserProducer(producerStatus);
                } else {
                    console.log("No user data found (not authenticated)");
                }
            } catch (err) {
                console.error(err);
                setError(
                    err instanceof Error ? err : new Error("Unknown error")
                );
            }
        }

        fetchData();
    }, []);
    if (error) return <div>Error: {error.message}</div>;

    return (
        <>
            <Navbar />
            <div className="min-h-full mt-10">
                <main className="flex min-h-screen flex-col p-8">
                    <div className="mx-4 flex grow flex-col gap-4 md:flex-row justify-between mt-6">
                        <div className="flex flex-col justify-center gap-8 rounded-3xlpx-6 py-10 md:w-3/5 md:px-20 mx-4">
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
                                {userData ? (
                                    // Renderizado para usuarios autenticados
                                    <div>
                                        <Link
                                            href={
                                                isUserProducer
                                                    ? "/proyecto/nuevo"
                                                    : "/productor/editar"
                                            }
                                            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
                                        >
                                            <span>Empezar Campaña</span>
                                        </Link>
                                    </div>
                                ) : (
                                    // Renderizado para usuarios no autenticados
                                    <div>
                                        <Link
                                            href="/auth/sign-in"
                                            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
                                        >
                                            <span>Empezar Campaña</span>
                                        </Link>
                                    </div>
                                )}
                                <Link
                                    href="/dashboard/inversor"
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
                        <Carrousel projects={featuredProjects} />
                    </div>
                    <div>
                        <Cartas />
                        
                    </div>
                </main>
            
            </div>
        </>
    );
}
