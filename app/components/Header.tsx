import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default function Header(){
    const { userId } = auth();



    return(
        <nav className="bg-green-600 mx-auto flex items-center justify-between p-3 lg:px-10" aria-label="Global">
            <div className="flex items-center space-x-4">
                <h1>Crowdfunding</h1>
                <Link href='/pages/about'>About</Link>
            </div>
            <div className="hidden lg:flex lg:gap-x-12">
                {userId ? (
                    <div>
                        <UserButton />
                    </div>
                ) : (
                    <div className="hidden lg:flex lg:gap-x-12">
                        <Link href='/sign-up'>Sign up</Link>
                        <Link href='/sign-in'>Sign in</Link>
                    </div>
                )}
            </div>
        </nav>
    )
}