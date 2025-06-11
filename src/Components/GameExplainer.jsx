import BackButton from "./BackButton.jsx";
import React from "react";
import woodBackground from "../assets/wood.webp";

function GameExplainer() {
    return (
        <div className="min-h-screen bg-green-900 flex flex-col items-center justify-center relative overflow-hidden">
            <BackButton onClick={() => { /* handle navigation here */ }} />
            <h1 className="text-white text-6xl font-bold mb-8">Uitleg</h1>
            <div
                className="w-[1150px] h-[600px] rounded-2xl flex items-center justify-center relative"
                style={{
                    backgroundImage: `url(${woodBackground})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <div className="absolute top-4 left-4 w-5 h-5 bg-gray-700 rounded-full border-2 border-gray-400 shadow-md z-10"></div>
                <div className="absolute top-4 right-4 w-5 h-5 bg-gray-700 rounded-full border-2 border-gray-400 shadow-md z-10"></div>
                <div className="absolute bottom-4 left-4 w-5 h-5 bg-gray-700 rounded-full border-2 border-gray-400 shadow-md z-10"></div>
                <div className="absolute bottom-4 right-4 w-5 h-5 bg-gray-700 rounded-full border-2 border-gray-400 shadow-md z-10"></div>
            </div>
        </div>
    );
}

export default GameExplainer;