import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
    return (
        <div className='flex items-center justify-evenly h-svh'>
            <SignIn signUpUrl="/auth/sign-up" forceRedirectUrl="/dashboard/profileInversor"/>
        </div>
    )
}