'use client'
import { SignedIn, UserButton, useUser } from '@clerk/nextjs';
import { usePathname } from "next/navigation";
import Link from "next/link";

import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { BellIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { type NavigationItem, NavigationUsers } from "@/lib/definitions";
import { apfel_fett } from '../fonts';

export default function Navbar() {

  const { user } = useUser();
  const pathname = usePathname();

  return (
    <Disclosure as="nav" className="bg-primary fixed left-0 top-0 w-dvw">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0">
            {/* Insert Logo Here */}
            {/* <Image src="" alt="Logo" width={50} height={50}></Image> */}
            <h1 className={`${apfel_fett.className} text-xl text-primary-foreground`}>
              <Link href="/">
                AgroStart🌱
              </Link>
            </h1>
          </div>
          <div className="flex ml-auto items-center">
            <div className="hidden md:block">
              <div className="flex items-baseline space-x-4">
                {NavigationUsers.map((item: NavigationItem) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    aria-current={pathname === item.href ? 'page' : undefined}
                    className={' rounded-md px-3 py-2 text-md text-white hover:text-gray-200'}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden ml-2 md:block">
            <div className="flex items-center">
              {user ? (
                <div>
                  <UserButton />
                </div>
              ) : (!(pathname.includes('/sign-up') || pathname.includes('/sign-in')) ?
                <div className="hidden lg:flex lg:gap-x-2">
                  
                </div> : <div></div>

              )}
            </div>
          </div>
          <div className="mr-2 flex md:hidden">
            {/* Mobile menu button */}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel className="md:hidden">
        <div className="border-t border-gray-700 pb-3 pt-4">
          <div className="flex items-center px-5">
            <SignedIn>
              <div>
                <div className="flex-shrink-0">
                  {/* <Image alt="Profile" src={user.imageUrl} className="h-10 w-10 rounded-full" width={50} height={50} /> */}
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium leading-none text-white">{user?.username}</div>
                  {/* <div className="text-sm font-medium leading-none text-gray-400">{user!.emailAddresses}</div> */}
                </div>
              </div>
            </SignedIn>
            <button
              type="button"
              className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-3 space-y-1 px-2">
            {NavigationUsers.map((item: NavigationItem) => (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                className="block rounded-md px-3 py-2 text-base font-medium text-background hover:bg-gray-700 hover:text-white"
              >
                {item.name}
              </DisclosureButton>
            ))}
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure >
  );
}