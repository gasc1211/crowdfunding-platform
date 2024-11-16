import Banner from "@/app/ui/components/Banner";
import Sidebar from "@/app/ui/components/Sidebar";
import ProjectDetails from "@/app/ui/components/ProjectDetails";
import ProjectGallery from "@/app/ui/components/ProjectGallery";

export default function DetalleProyecto({ params }: { params: { id: string } }) {
    console.log(params);
    return (
        <div className="min-h-screen flex flex-col">
            <div className="container mx-auto p-4">
                <Banner />
                <div className="flex-grow">
                    <div className="flex flex-col lg:flex-row gap-6 mt-4">
                        <div className="lg:w-1/3 xl:w-1/4">
                            <Sidebar />
                        </div>
                        <div className="lg:w-2/3 xl:w-3/4">
                            <ProjectDetails />
                        </div>
                    </div>
                    <div className="mt-8">
                        <ProjectGallery />
                    </div>
                </div>
            </div>
        </div>
    );
}