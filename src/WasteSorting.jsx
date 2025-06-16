import wasteItems from "./data/waste.js";
import AvatarMovement from './avatarMovement';
import React, { useState, useEffect } from "react";
import PauseButton from "./Components/PauseButton.jsx";
import { useNavigate } from "react-router-dom";

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

function WasteSorting() {
    const [randomItems, setRandomItems] = useState([]);
    const [avatarPos, setAvatarPos] = useState({ left: 50, top: 50 });
    const [collectedCount, setCollectedCount] = useState(0);
    const [collectedItems, setCollectedItems] = useState([]);

    const navigate = useNavigate();

    const updateGameData = (updatedData) => {
        const currentData = JSON.parse(localStorage.getItem("gameDataWasteSorting")) || {};
        const newData = { ...currentData, ...updatedData };
        localStorage.setItem("gameDataWasteSorting", JSON.stringify(newData));
    };

    const handleMove = (newPos) => {
        setAvatarPos(newPos);
        const currentData = JSON.parse(localStorage.getItem("gameDataWasteSorting")) || {};
        const updatedData = {
            ...currentData,
            avatarPos: newPos,
        };
        localStorage.setItem("gameDataWasteSorting", JSON.stringify(updatedData));
    };

    // Clear localStorage on component mount (start of game)
    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem("gameDataWasteSorting"));
        if (savedData) {
            setCollectedItems(savedData.collectedItems || []);
            setCollectedCount(savedData.collectedCount || 0);
            if (savedData.avatarPos && typeof savedData.avatarPos.left === 'number' && typeof savedData.avatarPos.top === 'number') {
                setAvatarPos(savedData.avatarPos);
            } else {
                setAvatarPos({ left: 50, top: 50 });
            }
            setRandomItems(savedData.randomItems || getRandomWasteItems());
        } else {
            const items = getRandomWasteItems();
            setRandomItems(items);
            updateGameData({
                collectedItems: [],
                collectedCount: 0,
                avatarPos: { left: 50, top: 50 },
                randomItems: items
            });
        }
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
            const newCollectedCount = collectedCount + 1;
            const newCollectedItems = [...collectedItems, foundItem];
            const newRandomItems = randomItems.filter((_, idx) => idx !== foundIndex);

            setCollectedCount(newCollectedCount);
            setCollectedItems(newCollectedItems);
            setRandomItems(newRandomItems);

            updateGameData({
                collectedItems: newCollectedItems,
                collectedCount: newCollectedCount,
                avatarPos,
                randomItems: newRandomItems
            });
        }
    }, [avatarPos, randomItems, collectedCount]);

    const saveGame = () => {
        const gameData  = {
            collectedItems,
            collectedCount,
            avatarPos,
            randomItems
        };
        localStorage.setItem("gameDataWasteSorting", JSON.stringify(gameData));
    }


    const handleBack = () => {
        saveGame();
        navigate('/pauze', { state: { gameKey: 'gameDataWasteSorting' } });
    };

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
            <PauseButton onClick={handleBack} />
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
                <AvatarMovement position={avatarPos} onMove={handleMove} />
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
