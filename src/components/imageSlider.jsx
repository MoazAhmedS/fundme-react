import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ImageCarousel = ({ images = [], autoPlay = true, interval = 3000 }) => {
    const [current, setCurrent] = useState(0);
    const length = images.length;
    console.log(images);
    useEffect(() => {
        if (!autoPlay) return;
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % length);
        }, interval);
        return () => clearInterval(timer);
    }, [autoPlay, interval, length]);

    const nextSlide = () => setCurrent((prev) => (prev + 1) % length);
    const prevSlide = () => setCurrent((prev) => (prev - 1 + length) % length);

    if (length === 0) return null;

    return (
        <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-2xl shadow-md">
            <div className="relative w-full h-64 sm:h-80 md:h-96">
                {images.map((img, idx) => (
                    <img
                        key={idx}
                        src={`http://localhost:8000/${img.path}`}
                        alt={`slide-${idx}`}
                        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${idx === current ? "opacity-100 z-10" : "opacity-0 z-0"
                            }`}
                    />
                ))}
                <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-black/80 p-2 rounded-full text-white"
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-black/80 p-2 rounded-full text-white"
                >
                    <ChevronRight size={24} />
                </button>

            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
                {images.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrent(idx)}
                        className={`h-3 w-3 rounded-full transition-colors duration-300 ${idx === current ? "bg-white" : "bg-white/40"
                            }`}
                        aria-label={`Go to slide ${idx + 1}`}
                    ></button>
                ))}
            </div>

        </div>
    );
};

export default ImageCarousel;
