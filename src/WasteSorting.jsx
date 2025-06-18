import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "./Components/BackButton.jsx";
import SortingModal from "./Components/SortingModal.jsx";
import AntiDeeplink from "./Components/AntiDeeplink.jsx";
import { bins, map, explanations } from "./data/waste.js";
import confetti from "canvas-confetti";

async function updateSortingData(userId, type) {
    const body = {
        paper: type === "paper" ? 1 : 0,
        organic: type === "organic" ? 1 : 0,
        plastic: type === "plastic" ? 1 : 0,
        rest: type === "rest" ? 1 : 0,
    };

    try {
        const response = await fetch(`http://145.24.223.108:8000/sortingGame/${userId}/plus`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error("Fout bij opslaan van sortering");
        }

        const data = await response.json();
        console.log("Sorting saved:", data);
    } catch (err) {
        console.error("Opslaan mislukt:", err);
    }
}

function convertCategoryToType(category) {
    return map[category] || "rest";
}

function WasteSorting() {
    const navigate = useNavigate();

    const [items, setItems] = useState([]);
    const userData = JSON.parse(localStorage.getItem("userData"));
    const userId = userData?.id;

    const [initialTotal, setInitialTotal] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [showSuccess] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem("collectedItems");
        if (stored) {
            const parsed = JSON.parse(stored);
            const itemsWithIds = parsed.map((item, index) => ({
                ...item,
                id: index + 1,
                type: convertCategoryToType(item.category),
                img: item.image,
            }));
            setItems(itemsWithIds);
            setInitialTotal(parsed.length);
        }
    }, [navigate]);

    useEffect(() => {
        if (items.length === 0 && initialTotal > 0) {
            localStorage.removeItem("gameDataWasteSorting");
            navigate("/resultaten");
        }
    }, [items, initialTotal, navigate]);

    useEffect(() => {
        function handleKeyDown(e) {
            if (!items[0]) return;

            if (e.key === "1") handleDropByKey("plastic");
            if (e.key === "2") handleDropByKey("organic");
            if (e.key === "3") handleDropByKey("paper");
            if (e.key === "4") handleDropByKey("rest");
        }

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [items]);

    async function handleDrop(e, binType) {
        const itemId = e.dataTransfer.getData("text/plain");
        const currentItem = items[0];

        if (currentItem && currentItem.id.toString() === itemId) {
            if (currentItem.type === binType) {
                // Confetti animation at drop position
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: {
                        x: e.clientX / window.innerWidth,
                        y: e.clientY / window.innerHeight,
                    },
                });

                await updateSortingData(userId, currentItem.type);
                setItems((prevItems) => prevItems.slice(1));
            } else {
                const explanation = explanations[currentItem.type] || "Onbekend type afval.";
                setModalMessage(explanation);
                setModalOpen(true);
            }
        }
    }

    async function handleDropByKey(binType) {
        const currentItem = items[0];
        if (!currentItem) return;

        if (currentItem.type === binType) {
            // Confetti animation in center
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { x: 0.5, y: 0.4 },
            });

            await updateSortingData(userId, currentItem.type);
            setItems((prevItems) => prevItems.slice(1));
        } else {
            const explanation = explanations[currentItem.type] || "Onbekend type afval.";
            setModalMessage(explanation);
            setModalOpen(true);
        }
    }

    function handleDragStart(e, id) {
        e.dataTransfer.setData("text/plain", id);
    }

    const remaining = items.length;

    return (
        <>
            <AntiDeeplink />
            <div className="waste-sorting min-h-screen bg-[url('/public/backgrounds/background-recycle.png')] bg-cover bg-center p-8">
                <div className="grid grid-cols-3 items-center mb-8 px-4">
                    <div className="justify-self-start">
                        <BackButton />
                    </div>

                    <h1
                        className="text-xl md:text-2xl font-bold text-center justify-self-center"
                        style={{
                            background: "#FDE3CF",
                            borderRadius: "1rem",
                            padding: "0.5rem 1.2rem",
                            color: "#632713",
                            boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
                        }}
                    >
                        Sleep het afval naar de juiste bak!
                    </h1>

                    <div className="justify-self-end">
                        <div
                            style={{
                                background: "#FDE3CF",
                                borderRadius: "1.25rem",
                                padding: "0.75rem 1.5rem",
                                fontWeight: "bold",
                                fontSize: "1.5rem",
                                color: remaining >= 15 ? "#632713" : "black",
                                border: initialTotal >= 15 ? "2px solid red" : "none",
                            }}
                        >
                            🗑️ {remaining}/{initialTotal}
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-4 mb-8 justify-center mt-20">
                    {items[0] && (
                        <img
                            key={items[0].id}
                            src={items[0].img}
                            alt={items[0].name}
                            draggable
                            onDragStart={(e) => handleDragStart(e, items[0].id)}
                            className="w-20 h-20 cursor-move"
                            title={items[0].name}
                        />
                    )}
                </div>

                <div className="flex flex-row justify-center md:grid-cols-4 gap-y-3.5 mt-32 justify-items-center">
                    {bins.map((bin, index) => (
                        <div
                            key={bin.id}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => handleDrop(e, bin.id)}
                            className="text-center p-0 m-0"
                        >
                            <img
                                src={bin.img}
                                alt={bin.label}
                                style={{ width: "150px", height: "150px", display: "block" }}
                                className="mx-auto"
                            />
                            <div className="mt-2">
                                <span
                                    className="inline-block bg-gray-200 border border-gray-400 rounded px-3 py-1 text-base font-semibold shadow-sm"
                                    style={{ minWidth: "2.5rem" }}
                                >
                                    {index + 1}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                <SortingModal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    title="Verkeerde bak!"
                    message={modalMessage}
                />

                {showSuccess && <div className="...">🎉 Goed zo! 🎉</div>}
            </div>
        </>
    );
}

export default WasteSorting;
