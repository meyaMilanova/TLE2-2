import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import BackButton from "./components/BackButton.jsx";
import PauseButton from "./components/PauseButton.jsx";
import woodTexture from '../public/images/wood.webp';
import AntiDeeplink from "./components/AntiDeeplink.jsx";
import toys from './data/toys.js';
import { useRef } from 'react';


function ToyCreation() {
    const navigate = useNavigate();
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const [bagData, setBagData] = useState(null);
    const [speelgoedData, setSpeelgoedData] = useState(null);

    const parsedData = JSON.parse(localStorage.getItem('userData'));
    const userId = parsedData?.id;

    const dropdownRef = useRef();


    // Ophalen vuilnisdata
    async function fetchBagData() {
        try {
            const response = await fetch(`http://145.24.223.108:8000/sortingGame/user/${userId}`, {
                method: "GET",
                headers: { "Accept": "application/json" }
            });
            if (!response.ok) throw new Error("Fout bij ophalen van vuilniszak data");
            const data = await response.json();
            setBagData(data);
        } catch (error) {
            console.error(error);
            setBagData(null);
        }
    }

    // Ophalen speelgoeddata
    async function fetchToyData() {
        try {
            const response = await fetch(`http://145.24.223.108:8000/pet/craftable/${userId}`, {
                method: "GET",
                headers: { "Accept": "application/json" }
            });
            if (!response.ok) throw new Error("Fout bij ophalen van speelgoed data");
            const data = await response.json();
            setSpeelgoedData(data);
        } catch (error) {
            console.error(error);
            setSpeelgoedData(null);
        }
    }

    // Speelgoed maken
    async function handlePetCrafting(toyId) {
        try {
            const response = await fetch(`http://145.24.223.108:8000/sortingGame/${userId}/min`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({ toyId })
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Fout bij het maken van speelgoed");

            await fetchToyData();
            await fetchBagData();
        } catch (error) {
            console.error("Maken van speelgoed mislukt:", error);
            alert(error.message);
        }
    }

    useEffect(() => {
        fetchToyData();
        fetchBagData();
    }, []);

    useEffect(() => {
        if (isPopupOpen) {
            fetchBagData();
        }
    }, [isPopupOpen]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsPopupOpen(false);
            }
        }

        if (isPopupOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isPopupOpen]);


    // 🔴 Pauze functionaliteit
    function handlePause() {
        const gameData = {
            speelgoedData,
            bagData
        };
        localStorage.setItem("gameDataToyCreation", JSON.stringify(gameData));
        navigate("/pauze", { state: { gameKey: "gameDataToyCreation" } });
    }

    return (
        <>
            <AntiDeeplink />
            <motion.div
                className="min-h-screen bg-green-900 flex flex-col items-center py-10"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
            >
                <PauseButton onClick={handlePause}/>
                <div className="absolute top-6 right-6 z-50">
                    <div className="relative inline-block text-left">
                        <button
                            onClick={() => setIsPopupOpen(!isPopupOpen)}
                            className="px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg shadow-lg text-xl w-64"
                        >
                            Mijn vuilniszak
                        </button>

                        {isPopupOpen && (
                            <motion.div
                                ref={dropdownRef}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute right-0 mt-2 w-64 bg-white rounded shadow-lg p-4 z-50"
                                style={{
                                    background: "#FDE3CF",
                                    borderRadius: "1rem",
                                    padding: "0.5rem 1.2rem",
                                    color: "#632713",
                                    boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
                                }}
                            >
                                {bagData ? (
                                    <div className="space-y-2 text-lg" >
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">Inhoud Vuilniszak</h3>
                                        <div className="gap-2 flex flex-col" >
                                            <div className="flex items-center gap-2 p-2 rounded ">
                                                ♻️ <span className="text-gray-700">Plastic:</span>
                                                <strong>{bagData.plastic}</strong>
                                            </div>
                                            <div className="flex items-center gap-2 p-2 ">
                                                🧻 <span className="text-gray-700">Papier:</span>
                                                <strong>{bagData.paper}</strong>
                                            </div>
                                            <div className="flex items-center gap-2 p-2 rounded ">
                                                🥦 <span className="text-gray-700">Gft:</span>
                                                <strong>{bagData.food}</strong>
                                            </div>
                                            <div className="flex items-center gap-2 p-2 rounded ">
                                                🗑️ <span className="text-gray-700">Rest:</span>
                                                <strong>{bagData.rest}</strong>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-600 italic">Bezig met laden of geen data gevonden...</p>
                                )}

                            </motion.div>
                        )}
                    </div>
                </div>



                <h1 className="text-white text-5xl font-bold mb-10">Speelgoed Maken</h1>

                <div className="flex flex-col gap-8">
                    {speelgoedData?.items && speelgoedData.items.length > 0 ? (
                        Array.from({length: Math.ceil(speelgoedData.items.length / 3)}).map((_, rowIndex) => (
                            <div
                                key={rowIndex}
                                className="flex gap-4 justify-center px-6 py-4"
                                style={{
                                    backgroundImage: `url(${woodTexture})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    border: '4px solid #773c24',
                                    borderRadius: '12px',
                                    boxShadow: 'inset 0 0 4px #00000055'
                                }}
                            >
                                {speelgoedData.items.slice(rowIndex * 3, rowIndex * 3 + 3).map((toy, idx) => (
                                    <motion.div
                                        key={toy._id}
                                        className="flex flex-col items-center p-4 w-64 rounded shadow relative"
                                        style={{
                                            background: "#FDE3CF",
                                            borderRadius: "1rem",
                                            padding: "0.5rem 1.2rem",
                                            color: "#632713",
                                            boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
                                        }}
                                        initial={{opacity: 0, scale: 0.9}}
                                        animate={{opacity: 1, scale: 1}}
                                        transition={{delay: 0.1 * idx, duration: 0.4}}
                                    >
                                        <h2 className="text-lg font-semibold text-gray-800 mb-2">{toy.name}</h2>
                                        <img src={toy.image_url} alt={toy.name} className="w-20 mb-2"/>

                                        {/* Resource container met vaste hoogte */}
                                        <div className="min-h-[120px] flex flex-col justify-start">
                                            {toy.plastic > 0 && (
                                                <p className={`text-sm mb-1 ${bagData?.plastic >= toy.plastic ? 'text-green-600 font-bold' : 'text-red-600'}`}>
                                                    Plastic: {bagData ? `${Math.min(bagData.plastic, toy.plastic)}/${toy.plastic}` : toy.plastic}
                                                </p>
                                            )}
                                            {toy.paper > 0 && (
                                                <p className={`text-sm mb-1 ${bagData?.paper >= toy.paper ? 'text-green-600 font-bold' : 'text-red-600'}`}>
                                                    Papier: {bagData ? `${Math.min(bagData.paper, toy.paper)}/${toy.paper}` : toy.paper}
                                                </p>
                                            )}
                                            {toy.food > 0 && (
                                                <p className={`text-sm mb-1 ${bagData?.food >= toy.food ? 'text-green-600 font-bold' : 'text-red-600'}`}>
                                                    Gft: {bagData ? `${Math.min(bagData.food, toy.food)}/${toy.food}` : toy.food}
                                                </p>
                                            )}
                                            {toy.rest > 0 && (
                                                <p className={`text-sm mb-1 ${bagData?.rest >= toy.rest ? 'text-green-600 font-bold' : 'text-red-600'}`}>
                                                    Rest: {bagData ? `${Math.min(bagData.rest, toy.rest)}/${toy.rest}` : toy.rest}
                                                </p>
                                            )}
                                        </div>

                                        {toy.isUnlocked ? (
                                            <div className="text-white text-sm px-4 py-1 rounded-full bg-orange-400 mt-2">
                                                Gemaakt
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => handlePetCrafting(toy._id)}
                                                className="text-black text-sm px-4 py-1 rounded-full bg-pink-300 hover:bg-pink-400 mt-2 mb-4"
                                            >
                                                Maken
                                            </button>

                                        )}
                                    </motion.div>

                                ))}
                            </div>
                        ))
                    ) : (
                        <p className="text-white text-center text-lg">Geen speelgoed beschikbaar om te kopen.</p>
                    )}
                </div>

                {/*<button*/}
                {/*    onClick={() => setIsPopupOpen(true)}*/}
                {/*    className="absolute top-6 right-6 px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg shadow-lg transition z-50 text-xl"*/}
                {/*>*/}
                {/*    Mijn vuilniszak*/}
                {/*</button>*/}

                {/*{isPopupOpen && (*/}
                {/*    <div*/}
                {/*        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"*/}
                {/*        onClick={() => setIsPopupOpen(false)}*/}
                {/*    >*/}
                {/*        <motion.div*/}
                {/*            className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg relative"*/}
                {/*            onClick={(e) => e.stopPropagation()}*/}
                {/*            initial={{opacity: 0, scale: 0.8}}*/}
                {/*            animate={{opacity: 1, scale: 1}}*/}
                {/*            exit={{opacity: 0, scale: 0.8}}*/}
                {/*        >*/}
                {/*            <h2 className="text-2xl font-bold mb-4">Mijn Vuilniszak</h2>*/}
                {/*            {bagData ? (*/}
                {/*                <div>*/}
                {/*                    <p>Papier: <strong>{bagData.paper}</strong></p>*/}
                {/*                    <p>Gft: <strong>{bagData.food}</strong></p>*/}
                {/*                    <p>Plastic: <strong>{bagData.plastic}</strong></p>*/}
                {/*                    <p>Rest: <strong>{bagData.rest}</strong></p>*/}
                {/*                </div>*/}
                {/*            ) : (*/}
                {/*                <p>Bezig met laden of geen data gevonden...</p>*/}
                {/*            )}*/}
                {/*            <button*/}
                {/*                onClick={() => setIsPopupOpen(false)}*/}
                {/*                className="mt-6 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"*/}
                {/*            >*/}
                {/*                Sluiten*/}
                {/*            </button>*/}
                {/*        </motion.div>*/}
                {/*    </div>*/}
                {/*)}*/}
            </motion.div>
        </>
    );
}

export default ToyCreation;
