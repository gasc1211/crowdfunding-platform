'use client'
import Link from "next/link";
import { SignedOut, SignedIn, SignInButton, UserButton, useUser } from '@clerk/nextjs';

import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { BellIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { type NavigationItem, mainNavigationItems, userNavigationItems } from "@/lib/definitions";

export default function Navbar() {

  const { user } = useUser();

  return (
    <Disclosure as="nav" className="bg-lime-700">
      <div className="mx-auto max px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              {/* Insert Logo Here */}
              {/* <Image src="" alt="Logo" width={50} height={50}></Image> */}
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {mainNavigationItems.map((item: NavigationItem) => (
                  <Link
                    key={item.name}
                    href={item.href}

                    aria-current={item.current ? 'page' : undefined}
                    className={
                      'rounded-md px-3 py-2 text-sm fon?t-medium' +
                        item.current ? 'text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }
                  >
                    <button className={'bg-black rounded-xl p-1.5 bg-opacity-40'}>{item.name}</button>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <SignedIn>
                <UserButton />
              </SignedIn>
              <SignedOut>
                <div className="inline px-4 py-2 ml-2 text-sm text-white bg-black rounded-full">
                  <SignInButton />
                </div>
              </SignedOut>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
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
        <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
          {mainNavigationItems.map((item: NavigationItem) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={
                'block rounded-md px-3 py-2 text-base font-medium' +
                  item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
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
            {userNavigationItems.map((item: NavigationItem) => (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
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