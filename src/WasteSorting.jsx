import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import BackButton from "./Components/BackButton.jsx";
import SortingModal from "./Components/SortingModal.jsx";
import AntiDeeplink from "./Components/AntiDeeplink.jsx";
import { bins, map, explanations } from "./data/waste.js";
import confetti from "canvas-confetti";


async function updateSortingData(userId, type) {
    const body = {
        paper: type === "paper" ? 1 : 0,
        food: type === "food" ? 1 : 0,
        plastic: type === "plastic" ? 1 : 0,
        rest: type === "rest" ? 1 : 0,
    };
//http://145.24.223.108:8000/sortingGame/${userId}/+
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
    console.log(userId)

    const [initialTotal, setInitialTotal] = useState(0);
    // const [score, setScore] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [showSuccess] = useState(false);

    // Check authenticatie bij laden component
    // Effect 1: Initialiseren bij laden
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

// Effect 2: Navigeren als alles leeg is
    useEffect(() => {
        if (items.length === 0 && initialTotal > 0) {
            navigate("/resultaten");
        }
    }, [items, initialTotal, navigate]);

    async function handleDrop(e, binType) {
        const itemId = e.dataTransfer.getData("text/plain");
        const currentItem = items[0];

        if (currentItem && currentItem.id.toString() === itemId) {
            if (currentItem.type === binType) {
                const dropX = e.clientX;
                const dropY = e.clientY;

                // Start confetti vanuit muispositie / droppositie
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: {
                        x: dropX / window.innerWidth,
                        y: dropY / window.innerHeight,
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

    function handleDragStart(e, id) {
        e.dataTransfer.setData("text/plain", id);
    }

    const remaining = items.length;

    return (
        <>
            <AntiDeeplink/>

                <div className="waste-sorting min-h-screen bg-[url('/public/backgrounds/background-recycle.png')] bg-cover bg-center p-8">

                    {/* Topbar met BackButton, Titel en Teller */}
                    <div className="grid grid-cols-3 items-center mb-8 px-4">
                        {/* BackButton links */}
                        <div className="justify-self-start">
                            <BackButton />
                        </div>

                        {/* Titel gecentreerd */}
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

                        {/* Teller rechts */}
                        <div className="justify-self-end">
                            <div
                                style={{
                                    background: "#FDE3CF",
                                    borderRadius: "1.25rem", // iets ronder
                                    padding: "0.75rem 1.5rem", // iets meer ruimte
                                    fontWeight: "bold",
                                    fontSize: "1.5rem", // groter lettertype
                                    color: remaining >= 15 ? "#632713" : "black",
                                    border: initialTotal >= 15 ? "2px solid red" : "none",
                                }}
                            >
                                🗑️ {remaining}/{initialTotal}
                        </div>

                    </div>
                    </div>


                    {/*/!* Score bovenin gecentreerd *!/*/}
                {/*<div*/}
                {/*    style={{*/}
                {/*        position: "fixed",*/}
                {/*        top: 20,*/}
                {/*        left: "50%",*/}
                {/*        transform: "translateX(-50%)",*/}
                {/*        background: "#FDE3CF",*/}
                {/*        borderRadius: "1rem",*/}
                {/*        padding: "0.5rem 1.2rem",*/}
                {/*        fontWeight: "bold",*/}
                {/*        fontSize: "1.5rem",*/}
                {/*        zIndex: 1000,*/}
                {/*        color: "#632713",*/}
                {/*        border: "2px solid red",*/}
                {/*    }}*/}
                {/*>*/}
                {/*    Score: {score}*/}
                {/*</div>*/}

                {/* Alleen huidige item tonen */}
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

                {/* Vuilnisbakken */}
                <div className="flex flex-row justify-center md:grid-cols-4 gap-y-3.5 mt-32 justify-items-center">

                {bins.map((bin) => (
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


                            {/*<p className="mt-1 text-sm font-medium">{bin.label}</p>*/}
                        </div>
                    ))}
                </div>

                {/* Feedback bij fout */}
                <SortingModal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    title="Verkeerde bak!"
                    message={modalMessage}
                />

                {showSuccess && (
                    <div className="...">🎉 Goed zo! 🎉</div>
                )}

            </div>
        </>
    );
}

export default WasteSorting;

