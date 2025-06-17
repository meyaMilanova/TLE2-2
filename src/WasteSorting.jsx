import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import BackButton from "./Components/BackButton.jsx";
import SortingModal from "./Components/SortingModal.jsx";
import AntiDeeplink from "./Components/AntiDeeplink.jsx";
import { bins, map, explanations } from "./data/waste.js";

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
            localStorage.removeItem("gameDataWasteSorting");
            navigate("/resultaten");
        }
    }, [items, initialTotal, navigate]);

    async function handleDrop(e, binType) {
        const itemId = e.dataTransfer.getData("text/plain");
        const currentItem = items[0];

        if (currentItem && currentItem.id.toString() === itemId) {
            if (currentItem.type === binType) {
                // setScore((prev) => prev + 1);
                // setItems((prevItems) => prevItems.slice(1));
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
            <div className="waste-sorting min-h-screen bg-green-100 p-8">
                <BackButton />

                <h1 className="text-2xl md:text-3xl font-bold text-center mt-4 mb-8 text-green-800">
                    Sleep het afval naar de juiste bak!
                </h1>


                {/* Teller rechtsboven */}
                <div
                    style={{
                        position: "fixed",
                        top: 20,
                        right: 30,
                        background: "#FDE3CF",
                        borderRadius: "1rem",
                        padding: "0.5rem 1.2rem",
                        fontWeight: "bold",
                        fontSize: "1.5rem",
                        zIndex: 1000,
                        color: remaining >= 15 ? "#632713" : "black",
                        border: initialTotal >= 15 ? "2px solid red" : "none",
                    }}
                >
                    🗑️ {remaining}/{initialTotal}
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
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-16">
                    {bins.map((bin) => (
                        <div
                            key={bin.id}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => handleDrop(e, bin.id)}
                            className="p-2 text-center"
                        >
                            <img src={bin.img} alt={bin.label} className="w-21 h-21 mx-auto" />
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
            </div>
        </>
    );
}

export default WasteSorting;

