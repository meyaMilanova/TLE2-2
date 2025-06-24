import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import woodBackground from "../public/images/wood.webp";
import OrangeButton from "./components/OrangeButton.jsx";
import BackButton from "./components/BackButton.jsx";
import AntiDeeplink from "./components/AntiDeeplink.jsx";
import PinkButton from "./components/PinkButton.jsx";

function Results() {
    const navigate = useNavigate();
    const [groupedItems, setGroupedItems] = useState({});

    useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem("collectedItems") || "[]");

        const grouped = {};
        storedItems.forEach((item) => {
            const key = item.name || "Onbekend";
            if (!grouped[key]) {
                grouped[key] = { count: 0, image: item.image };
            }
            grouped[key].count += 1;
        });

        setGroupedItems(grouped);
    }, []);


    useEffect(() => {
        if (Object.keys(groupedItems).length > 0) {
            localStorage.removeItem("collectedItems");
        }
    }, [groupedItems]);


    return (
        <>
            <AntiDeeplink />
            <motion.div
                className="min-h-screen bg-green-900 flex flex-col items-center justify-center relative overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ backgroundColor: "#14532d" }}
            >
                <BackButton onClick={() => navigate(-1)} />

                {/* Replaced block */}
                <motion.div
                    className="w-[800px] min-h-[500px] rounded-2xl flex items-center justify-center relative p-8"
                    style={{
                        backgroundImage: `url(${woodBackground})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        boxShadow: "0 8px 24px rgba(60, 30, 10, 0.25)",
                        border: "4px solid #9c6b4f",
                    }}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    <div className="bg-orange-50 w-[600px] rounded-xl flex flex-col items-center justify-center shadow-inner border-4 border-orange-200 py-8 px-6">
                        <h2 className="text-6xl font-bold text-brown-900 text-center mb-6">
                            Goed bezig makker!
                        </h2>

                        <div className="grid grid-cols-2 gap-x-8 gap-y-5 w-full mt-2">
                            {Object.entries(groupedItems).map(([name, data]) => (
                                <div key={name} className="flex items-center gap-3">
                                    <img
                                        src={data.image}
                                        alt={name}
                                        className="w-10 h-10 object-contain"
                                    />
                                    <span className="text-lg font-semibold text-brown-800">
                                        {name}: {data.count}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                <div className="flex gap-4 mt-8">
                    <OrangeButton onClick={() => navigate("/afvalrapen")}>
                        Opnieuw
                    </OrangeButton>
                    <OrangeButton onClick={() => navigate("/hoofdpagina")}>
                        Hoofdpagina
                    </OrangeButton>
                    <PinkButton onClick={() => navigate("/speelgoedmaken")}>
                        Speelgoed maken
                    </PinkButton>
                </div>
            </motion.div>
        </>
    );
}

export default Results;
