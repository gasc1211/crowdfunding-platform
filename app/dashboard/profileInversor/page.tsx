import { HeroInversor } from "@/app/ui/components/Hero"
import Sidebar from "@/app/ui/components/Sidebar"
import InversorDetails from "@/app/ui/components/InversorDetails"

export default function ProfileaInversor() {
    return <>
    <div className="bg-gray-100">
        <HeroInversor/>
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Sidebar/>
                <InversorDetails/>
            </div>
        </div>
    </div>
    </>
}