import { SignUp } from '@clerk/nextjs'

export default function Page() {
    return(
        <div className='flex justify-center content-center'>
            <div className='py-12'>
                <SignUp />
            </div>
        </div>
    )
}