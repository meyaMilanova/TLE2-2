import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import BackButton from "./Components/BackButton.jsx";
import woodTexture from '../public/images/wood.webp';
import AntiDeeplink from "./Components/AntiDeeplink.jsx";
import toys from './data/toys.js';


function ToyCreation() {
    const navigate = useNavigate();
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    // State voor vuilniszak data
    const [bagData, setBagData] = useState(null);
    // State voor speelgoeddata
    const [speelgoedData, setSpeelgoedData] = useState(null)

    const parsedData = JSON.parse(localStorage.getItem('userData'))
    // const userId = parsedData?.id
    const userId = '684abee8a291c2dfb2a5eda1'

    // Functie om vuilniszak data op te halen
    async function fetchBagData() {
        try {
            const response = await fetch(`http://localhost:8000/sortingGame/user/${userId}`, {
                method: "GET",
                headers: { "Accept": "application/json" }
            });
            if (!response.ok) {
                throw new Error("Fout bij ophalen van vuilniszak data");
            }
            const data = await response.json();
            console.log(data)
            setBagData(data);
        } catch (error) {
            console.error(error);
            setBagData(null);
        }
    }

    // Functie om craftable speelgoed op te halen
    async function fetchToyData() {
        try {
            const response = await fetch(`http://localhost:8000/pet/craftable/${userId}`, {
                method: "GET",
                headers: { "Accept": "application/json" }
            });
            if (!response.ok) {
                throw new Error("Fout bij ophalen van speelgoed data");
            }
            const data = await response.json();
            console.log(data)
            setSpeelgoedData(data);
        } catch (error) {
            console.error(error);
            setSpeelgoedData(null);
        }
    }

    async function handlePetCrafting(toyId) {
        try {
            const response = await fetch(`http://localhost:8000/sortingGame/${userId}/min`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({ toyId })
            });

            const data = await response.json()
            if (!response.ok) {
                throw new Error(data.error || "Fout bij het maken van speelgoed")
            }
            await fetchToyData()
            await fetchBagData()
            console.log(data)
        } catch (error) {
            console.error("Maken van speelgoed mislukt:", error)
            alert(error.message)
        }
    }

    useEffect(() => {
        fetchToyData();
    }, []);


    // Haal data op zodra popup opent
    useEffect(() => {
        if (isPopupOpen) {
            fetchBagData();
        }
    }, [isPopupOpen]);

    return (
        <>
            <AntiDeeplink />
            <motion.div
                className="min-h-screen bg-green-900 flex flex-col items-center py-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <BackButton onClick={() => navigate(-1)} />
                <h1 className="text-white text-5xl font-bold mb-10">Speelgoed</h1>

                <div className="flex flex-col gap-8">
                    {speelgoedData?.items && speelgoedData.items.length > 0 ? (
                        Array.from({ length: Math.ceil(speelgoedData.items.length / 3) }).map((_, rowIndex) => (
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
                                        style={{ backgroundColor: '#D9D9D9' }}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.1 * idx, duration: 0.4 }}
                                    >
                                        <h2 className="text-lg font-semibold text-gray-800 mb-2">{toy.name}</h2>
                                        <img src={toy.image_url} alt={toy.name} className="w-20 h-20 mb-2" />

                                        {toy.plastic > 0 && (
                                            <p className="text-sm text-gray-700 mb-1">{toy.plastic} plastic</p>
                                        )}
                                        {toy.paper > 0 && (
                                            <p className="text-sm text-gray-700 mb-1">{toy.paper} papier</p>
                                        )}
                                        {toy.food > 0 && (
                                            <p className="text-sm text-gray-700 mb-1">{toy.food} gft</p>
                                        )}
                                        {toy.rest > 0 && (
                                            <p className="text-sm text-gray-700 mb-3">{toy.rest} restafval</p>
                                        )}

                                        {toy.isUnlocked ? (
                                            <div className="text-white text-sm px-4 py-1 rounded-full bg-orange-400">
                                                Gemaakt
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => handlePetCrafting(toy._id)}
                                                className="text-black text-sm px-4 py-1 rounded-full bg-pink-300 hover:bg-pink-400"
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

                <button
                    onClick={() => setIsPopupOpen(true)}
                    className="mt-12 px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg shadow-lg transition"
                >
                    Mijn vuilniszak
                </button>

                {isPopupOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                        onClick={() => setIsPopupOpen(false)}
                    >
                        <motion.div
                            className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg relative"
                            onClick={(e) => e.stopPropagation()}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                        >
                            <h2 className="text-2xl font-bold mb-4">Mijn Vuilniszak</h2>
                            {bagData ? (
                                <div>
                                    <p>Papier: <strong>{bagData.paper}</strong></p>
                                    <p>Voedsel: <strong>{bagData.food}</strong></p>
                                    <p>Plastic: <strong>{bagData.plastic}</strong></p>
                                    <p>Rest: <strong>{bagData.rest}</strong></p>
                                </div>
                            ) : (
                                <p>Bezig met laden of geen data gevonden...</p>
                            )}
                            <button
                                onClick={() => setIsPopupOpen(false)}
                                className="mt-6 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
                            >
                                Sluiten
                            </button>
                        </motion.div>
                    </div>
                )}
            </motion.div>
        </>
    );
}

export default ToyCreation;
