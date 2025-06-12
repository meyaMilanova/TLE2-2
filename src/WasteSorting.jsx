import wasteItems from "./data/waste.js";
import AvatarMovement from './avatarMovement';
import BackButton from "./Components/BackButton.jsx";
import React, { useState, useEffect } from "react";

function WasteSorting() {
    const [randomItems, setRandomItems] = useState([]);

    useEffect(() => {
        const getRandomWasteItems = () => {
            const items = [];
            const rows = 3;
            const cols = 5;
            const cellWidth = 100 / cols;
            const cellHeight = 100 / rows; // Use 100% for the area, since the container is 80vh tall
            const usedIndexes = new Set();

            for (let i = 0; i < rows * cols; i++) {
                let randomIndex;
                do {
                    randomIndex = Math.floor(Math.random() * wasteItems.length);
                } while (usedIndexes.has(randomIndex) && usedIndexes.size < wasteItems.length);
                usedIndexes.add(randomIndex);

                const row = Math.floor(i / cols);
                const col = i % cols;
                // Add small random offset within each cell
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

    return (
        <div className="waste-sorting bg-green-500 min-h-screen flex flex-col items-center justify-center relative"
             style={{overflow: "hidden"}}>
            <BackButton onClick={() => { /* handle navigation here */
            }}/>
            <div className="relative w[100vh] h-[100vh] rounded-xl overflow-hidden">
                <AvatarMovement/>
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
                        <img src={item.image} alt={item.name} className="w-20 h-20 object-contain"/>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WasteSorting;