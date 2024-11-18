import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
    return (
        <div className='flex items-center justify-evenly h-dvh'>
            <SignUp signInUrl="/auth/sign-in"/>
        </div>
    )
}