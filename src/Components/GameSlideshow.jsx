import { useState, useEffect } from "react";

function GameSlideshow({ images, autoplayInterval = 3000 }) {
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
        const interval = setInterval(() => {
            handleNextImage();
        }, autoplayInterval);

        return () => clearInterval(interval); // Cleanup on unmount
    }, [currentIndex, autoplayInterval]);

    return (
        <div className="mb-5 relative max-w-3xl mx-auto overflow-hidden bg-gradient-to-br from-yellow-700 via-gray-800 to-yellow-700 shadow-2xl h-[30rem] rounded-lg">
            <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Slide ${index + 1}`}
                        className="w-full h-full object-cover flex-shrink-0"
                    />
                ))}
            </div>
            <div className="absolute inset-y-0 flex justify-between items-center w-full px-4">
                <button
                    onClick={handlePrevImage}
                    className="bg-orange-700/50 text-white text-3xl font-bold p-4 rounded-full hover:bg-orange-500/70 hover:scale-110 active:scale-95 transition-all shadow-lg shadow-orange-900 backdrop-blur-md"
                >
                    &#8592; {/* Left arrow */}
                </button>
                <button
                    onClick={handleNextImage}
                    className="bg-orange-700/50 text-white text-3xl font-bold p-4 rounded-full hover:bg-orange-500/70 hover:scale-110 active:scale-95 transition-all shadow-lg shadow-orange-900 backdrop-blur-md"
                >
                    &#8594; {/* Right arrow */}
                </button>
            </div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full ${
                            currentIndex === index ? "bg-yellow-500" : "bg-gray-500"
                        } transition-colors duration-300`}
                    ></button>
                ))}
            </div>
        </div>
    );
}

export default GameSlideshow;