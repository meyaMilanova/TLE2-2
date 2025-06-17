
// Results.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import woodBackground from '../public/images/wood.webp';
import OrangeButton from "./Components/OrangeButton.jsx";
import BackButton from "./Components/BackButton.jsx";

function Results() {
    const navigate = useNavigate();
    const [sortingData, setSortingData] = useState(null);

    useEffect(() => {
        async function fetchSortingData() {
            const userData = JSON.parse(localStorage.getItem("userData"));
            const userId = userData?._id;
            if (!userId) return;

            try {
                const res = await fetch(`http://145.24.223.108:8000/sortingGame`);
                const data = await res.json();
                setSortingData(data);
            } catch (error) {
                console.error("Fout bij ophalen sorteerdata:", error);
            }
        }

        fetchSortingData();
    }, []);

    useEffect(() => {
        const userData = localStorage.getItem("userData");
        if (!userData) {
            navigate("/inloggen");
        }
    }, [navigate]);

    return (
        <motion.div
            className="min-h-screen bg-green-900 flex flex-col items-center justify-center relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ backgroundColor: '#14532d' }}
        >
            <BackButton onClick={() => navigate(-1)} />

            <motion.div
                className="w-[700px] h-auto rounded-2xl flex flex-col items-center justify-center relative p-6 gap-4"
                style={{
                    backgroundImage: `url(${woodBackground})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    boxShadow: '0 8px 24px rgba(60, 30, 10, 0.25)',
                    border: '4px solid #9c6b4f'
                }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
            >
                <div className="bg-orange-50 w-[550px] rounded-xl flex flex-col items-center justify-center shadow-inner border-4 border-orange-200 p-6">
                    <h2 className="text-4xl font-bold text-brown-900 mb-4">Sorteerresultaten</h2>
                    {sortingData ? (
                        <div className="text-2xl text-brown-800 space-y-2">
                            <p>🧴 Plastic: {sortingData.plastic}</p>
                            <p>🥦 GFT (eten): {sortingData.food}</p>
                            <p>📄 Papier: {sortingData.paper}</p>
                            <p>🗑️ Restafval: {sortingData.rest}</p>
                            <p className="font-bold mt-4">🏆 Highscore: {sortingData.high_score}</p>
                        </div>
                    ) : (
                        <p className="text-lg">Resultaten worden geladen...</p>
                    )}
                </div>
            </motion.div>

            <div className="flex gap-8 mt-8">
                <OrangeButton onClick={() => navigate("/afvalsorteren")}>Opnieuw</OrangeButton>
                <OrangeButton onClick={() => navigate("/hoofdpagina")}>Home</OrangeButton>
            </div>
        </motion.div>
    );
}

export default Results;
