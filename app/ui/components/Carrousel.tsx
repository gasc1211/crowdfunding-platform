"use client";
import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";

interface SlideData {
    imageUrl: string;
    title: string;
    description: string;
}

const slides: SlideData[] = [
    {
        imageUrl: "/banner.jpg",
        title: "Proyecto 1",
        description:
            "Discover the wonders of nature with our breathtaking views.",
    },
    {
        imageUrl: "/banner2.png",
        title: "Proyecto 2",
        description:
            "Experience the vibrant nightlife of bustling metropolises.",
    },
    {
        imageUrl: "/banner3.png",
        title: "Proyecto 3",
        description:
            "Relax and unwind on pristine shores with crystal-clear waters.",
    },
];

export default function ResponsiveCarousel() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const goToSlide = useCallback((event: React.SyntheticEvent) => {
        const target = event.target as HTMLButtonElement;
        const index = Number(target.getAttribute("data-index"));
        setCurrentSlide(index);
    }, []);

    const goToPrevSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }, []);

    const goToNextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, []);

    useEffect(() => {
        const interval = setInterval(goToNextSlide, 5000);
        return () => clearInterval(interval);
    }, [goToNextSlide]);

    return (
        <div className="relative w-full">
            <Carousel className="w-full" onSelect={goToSlide}>
                <CarouselContent
                    style={{
                        transform: `translateX(-${currentSlide * 100}%)`,
                        transition: "transform 0.5s ease",
                    }}
                >
                    {slides.map((slide, index) => (
                        <CarouselItem key={index}>
                            <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
                                <Image
                                    src={slide.imageUrl}
                                    alt={slide.title}
                                    fill
                                    className="object-cover"
                                    priority={index === 0}
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 sm:p-6 md:p-8">
                                    <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-bold mb-2">
                                        {slide.title}
                                    </h2>
                                    <p className="text-white text-sm sm:text-base md:text-lg">
                                        {slide.description}
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
                className="absolute top-1/2 left-4 transform -translate-y-1/2 p-2 bg-black/50 rounded-full text-white hover:bg-black/75 transition-colors"
                aria-label="Previous slide"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>
            <button
                onClick={goToNextSlide}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 p-2 bg-black/50 rounded-full text-white hover:bg-black/75 transition-colors"
                aria-label="Next slide"
            >
                <ChevronRight className="w-6 h-6" />
            </button>

            {/* Position Indicators */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center gap-2">
                {slides.map((_, index) => (
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
