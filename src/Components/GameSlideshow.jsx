import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // optioneel voor mooiere pijlen

function GameSlideshow({ images, autoplayInterval = 10000 }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    useEffect(() => {
        const interval = setInterval(handleNextImage, autoplayInterval);
        return () => clearInterval(interval);
    }, [currentIndex, autoplayInterval]);

    return (
        <div className="relative w-[90%] max-w-4xl mx-auto overflow-hidden rounded-2xl border-4 border-yellow-700 shadow-xl shadow-black/40 bg-yellow-950/80 backdrop-blur-sm">
            <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Slide ${index + 1}`}
                        className="w-full h-[30rem] object-cover flex-shrink-0 rounded-2xl"
                    />
                ))}
            </div>

            {/* Navigatieknoppen */}
            <div className="absolute inset-y-0 left-0 right-0 flex justify-between items-center px-6">
                <button
                    onClick={handlePrevImage}
                    className="bg-green-900/60 text-white p-3 rounded-full hover:bg-green-700/70 hover:scale-110 active:scale-95 transition-all shadow-lg"
                >
                    <ChevronLeft size={32} />
                </button>
                <button
                    onClick={handleNextImage}
                    className="bg-green-900/60 text-white p-3 rounded-full hover:bg-green-700/70 hover:scale-110 active:scale-95 transition-all shadow-lg"
                >
                    <ChevronRight size={32} />
                </button>
            </div>

            {/* Indicatoren */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full ${
                            currentIndex === index ? "bg-yellow-400 scale-110" : "bg-gray-500/60"
                        } transition-all duration-300`}
                    ></button>
                ))}
            </div>
        </div>
    );
}

export default GameSlideshow;
