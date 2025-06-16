import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import woodBackground from "../../public/images/wood.webp";
import GameSlideshow from "./GameSlideshow.jsx";
import games from "../data/games.js";
import OrangeButton from "./OrangeButton.jsx";
import BackButton from "./BackButton.jsx";
import { motion } from "framer-motion";

function GameExplainer() {
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            navigate('/inloggen');
        }
    }, []);

    const game = games.find((p) => p.id === parseInt(id));

    if (!game) {
        return (
            <div className="text-white text-2xl mt-10 text-center">
                Geen spel gevonden met ID {id}.
            </div>
        );
    }

    const title = `${game.title} - uitleg`;

    const handlePlay = () => {
        if (game.id === 1) {
            navigate("/afvalsorteren");
        } else {
            // hier kun je andere spellen later toevoegen
            console.warn("Spel nog niet geïmplementeerd.");
        }
    };

    return (
        <motion.div
            className="min-h-screen bg-green-900 flex flex-col items-center justify-center relative overflow-hidden"
        >
            <BackButton onClick={() => navigate(-1)} />

            <div className="text-white text-6xl font-bold mb-8">
                {title}
            </div>

            <motion.div
                className="w-[1150px] h-[600px] rounded-2xl flex items-center justify-center relative mb-6"
                style={{
                    backgroundImage: `url(${woodBackground})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                {/* Decoratieve hoeken */}
                <div className="absolute top-4 left-4 w-5 h-5 bg-gray-700 rounded-full border-2 border-gray-400 shadow-md z-10"></div>
                <div className="absolute top-4 right-4 w-5 h-5 bg-gray-700 rounded-full border-2 border-gray-400 shadow-md z-10"></div>
                <div className="absolute bottom-4 left-4 w-5 h-5 bg-gray-700 rounded-full border-2 border-gray-400 shadow-md z-10"></div>
                <div className="absolute bottom-4 right-4 w-5 h-5 bg-gray-700 rounded-full border-2 border-gray-400 shadow-md z-10"></div>

                <GameSlideshow images={game.images} />
            </motion.div>

            <motion.div
                whileHover={{ scale: 1.08, rotate: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="mb-4"
            >
                <OrangeButton
                    type="button"
                    onClick={handlePlay}
                    style={{ fontSize: '1.8rem', padding: '0.7rem 4rem' }}
                >
                    Spelen
                </OrangeButton>
            </motion.div>
        </motion.div>
    );
}

export default GameExplainer;
