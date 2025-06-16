import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import wasteItems from "./data/waste.js";
import AvatarMovement from './avatarMovement';
import BackButton from "./Components/BackButton.jsx";

function WasteSorting() {
    const navigate = useNavigate();
    const [randomItems, setRandomItems] = useState([]);
    const [avatarPos, setAvatarPos] = useState({ left: 50, top: 50 });
    const [collectedCount, setCollectedCount] = useState(0);
    const [collectedItems, setCollectedItems] = useState([]);

    // Check login + reset bij starten spel
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("userData"));
        if (!userData) {
            navigate("/inloggen");
        }

        localStorage.removeItem("collectedItems");
        setCollectedItems([]);
        setCollectedCount(0);
    }, [navigate]);

    // Genereer willekeurige items
    useEffect(() => {
        const getRandomWasteItems = () => {
            const items = [];
            const rows = 4;
            const cols = 5;
            const cellWidth = 100 / cols;
            const cellHeight = 100 / rows;
            const usedIndexes = new Set();

            for (let i = 0; i < rows * cols; i++) {
                let randomIndex;
                do {
                    randomIndex = Math.floor(Math.random() * wasteItems.length);
                } while (usedIndexes.has(randomIndex) && usedIndexes.size < wasteItems.length);

                usedIndexes.add(randomIndex);

                const row = Math.floor(i / cols);
                const col = i % cols;
                const left = col * cellWidth + Math.random() * (cellWidth * 0.7);
                const top = row * cellHeight + Math.random() * (cellHeight * 0.7);

                items.push({
                    ...wasteItems[randomIndex],
                    left,
                    top
                });
            }
            return items;
        };

        setRandomItems(getRandomWasteItems());
    }, []);

    // Check collision
    const checkCollision = (avatar, item) => {
        const size = 10;
        return (
            Math.abs(avatar.left - item.left) < size &&
            Math.abs(avatar.top - item.top) < size
        );
    };

    // Verzamel afval bij botsing
    useEffect(() => {
        if (collectedCount >= 15) return;

        const foundIndex = randomItems.findIndex(item => checkCollision(avatarPos, item));
        if (foundIndex !== -1) {
            const foundItem = randomItems[foundIndex];
            setCollectedCount(prev => prev + 1);

            setCollectedItems(prevItems => {
                const updated = [...prevItems, foundItem];
                localStorage.setItem("collectedItems", JSON.stringify(updated));
                return updated;
            });

            setRandomItems(items => items.filter((_, i) => i !== foundIndex));
        }
    }, [avatarPos, randomItems, collectedCount]);

    return (
        <div
            className="waste-sorting min-h-screen flex flex-col items-center justify-center relative"
            style={{
                overflow: "hidden",
                backgroundImage: "url('../backgrounds/map.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <BackButton onClick={() => navigate(-1)} />

            {/* Teller rechtsboven */}
            <div style={{
                position: "fixed",
                top: 20,
                right: 30,
                background: "rgba(255,255,255,0.9)",
                borderRadius: "1rem",
                padding: "0.5rem 1.2rem",
                fontWeight: "bold",
                fontSize: "1.5rem",
                zIndex: 1000,
                color: collectedCount >= 15 ? "red" : "black",
                border: collectedCount >= 15 ? "2px solid red" : "none",
            }}>
                🗑️ {collectedCount}/15
            </div>

            <div className="relative w-[100vw] h-[100vh] rounded-xl overflow-hidden">
                <AvatarMovement onMove={setAvatarPos} />
                {randomItems.map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center absolute"
                        style={{
                            left: `${item.left}%`,
                            top: `${item.top}%`,
                            transform: "translate(-50%, -50%)"
                        }}
                    >
                        <img src={item.image} alt={item.name} className="w-20 h-20 object-contain" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WasteSorting;
