"use client";
import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";

export default function ResponsiveCarousel({
    projects,
}: {
    projects: Project[];
}) {
    const [currentSlide, setCurrentSlide] = useState(0);

    const goToSlide = useCallback((event: React.SyntheticEvent) => {
        const target = event.target as HTMLButtonElement;
        const index = Number(target.getAttribute("data-index"));
        setCurrentSlide(index);
    }, []);

    const goToPrevSlide = useCallback(() => {
        setCurrentSlide(
            (prev) => (prev - 1 + projects.length) % projects.length
        );
    }, [projects.length]);

    const goToNextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % projects.length);
    }, [projects.length]);

    useEffect(() => {
        const interval = setInterval(goToNextSlide, 5000);
        return () => clearInterval(interval);
    }, [goToNextSlide]);

    return (
        <div className="relative w-full rounded-md px-6 mt-4">
            <Carousel className="w-full" onSelect={goToSlide}>
                <CarouselContent
                    className="rounded-3xl"
                    style={{
                        transform: `translateX(-${currentSlide * 100}%)`,
                        transition: "transform 0.5s ease",
                    }}
                >
                    {projects.map((project, index) => (
                        <CarouselItem key={index}>
                            <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
                                <Image
                                    src={project!.project_banner_url as string}
                                    alt={project.name}
                                    fill
                                    className="object-cover rounded-3xl"
                                    priority={index === 0}
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 sm:p-6 md:p-8 rounded-3xl">
                                    <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-bold mb-2">
                                        {project.name}
                                    </h2>
                                    <p className="text-white text-sm sm:text-base md:text-lg">
                                        {project.description}
                                    </p>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>

            {/* Navigation Arrows */}
            <button
                onClick={goToPrevSlide}
                className="absolute top-1/2 left-12 transform -translate-y-1/2 p-2 bg-black/50 rounded-full text-white hover:bg-black/75 transition-colors"
                aria-label="Previous slide"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>
            <button
                onClick={goToNextSlide}
                className="absolute top-1/2 right-12 transform -translate-y-1/2 p-2 bg-black/50 rounded-full text-white hover:bg-black/75 transition-colors"
                aria-label="Next slide"
            >
                <ChevronRight className="w-6 h-6" />
            </button>

            {/* Position Indicators */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center gap-2">
                {projects.map((_, index) => (
                    <button
                        key={index}
                        onClick={goToSlide}
                        data-index={index}
                        className={`w-3 h-3 rounded-full transition-colors ${
                            currentSlide === index
                                ? "bg-white"
                                : "bg-white/50 hover:bg-white/75"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
