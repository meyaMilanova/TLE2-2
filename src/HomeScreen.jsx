import React from 'react';
import {useNavigate} from 'react-router-dom';
import BackButton from "./Components/BackButton.jsx";
import PinkButton from './components/PinkButton';
import placeholderImg from './assets/placeholder.jpg';
import woodBackground from './assets/wood.webp';
import OrangeButton from "./Components/OrangeButton.jsx";

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
            <BackButton onClick={() => { /* handle navigation here */
            }}/>
            <h1 className="text-white text-6xl font-bold mb-8">Hoi [Jouw Naam]!</h1>

            <div
                className="w-[1150px] h-[600px] rounded-2xl flex items-center justify-center relative"
                style={{
                    backgroundImage: `url(${woodBackground})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <div
                    className="absolute top-4 left-4 w-5 h-5 bg-gray-700 rounded-full border-2 border-gray-400 shadow-md z-10"></div>
                <div
                    className="absolute top-4 right-4 w-5 h-5 bg-gray-700 rounded-full border-2 border-gray-400 shadow-md z-10"></div>
                <div
                    className="absolute bottom-4 left-4 w-5 h-5 bg-gray-700 rounded-full border-2 border-gray-400 shadow-md z-10"></div>
                <div
                    className="absolute bottom-4 right-4 w-5 h-5 bg-gray-700 rounded-full border-2 border-gray-400 shadow-md z-10"></div>

                <div className="grid grid-cols-2 grid-rows-2 w-[1100px] h-[550px] gap-8 p-6">
                    {rectangles.map((rect) => (
                        <div
                            key={rect.label}
                            className="flex flex-row items-center justify-center rounded border-2 text-2xl w-full h-full relative"
                            style={{
                                backgroundColor: '#FDE3CF',
                                boxShadow: '0 8px 24px rgba(60, 30, 10, 0.25), 0 2px 4px rgba(60, 30, 10, 0.15)',
                                border: '3px solid #b48a78'
                            }}
                        >
                            <div
                                className="absolute top-2 left-2 w-4 h-4 bg-gray-700 rounded-full border-2 border-gray-400 shadow-md"></div>
                            <div
                                className="absolute top-2 right-2 w-4 h-4 bg-gray-700 rounded-full border-2 border-gray-400 shadow-md"></div>

                            <div className="flex items-center justify-center w-1/3 h-full">
                                <img src={placeholderImg} alt="placeholder" className="w-full h-full object-cover"/>
                            </div>

                            <div className="flex flex-col items-start w-2/3 h-full pl-4 pr-2">
                                <span className="text-4xl mt-8" style={{color: '#632713'}}>{rect.label}</span>
                                <p className="mt-2 mb-2 text-base text-black flex-1">{rect.description}</p>
                                <OrangeButton
                                    type="button"
                                    onClick={() => navigate('/')}
                                    style={{fontSize: '1.4rem', padding: '0.7rem 2rem'}}
                                    className="self-end mb-4 mr-3"
                                >
                                    Start
                                </OrangeButton>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HomeScreen;