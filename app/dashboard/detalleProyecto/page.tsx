import Banner from "@/app/ui/components/Banner";
import Sidebar from "@/app/ui/components/Sidebar";
import ProjectDetails from "@/app/ui/components/ProjectDetails";

export default function DetalleProyecto() {
    return (
        <>
            <div className="h-screen">
                <Banner />
                <main className="flex-grow container mx-auto p-4 md:flex md:space-x-4">
                    <Sidebar />
                    <ProjectDetails />
                </main>
            </div>
        </>
    );
}
