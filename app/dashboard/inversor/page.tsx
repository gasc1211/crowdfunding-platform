import Footer from "@/app/ui/components/Footer";
import Hero from "@/app/ui/components/Hero";
import ProjectCard from "@/app/ui/components/ProjectCard";

export default function InversorDashboard() {
    const projects = [
        {
            title: "Creación de huerto comunitario",
            description:
                "Desarrollo de un espacio para cultivo de consumo local.",
            image: "",
            progress: 70,
        },
        {
            title: "Producción de alimentos orgánicos",
            description:
                "Gran impacto en la salud y el bienestar de la población local al mejorar la calidad de los alimentos y la producción agrícola.",
            image: "/Agricultor.jpeg",
            progress: 45,
        },
        {
            title: "Mejora de calidad de suelos",
            description:
                "Se lleva a cabo mediante la reducción de la contaminación, el uso eficiente de los recursos naturales y el manejo adecuado de los desechos.",
            image: "/Agricultor.jpeg",
            progress: 60,
        },
    ];

    return (
        <>
            <div className="min-h-screen flex flex-col">
                <main className="flex-grow">
                    <Hero />
                    <div className="container mx-auto py-8 px-4">
                        {projects.map((project, index) => (
                            <ProjectCard key={index} project={project} />
                        ))}
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
}
