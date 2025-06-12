// Results.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import woodBackground from '../public/images/wood.webp';
import OrangeButton from "./Components/OrangeButton.jsx";
import BackButton from "./Components/BackButton.jsx";

function Results() {
    const navigate = useNavigate();

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
                className="w-[700px] h-[350px] rounded-2xl flex items-center justify-center relative p-6"
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
                <div className="bg-orange-50 w-[550px] h-[200px] rounded-xl flex flex-col items-center justify-center shadow-inner border-4 border-orange-200">
                    <h2 className="text-6xl font-bold text-brown-900">10/15</h2>
                    <p className="text-3xl font-semibold text-brown-800 mt-2">Goed bezig makker!</p>
                </div>
            </motion.div>

            <div className="flex gap-8 mt-8">
                <OrangeButton onClick={() => navigate(0)}>Opnieuw</OrangeButton>
                <OrangeButton onClick={() => navigate("/hoofdpagina")}>Home</OrangeButton>
            </div>
        </motion.div>
    );
}

export default Results;
