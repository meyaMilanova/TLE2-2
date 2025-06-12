import React, { useState, useEffect } from "react";
import BackButton from "./Components/BackButton.jsx";
import SortingModal from "./Components/SortingModal.jsx";

const bins = [
    { id: "plastic", label: "Plastic", img: "/images/wastesorting/red.png" },
    { id: "organic", label: "GFT", img: "/images/wastesorting/green.png" },
    { id: "paper", label: "Papier", img: "/images/wastesorting/blue.png" },
    { id: "rest", label: "Rest", img: "/images/wastesorting/black.png" },
];

function convertCategoryToType(category) {
    const map = {
        gft: "organic",
        plastic: "plastic",
        papier: "paper",
        restafval: "rest",
    };
    return map[category] || "rest";
}

function Sorting() {
    const [items, setItems] = useState([]);
    const [initialTotal, setInitialTotal] = useState(0);
    const [score, setScore] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

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
            setInitialTotal(parsed.length); // zet totaal op basis van localStorage
        }
    }, []);

    const explanations = {
        plastic: "Dit is plastic. Plastic verpakkingen horen in de plasticbak zodat ze gerecycled kunnen worden.",
        organic: "Dit is organisch afval. Etensresten horen in de GFT-bak voor compostering.",
        paper: "Dit is papier. Schoon en droog papier hoort in de papierbak om hergebruikt te worden.",
        rest: "Dit is restafval. Dit soort afval kan niet gerecycled worden en hoort in de restbak.",
    };

    function handleDrop(e, binType) {
        const itemId = e.dataTransfer.getData("text/plain");
        const currentItem = items[0];

        if (currentItem && currentItem.id.toString() === itemId) {
            if (currentItem.type === binType) {
                setScore((prev) => prev + 1);
                setItems((prevItems) => prevItems.slice(1)); // volgende item
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
        <div className="waste-sorting min-h-screen bg-green-100 p-8">
            <BackButton />
            <h1 className="text-3xl font-bold mb-4">Afval Sorteren</h1>

            {/* Teller + Score */}
            <div className="flex justify-between items-center mb-6">
                <p className="text-xl font-semibold">
                    🗑️ {remaining - 1}/{initialTotal}
                </p>
                <p className="text-xl font-semibold">
                    ✅ Score: {score}
                </p>
            </div>

            {/* Alleen huidige item tonen */}
            <div className="flex flex-wrap gap-4 mb-8 justify-center">
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {bins.map((bin) => (
                    <div
                        key={bin.id}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleDrop(e, bin.id)}
                        className="p-4 bg-white rounded shadow-md text-center border-2 border-dashed border-gray-400"
                    >
                        <img src={bin.img} alt={bin.label} className="w-24 h-24 mx-auto" />
                        <p className="mt-2 font-semibold">{bin.label}</p>
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
    );
}

export default Sorting;
