import wasteItems from "./data/waste.js";
import AvatarMovement from './avatarMovement';
import BackButton from "./Components/BackButton.jsx";
import React, { useState, useEffect } from "react";

function WasteSorting() {
    const [randomItems, setRandomItems] = useState([]);
    const [avatarPos, setAvatarPos] = useState({ left: 50, top: 50 });
    const [collectedCount, setCollectedCount] = useState(0);
    const [collectedItems, setCollectedItems] = useState([]);

    // Clear localStorage on component mount (start of game)
    useEffect(() => {
        localStorage.removeItem("collectedItems");
        setCollectedItems([]);
        setCollectedCount(0);
    }, []);

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

    const checkCollision = (avatar, item) => {
        const avatarSize = 10;
        const itemSize = 10;
        return (
            Math.abs(avatar.left - item.left) < (avatarSize + itemSize) / 2 &&
            Math.abs(avatar.top - item.top) < (avatarSize + itemSize) / 2
        );
    };

    useEffect(() => {
        if (collectedCount >= 15) return; // Cap

        const foundIndex = randomItems.findIndex(item => checkCollision(avatarPos, item));
        if (foundIndex !== -1) {
            const foundItem = randomItems[foundIndex];
            setCollectedCount(count => count + 1);

            setCollectedItems(items => {
                const newCollected = [...items, foundItem];
                localStorage.setItem("collectedItems", JSON.stringify(newCollected));
                return newCollected;
            });

            setRandomItems(items => items.filter((_, idx) => idx !== foundIndex));
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
            <BackButton onClick={() => { /* handle navigation here */ }} />
            {/* Counter in top-right */}
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
