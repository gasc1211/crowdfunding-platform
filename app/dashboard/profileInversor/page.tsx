import { HeroInversor } from "@/app/ui/components/Hero"
import InversorCard from "@/app/ui/components/InversorCard"
import InversorDetails from "@/app/ui/components/InversorDetails"

export default function ProfileaInversor() {
    return <>
    <HeroInversor/>
    <div className="container mx-auto p-4 bg-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <InversorCard/>
            <InversorDetails/>
        </div>
    </div>
    </>
}