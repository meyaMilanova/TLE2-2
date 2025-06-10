import React from 'react';
import {useNavigate} from 'react-router-dom';
import BackButton from "./Components/BackButton.jsx";
import PinkButton from './components/PinkButton';
import placeholderImg from './assets/placeholder.jpg';

function HomeScreen() {
    const navigate = useNavigate();

    const rectangles = [
        { label: "Afval en sorteren", description: "Leer hoe je afval moet sorteren en waarom dat belangrijk is." },
        { label: "Speelgoed maken", description: "Maak je eigen speelgoed van gerecycled materiaal." },
        { label: "Elektrische kat", description: "Leer hoe je energie en water kunt besparen." },
        { label: "Tuintje", description: "Plant je eigen tuintje en leer over planten en natuur." }
    ];

    return (
        <div className="min-h-screen bg-green-900 flex flex-col items-center justify-center relative overflow-hidden">
            <BackButton onClick={() => { /* handle navigation here */ }} />
            <div className="grid grid-cols-2 grid-rows-2 w-[1100px] h-[550px] gap-8 p-6">
                {rectangles.map((rect) => (
                    <div
                        key={rect.label}
                        className="flex flex-row items-center justify-center rounded border-2 text-2xl w-full h-full"
                        style={{ backgroundColor: '#FDE3CF' }}
                    >
                        {/* Left: Image */}
                        <div className="flex items-center justify-center w-1/3 h-full">
                            <img src={placeholderImg} alt="placeholder" className="w-full h-full object-cover" />
                        </div>

                        {/* Right: Text, Description, and Button */}
                        <div className="flex flex-col items-start w-2/3 h-full pl-4 pr-2">
                            <span className="text-4xl mt-8" style={{ color: '#632713' }}>{rect.label}</span>
                            <p className="mt-2 mb-2 text-base text-black flex-1">{rect.description}</p>
                            <PinkButton
                                type="button"
                                onClick={() => navigate('/')}
                                style={{ fontSize: '1.4rem', padding: '0.7rem 2rem' }}
                                className="self-end mb-4 mr-3"
                            >
                                Start
                            </PinkButton>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HomeScreen;