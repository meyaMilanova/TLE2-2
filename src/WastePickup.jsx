import { wasteItems, facts } from "./data/waste.js";
import AvatarMovement from './components/AvatarMovement.jsx';
import PauseButton from "./components/PauseButton.jsx";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import AntiDeeplink from "./components/AntiDeeplink.jsx";

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

function WastePickup() {
    const [randomItems, setRandomItems] = useState([]);
    const [avatarPos, setAvatarPos] = useState({ left: 50, top: 50 });
    const [collectedCount, setCollectedCount] = useState(0);
    const [collectedItems, setCollectedItems] = useState([]);
    const [showOverview, setShowOverview] = useState(false);
    const [showFullMessage, setShowFullMessage] = useState(false);
    const [avatar, setAvatar] = useState("");
    const [factMessage, setFactMessage] = useState(null);
    const [showIntro, setShowIntro] = useState(true);
    const navigate = useNavigate();
    const [cooldownActive, setCooldownActive] = useState(false);
    const [countdown, setCountdown] = useState(0);

    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem("gameDataWasteSorting"));
        if (savedData) {
            setCollectedItems(savedData.collectedItems || []);
            setCollectedCount(savedData.collectedCount || 0);
            if (savedData.avatarPos && typeof savedData.avatarPos.left === 'number' && typeof savedData.avatarPos.top === 'number') {
                setAvatarPos(savedData.avatarPos);
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

        const savedAvatar = localStorage.getItem("selectedAvatar");
        if (savedAvatar) {
            const movementAvatar = savedAvatar.replace(".png", "1.png");
            setAvatar(movementAvatar);
        }
    }, []);

    useEffect(() => {
        if (cooldownActive) {
            const timer = setInterval(() => {
                setCountdown(prev => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        setCooldownActive(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [cooldownActive]);

    const updateGameData = (updatedData) => {
        const currentData = JSON.parse(localStorage.getItem("gameDataWasteSorting")) || {};
        const newData = { ...currentData, ...updatedData };
        localStorage.setItem("gameDataWasteSorting", JSON.stringify(newData));
    };

    const handleMove = (newPos) => {
        if (cooldownActive) return;
        setAvatarPos(newPos);
        updateGameData({ avatarPos: newPos });
    };

    const checkCollision = (avatar, item) => {
        const avatarSize = 10;
        const itemSize = 10;
        return (
            Math.abs(avatar.left - item.left) < (avatarSize + itemSize) / 2 &&
            Math.abs(avatar.top - item.top) < (avatarSize + itemSize) / 2
        );
    };

    useEffect(() => {
        if (collectedCount >= 15 || cooldownActive) return;

        const foundIndex = randomItems.findIndex(item => checkCollision(avatarPos, item));
        if (foundIndex !== -1) {
            const foundItem = randomItems[foundIndex];
            const newCollectedCount = collectedCount + 1;
            const newCollectedItems = [...collectedItems, foundItem];
            const newRandomItems = randomItems.filter((_, idx) => idx !== foundIndex);

            setCollectedCount(newCollectedCount);
            setCollectedItems(newCollectedItems);
            setRandomItems(newRandomItems);

            const messages = facts[foundItem.name];
            if (messages && messages.length > 0) {
                const randomIndex = Math.floor(Math.random() * messages.length);
                setFactMessage(messages[randomIndex]);
                setCooldownActive(true);
                setCountdown(8);
                setTimeout(() => setFactMessage(null), 8000);
            }

            updateGameData({
                collectedItems: newCollectedItems,
                collectedCount: newCollectedCount,
                avatarPos,
                randomItems: newRandomItems
            });
            localStorage.setItem("collectedItems", JSON.stringify(newCollectedItems));
        }
    }, [avatarPos, randomItems, collectedCount, cooldownActive]);

    useEffect(() => {
        if (collectedCount >= 15) {
            setShowFullMessage(true);
        }
    }, [collectedCount]);

    const getGroupedItems = () => {
        const grouped = {};
        collectedItems.forEach((item) => {
            const key = item.name || "Onbekend";
            if (!grouped[key]) {
                grouped[key] = { count: 0, image: item.image };
            }
            grouped[key].count += 1;
        });
        return grouped;
    };

    const saveGame = () => {
        const gameData  = {
            collectedItems,
            collectedCount,
            avatarPos,
            randomItems
        };
        localStorage.setItem("gameDataWasteSorting", JSON.stringify(gameData));
    };

    const handleBack = () => {
        saveGame();
        navigate('/pauze', { state: { gameKey: 'gameDataWasteSorting' } });
    };

    return (
        <>
            <AntiDeeplink />

            {showIntro && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[1000]">
                    <div className="bg-white rounded-lg p-6 w-[90vw] max-w-lg shadow-xl relative text-center">
                        <h2 className="text-2xl font-bold mb-4">🌳 Help het park schoonmaken!</h2>
                        <p className="mb-4 text-lg">
                            Er is veel afval achtergelaten in het park na een groot buurtfeest.
                            Help mee door het afval op te ruimen en het park weer schoon en veilig te maken voor iedereen!
                        </p>
                        <p className="mb-6 text-base text-gray-700 italic">
                            Gebruik de pijltjestoetsen om je avatar te bewegen en verzamel 15 stukken afval.
                        </p>
                        <button
                            onClick={() => setShowIntro(false)}
                            className="w-full bg-green-600 uppercase text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-300"
                        >
                            Begin!
                        </button>
                    </div>
                </div>
            )}

            <div className="waste-sorting min-h-screen flex flex-col items-center justify-center relative" style={{ overflow: "hidden", backgroundImage: "url('../backgrounds/map.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
                {cooldownActive && (
                    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-yellow-200 text-black font-bold py-2 px-4 rounded-lg shadow-lg z-50">
                        ⏳ Wacht {countdown} seconden voordat je weer kunt verzamelen.
                    </div>
                )}

            <PauseButton onClick={handleBack} />
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
            <button
                onClick={() => setShowOverview(true)}
                className="fixed top-20 right-6 bg-white text-black font-semibold py-2 px-4 rounded-lg shadow-md z-50"
            >
                Bekijk Gevonden Afval
            </button>
            {showOverview && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-[90vw] max-w-md shadow-xl relative text-center">
                        <h2 className="text-2xl font-bold mb-4">📦 Afval Overzicht</h2>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            {Object.entries(getGroupedItems()).map(([name, data]) => (
                                <div key={name} className="flex items-center space-x-3 text-left">
                                    <img src={data.image} alt={name} className="w-12 h-12 object-contain" />
                                    <span className="text-lg font-semibold">{name}: {data.count}</span>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={() => setShowOverview(false)}
                            className="w-full bg-red-500 uppercase text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600"
                        >
                            Sluiten
                        </button>
                    </div>
                </div>
            )}

            {/* Pop-up wanneer vuilniszak vol is */}
            {showFullMessage && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-[90vw] max-w-md shadow-xl relative text-center">
                        <h2 className="text-2xl font-bold mb-4">🗑️ Je vuilniszak zit vol!</h2>
                        <p className="mb-6 text-lg">Klik op verder om het afval te sorteren.</p>
                        <button
                            onClick={() => {
                                saveGame();
                                navigate("/afvalsorteren");
                            }}
                            className="w-full bg-green-600 uppercase text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-300"
                        >
                            Verder
                        </button>
                    </div>
                </div>
            )}

            <div className="relative w-[100vw] h-[100vh] rounded-xl overflow-hidden">
                <AvatarMovement
                    position={avatarPos}
                    onMove={handleMove}
                    avatar={avatar}
                    disabled={showIntro || showFullMessage}
                />

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

                {/* Pop-up met wist-je-datje */}
                {factMessage && (
                    <div
                        className="fixed left-1/2 transform -translate-x-1/2 bg-yellow-100 text-black text-center font-semibold rounded-xl shadow-lg z-[999] w-[90%] max-w-xl border border-yellow-400"
                        style={{
                            top: "12%",
                            fontSize: "1.5rem",
                            padding: "2rem 1rem"
                        }}
                    >
                        📘 {factMessage}
                    </div>
                )}

            </div>
        </div>
        </>
    );
}

export default WastePickup;
