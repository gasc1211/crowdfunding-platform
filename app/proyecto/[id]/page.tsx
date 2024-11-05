import Banner from "@/app/ui/components/Banner";
import Sidebar from "@/app/ui/components/Sidebar";
import ProjectDetails from "@/app/ui/components/ProjectDetails";

export default function DetalleProyecto({ params }: { params: { id: string } }) {
    console.log(params);
    return (
        <>
            <div className="h-screen">
                <Banner />
                <main className="flex-grow container mx-auto p-4 md:flex md:space-x-4">
                    <Sidebar name="Contactar al Productor" url="" />
                    <ProjectDetails />
                </main>
            </div>
        </>
    );
}
