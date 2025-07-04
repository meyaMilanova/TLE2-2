import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "./components/BackButton.jsx";
import SortingModal from "./components/SortingModal.jsx";
import AntiDeeplink from "./components/AntiDeeplink.jsx";
import PauseButton from "./components/PauseButton.jsx";
import { bins, map, explanations, wasteItems } from "./data/waste.js";
import questions from "./data/questions.js";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";

async function updateSortingData(userId, type) {
    const body = {
        paper: type === "paper" ? 1 : 0,
        food: type === "organic" ? 1 : 0,
        plastic: type === "plastic" ? 1 : 0,
        rest: type === "rest" ? 1 : 0,
    };

    console.log(`📤 Verstuur PATCH voor ${type}:`, body);

    try {
        const response = await fetch(`http://145.24.223.108:8000/sortingGame/${userId}/plus`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                'apikey' : 'superspookysecretadminapikeythatsuuuurelywontbeguessed',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error("Fout bij opslaan van sortering");
        }

        const data = await response.json();

        // 👇 Dit toont wat je terugkrijgt van de backend
        console.log("✅ Response van backend:", data);
    } catch (err) {
        console.error("❌ Opslaan mislukt:", err);
    }
}


function convertCategoryToType(category) {
    return map[category] || "rest";
}

function WasteSorting() {
    const navigate = useNavigate();
    const dropdownRef = useRef();

    const [items, setItems] = useState([]);
    const userData = JSON.parse(localStorage.getItem("userData"));
    const userId = userData?.id;

    const [initialTotal, setInitialTotal] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [showSuccess] = useState(false);
    const [showIntro, setShowIntro] = useState(true);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [feedbackHandled, setFeedbackHandled] = useState(false);


    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsPopupOpen(false);
            }
        }

        if (isPopupOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isPopupOpen]);

    useEffect(() => {
        const navigationEntries = window.performance.getEntriesByType("navigation");
        console.log("navigationEntries:", navigationEntries);

        // Pas reload check aan: niet direct verwijderen, maar loggen
        if (navigationEntries.length > 0 && navigationEntries[0].type === "reload") {
            console.log("Pagina gerefreshed, collectedItems blijven behouden");
            // localStorage.removeItem("collectedItems"); // UITGESCHAKELD
            // Niet navigeren want dat veroorzaakte direct redirect
            // Je kunt hier eventueel iets anders doen, zoals resetten of tonen van melding
        }

        const stored = localStorage.getItem("collectedItems");
        console.log("WasteSorting collectedItems raw:", stored);

        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                console.log("WasteSorting parsed collectedItems:", parsed);

                if (Array.isArray(parsed) && parsed.length === 15) {
                    const itemsWithIds = parsed.map((item, index) => ({
                        ...item,
                        id: index + 1,
                        type: convertCategoryToType(item.category),
                        img: item.image,
                    }));
                    setItems(itemsWithIds);
                    setInitialTotal(parsed.length);
                } else {
                    console.log("WasteSorting: collectedItems lengte is niet 15, redirect");
                    navigate("/hoofdpagina");
                }
            } catch (e) {
                console.log("WasteSorting parse error:", e);
                navigate("/hoofdpagina");
            }
        } else {
            console.log("WasteSorting: geen collectedItems gevonden, redirect");
            navigate("/hoofdpagina");
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
            if (showIntro || modalOpen) return;
            if (!items[0]) return;

            if (e.key === "1") handleDropByKey("plastic");
            if (e.key === "2") handleDropByKey("organic");
            if (e.key === "3") handleDropByKey("paper");
            if (e.key === "4") handleDropByKey("rest");
        }

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [items, modalOpen, showIntro]);

    async function handleDrop(e, binType) {
        const itemId = e.dataTransfer.getData("text/plain");
        const currentItem = items[0];

        if (currentItem && currentItem.id.toString() === itemId) {
            if (currentItem.type === binType) {
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
                setFeedbackHandled(true);
            }
        }
    }

    async function handleDropByKey(binType) {
        const currentItem = items[0];
        if (!currentItem) return;

        if (currentItem.type === binType) {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { x: 0.5, y: 0.4 },
            });

            await updateSortingData(userId, currentItem.type);
            setItems((prevItems) => prevItems.slice(1));

            // Reset feedbackHandled, want we gaan door naar volgende item
            setFeedbackHandled(false);

        } else {
            if (!feedbackHandled) {  // alleen feedback tonen als nog niet afgehandeld
                const explanation = explanations[currentItem.type] || "Onbekend type afval.";
                setModalMessage(explanation);
                setModalOpen(true);
            }
        }
    }


    function handleDragStart(e, id) {
        e.dataTransfer.setData("text/plain", id);
    }

    function saveGame() {
        const gameData = {
            items,
            initialTotal,
        };
        localStorage.setItem("gameDataWasteSorting", JSON.stringify(gameData));
    }

    function handlePause() {
        saveGame();
        navigate("/pauze", { state: { gameKey: "gameDataWasteSorting" } });
    }

    const remaining = items.length;

    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [feedbackMessage, setFeedbackMessage] = useState(""); // State for feedback

    function getRandomQuestion() {
        return questions[Math.floor(Math.random() * questions.length)];
    }

    useEffect(() => {
        if (remaining === 10 || remaining === 5) {
            const randomQuestion = getRandomQuestion();
            setCurrentQuestion(randomQuestion);
            setModalMessage(
                `Je hebt nog maar ${remaining} items over!\n\nVraag: ${randomQuestion.question}`
            );
            setModalOpen(true);
        }
    }, [remaining]);

    async function handleOptionClick(selectedOption) {
        if (!currentQuestion) return;

        if (selectedOption === currentQuestion.answer) {
            const types = ["paper", "organic", "plastic", "rest"];
            const randomType = types[Math.floor(Math.random() * types.length)];

            await updateSortingData(userId, randomType);
            await updateSortingData(userId, randomType);

            setFeedbackMessage(
                `✅ Goed zo! ${currentQuestion.explanation}\nJe hebt +2 gekregen voor "${randomType}" afval!`
            );
        } else {
            setFeedbackMessage(
                `❌ Fout. Het juiste antwoord is "${currentQuestion.answer}". ${currentQuestion.explanation}`
            );
        }

        setFeedbackHandled(false);  // Reset zodat feedback straks weer kan tonen

        // Laat feedback zien tot gebruiker op "Doorgaan" klikt
        // Verwijder setTimeout, want dat veroorzaakt de feedback steeds opnieuw
    }



    return (
        <>
            <AntiDeeplink requireCollectedItems={true} />
            <div
                className="waste-sorting min-h-screen bg-[url('/public/backgrounds/background-recycle.png')] bg-cover bg-center p-8"
            >
                <PauseButton onClick={handlePause} />

                <div className="grid grid-cols-3 items-center mb-8 px-4">
                    <div className="justify-self-start"></div>

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
                </div>

                <div className="absolute top-6 right-6 z-50 flex flex-col items-end gap-2">
                    {/* Teller */}
                    <div
                        style={{
                            background: "#FDE3CF",
                            borderRadius: "1.25rem",
                            padding: "0.75rem 1.5rem",
                            fontWeight: "bold",
                            fontSize: "1.5rem",
                            color: remaining >= 15 ? "#632713" : "black",
                            border: initialTotal >= 15 ? "2px solid red" : "none",
                            minWidth: "6rem",
                            textAlign: "center",
                        }}
                    >
                        🗑️ {remaining}/{initialTotal}
                    </div>

                    {/* Dropdown altijd zichtbaar */}
                    <motion.div
                        ref={dropdownRef}
                        initial={{ opacity: 1, y: 0 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 w-64 bg-white rounded shadow-lg p-3 z-50"
                        style={{
                            background: "#FDE3CF",
                            borderRadius: "1rem",
                            padding: "0.5rem 1rem",
                            color: "#632713",
                            boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
                        }}
                    >
                        {wasteItems && wasteItems.length > 0 ? (
                            <div className="space-y-1 text-base">
                                <h3 className="text-lg font-bold text-gray-800 mb-1">Inhoud Vuilniszak</h3>

                                <div className="grid grid-cols-3 gap-2">
                                    {wasteItems.map((item) => (
                                        <div
                                            key={item.name}
                                            className="flex flex-col items-center gap-1 bg-white p-2 rounded shadow-sm"
                                        >
                                            <img src={item.image} alt={item.name} className="h-12 w-12 object-contain" />
                                            <span className="text-gray-800 font-medium text-sm text-center">{item.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <p className="text-xs text-gray-600 italic">
                                Bezig met laden of geen data gevonden...
                            </p>
                        )}
                    </motion.div>
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
                            style={{imageRendering: "pixelated"}}
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
                                style={{ width: "150px", height: "150px", display: "block", imageRendering: "pixelated" }}
                                className="mx-auto"

                            />
                            <div className="mt-2">
                <span
                    className="inline-block bg-gray-200 border border-gray-400 rounded px-3 py-1 text-base font-semibold shadow-sm"
                    style={{ minWidth: "2.5rem" }}
                >
                  {index + 1}
                </span>
                                <div className="text-lg font-bold text-gray-800 mt-1">
                                    {["Plastic", "GFT", "Papier", "Restafval"][index]}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {showIntro && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 w-[90vw] max-w-lg shadow-xl relative text-center">
                            <h2 className="text-2xl font-bold mb-4">♻️ Afval scheiden in Rotterdam</h2>
                            <p className="mb-4 text-base leading-relaxed">
                                In de gemeente Rotterdam is het scheiden van afval enorm belangrijk.
                                Door afval goed te sorteren, kunnen meer materialen worden hergebruikt.
                                Dat is beter voor het milieu én voor de stad. Zo blijft Rotterdam schoner,
                                en kunnen we samen zwerfafval en vervuiling tegengaan.
                            </p>
                            <p className="mb-6 text-base">
                                Help jij mee om het afval op de juiste manier te scheiden?
                            </p>
                            <button
                                onClick={() => setShowIntro(false)}
                                className="w-full bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-300"
                            >
                                Aan de slag!
                            </button>
                        </div>
                    </div>
                )}

                {modalOpen && !currentQuestion && (
                    <SortingModal
                        isOpen={modalOpen}
                        onClose={() => {
                            setModalOpen(false);
                            setFeedbackHandled(false); // reset na sluiten van foutmodal
                        }}
                        title="Verkeerde bak!"
                        message={modalMessage}
                    />

                )}

                {showSuccess && <div className="...">🎉 Goed zo! 🎉</div>}

                {modalOpen && currentQuestion && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 w-[90vw] max-w-md shadow-xl text-center relative">
                            {feedbackMessage ? (
                                <>
                                    <p className="mb-4 text-[1.5vw] text-base whitespace-pre-line">{feedbackMessage}</p>
                                    <button
                                        onClick={() => {
                                            setModalOpen(false);
                                            setCurrentQuestion(null);
                                            setFeedbackMessage("");
                                            setFeedbackHandled(false);  // Gebruiker heeft feedback afgevinkt
                                        }}
                                        className="mt-6 w-full bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-300"
                                    >
                                        Doorgaan
                                    </button>

                                </>
                            ) : (
                                <>
                                    <h2 className="text-xl font-bold mb-4">📝 Vraag</h2>
                                    <p className="mb-4 text-base">{currentQuestion.question}</p>
                                    <div className="flex flex-col gap-4">
                                        {currentQuestion.options.map((option, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleOptionClick(option)}
                                                className="bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-300"
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default WasteSorting;
