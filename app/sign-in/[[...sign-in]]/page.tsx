import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
    return(
        <div className='flex justify-center content-center'>
            <div className='py-12'>
                <SignIn />
            </div>
        </div>
    )
}