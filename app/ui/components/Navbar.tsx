"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";

import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { type NavigationItem, mainNavigationItems } from "@/lib/definitions";
import { apfel_fett } from "../fonts";
import { getUserDataNav, isProducer } from "@/app/api/handler";
import { useEffect, useState } from "react";

export default function Navbar() {
    const [userData, setUserData] = useState<Users | null>(null);
    const [isUserProducer, setIsUserProducer] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null); // Updated type to Error | null

    const { user } = useUser();
    const pathname = usePathname();

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
        <Disclosure
            as="nav"
            className="bg-primary fixed left-0 top-0 w-dvw z-10"
        >
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex-shrink-0">
                        {/* Insert Logo Here */}
                        {/* <Image src="" alt="Logo" width={50} height={50}></Image> */}
                        <h1
                            className={`${apfel_fett.className} text-xl text-primary-foreground`}
                        >
                            <Link href="/">AgroStart🌱</Link>
                        </h1>
                    </div>

                    <div className="flex ml-auto items-center">
                        <div className="hidden md:block">
                            <div className="flex items-baseline space-x-4">
                                {userData ? (
                                    // Renderizado para usuarios autenticados
                                    <div>
                                        {mainNavigationItems.map(
                                            (item: NavigationItem) => {
                                                const updatedHref =
                                                    isUserProducer &&
                                                    item.name ===
                                                        "Empezar una Campaña"
                                                        ? "/proyecto/nuevo"
                                                        : item.href;

                                                return (
                                                    <Link
                                                        key={item.name}
                                                        href={updatedHref}
                                                        aria-current={
                                                            pathname ===
                                                            updatedHref
                                                                ? "page"
                                                                : undefined
                                                        }
                                                        className={
                                                            "rounded-md px-3 py-2 text-md text-white hover:text-gray-200"
                                                        }
                                                    >
                                                        {item.name}
                                                    </Link>
                                                );
                                            }
                                        )}
                                    </div>
                                ) : (
                                    // Renderizado para usuarios no autenticados
                                    <div>
                                        {mainNavigationItems.map(
                                            (item: NavigationItem) => (
                                                <Link
                                                    key={item.name}
                                                    href={item.href}
                                                    aria-current={
                                                        pathname === item.href
                                                            ? "page"
                                                            : undefined
                                                    }
                                                    className={
                                                        "rounded-md px-3 py-2 text-md text-white hover:text-gray-200"
                                                    }
                                                >
                                                    {item.name}
                                                </Link>
                                            )
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="hidden ml-2 md:block">
                        <div className="flex items-center">
                            {user ? (
                                <div>
                                    <UserButton />
                                </div>
                            ) : !(
                                  pathname.includes("/sign-up") ||
                                  pathname.includes("/sign-in")
                              ) ? (
                                <div className="hidden lg:flex lg:gap-x-2">
                                    <Link
                                        className="bg-white hover:bg-blue-500 text-blue-700 font-semibold hover:text-white border border-blue-500 hover:border-transparent rounded px-2 py-1"
                                        href="/auth/sign-up"
                                    >
                                        Regístrate
                                    </Link>
                                    <Link
                                        className="bg-white hover:bg-yellow-500 text-yellow-700 font-semibold hover:text-white border border-yellow-500 hover:border-transparent rounded px-2 py-1"
                                        href="/auth/sign-in"
                                    >
                                        Iniciar Sesión
                                    </Link>
                                </div>
                            ) : (
                                <div></div>
                            )}
                        </div>
                    </div>
                    <div className="mr-2 flex md:hidden">
                        {/* Mobile menu button */}
                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon
                                aria-hidden="true"
                                className="block h-6 w-6 group-data-[open]:hidden"
                            />
                            <XMarkIcon
                                aria-hidden="true"
                                className="hidden h-6 w-6 group-data-[open]:block"
                            />
                        </DisclosureButton>
                    </div>
                </div>
            </div>

            <DisclosurePanel className="md:hidden">
                <div className="border-t border-gray-700 pb-3 pt-4">
                    <div className="flex items-center px-5">
                        {user ? (
                            <div className="flex items-center w-full">
                                {/* Imagen o círculo de perfil */}
                                <UserButton />
                            </div>
                        ) : (
                            <div></div>
                        )}
                    </div>

                    <div className="mt-3 space-y-1 px-2">
                        {userData ? (
                            // Renderizado para usuarios autenticados
                            <div>
                                {mainNavigationItems.map(
                                    (item: NavigationItem) => {
                                        const updatedHref =
                                            isUserProducer &&
                                            item.name === "Empezar una Campaña"
                                                ? "/proyecto/nuevo"
                                                : item.href;

                                        return (
                                            <DisclosureButton
                                                key={item.name}
                                                as="a"
                                                href={updatedHref}
                                                aria-current={
                                                    pathname === updatedHref
                                                        ? "page"
                                                        : undefined
                                                }
                                                className={
                                                    "block rounded-md px-3 py-2 text-base font-medium text-background hover:bg-gray-700 hover:text-white"
                                                }
                                            >
                                                {item.name}
                                            </DisclosureButton>
                                        );
                                    }
                                )}
                            </div>
                        ) : (
                            // Renderizado para usuarios no autenticados
                            <div>
                                {mainNavigationItems.map(
                                    (item: NavigationItem) => (
                                        <DisclosureButton
                                            key={item.name}
                                            as="a"
                                            href={item.href}
                                            aria-current={
                                                pathname === item.href
                                                    ? "page"
                                                    : undefined
                                            }
                                            className={
                                                "block rounded-md px-3 py-2 text-base font-medium text-background hover:bg-gray-700 hover:text-white"
                                            }
                                        >
                                            {item.name}
                                        </DisclosureButton>
                                    )
                                )}
                            </div>
                        )}
                    </div>
                    {/* Botones de "Regístrate" e "Iniciar sesión" al final del menú desplegable */}
                    {!user &&
                        !pathname.includes("/sign-up") &&
                        !pathname.includes("/sign-in") && (
                            <div className="mt-4 px-2 space-y-1 flex flex-col">
                                <DisclosureButton
                                    as="a"
                                    href="/auth/sign-up"
                                    className="w-1/2 bg-white hover:bg-blue-500 text-blue-700 font-semibold hover:text-white border border-blue-500 hover:border-transparent rounded px-2 py-1 text-center place-self-center"
                                >
                                    Regístrate
                                </DisclosureButton>
                                <DisclosureButton
                                    as="a"
                                    href="/auth/sign-in"
                                    className="w-1/2  bg-white hover:bg-yellow-500 text-yellow-700 font-semibold hover:text-white border border-yellow-500 hover:border-transparent rounded px-2 py-1 text-center place-self-center"
                                >
                                    Iniciar Sesión
                                </DisclosureButton>
                            </div>
                        )}
                </div>
            </DisclosurePanel>
        </Disclosure>
    );
}
