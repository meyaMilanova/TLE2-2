import React from 'react';
import {motion} from 'framer-motion';
import {useNavigate} from 'react-router-dom';
import BackButton from "./Components/BackButton.jsx";
import woodTexture from '../public/images/wood.webp';
import AntiDeeplink from "./Components/AntiDeeplink.jsx";
import toys from './data/toys.js';

function getStatusElement(status) {
    const commonClasses = "text-white text-sm px-4 py-1 rounded-full";
    switch (status) {
        case "Gekocht":
            return <div className={`${commonClasses} bg-orange-400`}>Gekocht</div>;
        case "Actief":
            return <div className={`${commonClasses} bg-green-400`}>Actief</div>;
        case "Kopen":
        default:
            return <div className={`${commonClasses} bg-pink-300 text-black`}>Kopen</div>;
    }
}

function ToyCreation() {
    const navigate = useNavigate();

    return (
        <>
            <AntiDeeplink />
        <motion.div
            className="min-h-screen bg-green-900 flex flex-col items-center py-10"
            style={{ backgroundColor: '#14532d' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <BackButton onClick={() => navigate(-1)} />

            <h1 className="text-white text-5xl font-bold mb-10">Speelgoed</h1>

            <div className="flex flex-col gap-8">
                {[0, 3].map(startIndex => (
                    <div
                        key={startIndex}
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
                        {toys.slice(startIndex, startIndex + 3).map((toy, idx) => (
                            <motion.div
                                key={toy.id}
                                className="flex flex-col items-center p-4 w-64 rounded shadow relative"
                                style={{ backgroundColor: '#D9D9D9' }}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.1 * (startIndex + idx), duration: 0.4 }}
                            >
                                <h2 className="text-lg font-semibold text-gray-800 mb-2">{toy.name}</h2>
                                <img src={toy.image} alt={toy.name} className="w-20 h-20 mb-2" />
                                <p className="text-sm text-gray-700 mb-1">{toy.plastic}/10 plastic</p>
                                <p className="text-sm text-gray-700 mb-3">{toy.paper}/20 papier</p>
                                {getStatusElement(toy.status)}
                            </motion.div>
                        ))}
                    </div>
                ))}
            </div>
        </motion.div>
        </>
    );
}

export default ToyCreation;