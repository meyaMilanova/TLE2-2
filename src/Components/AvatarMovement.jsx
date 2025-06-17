import React, { useState, useEffect, useRef } from "react";

function AvatarMovement({ onMove }) {
    const [position, setPosition] = useState({ top: 50, left: 50 }); // Main avatar position
    const [frame, setFrame] = useState(0);
    const [currentKey, setCurrentKey] = useState(null);
    const pressedKeysRef = useRef(new Set());
    const requestRef = useRef();

    const spriteFrames = {
        stand: 0,
        down: [1, 2],
        right: [3, 4],
        left: [5, 6],
        up: [7, 8],
    };

    const handleKeyDown = (event) => {
        const key = event.key;
        if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "a", "s", "d"].includes(key)) {
            pressedKeysRef.current.add(key);
            setCurrentKey(key);
        }
    };

    const handleKeyUp = (event) => {
        const key = event.key;
        pressedKeysRef.current.delete(key);

        if (key === currentKey) {
            const remainingKeys = Array.from(pressedKeysRef.current);
            if (remainingKeys.length > 0) {
                setCurrentKey(remainingKeys[remainingKeys.length - 1]);
            } else {
                setCurrentKey(null);
                setFrame(spriteFrames.stand);
            }
        }
    };

    useEffect(() => {
        const move = () => {
            if (currentKey) {
                setPosition((prevPosition) => {
                    let { top, left } = prevPosition;
                    const step = 0.5;

                    switch (currentKey) {
                        case "ArrowUp":
                        case "w":
                            top = Math.max(0, top - step);
                            break;
                        case "ArrowDown":
                        case "s":
                            top = Math.min(90, top + step);
                            break;
                        case "ArrowLeft":
                        case "a":
                            left = Math.max(0, left - step);
                            break;
                        case "ArrowRight":
                        case "d":
                            left = Math.min(90, left + step);
                            break;
                        default:
                            break;
                    }
                    if (onMove) onMove({ left, top });
                    return { top, left };
                });
            }
            requestRef.current = requestAnimationFrame(move);
        };

        requestRef.current = requestAnimationFrame(move);
        return () => cancelAnimationFrame(requestRef.current);
    }, [currentKey, onMove]);

    useEffect(() => {
        let animationInterval;

        if (currentKey) {
            const frames = (() => {
                switch (currentKey) {
                    case "ArrowDown":
                    case "s":
                        return spriteFrames.down;
                    case "ArrowRight":
                    case "d":
                        return spriteFrames.right;
                    case "ArrowLeft":
                    case "a":
                        return spriteFrames.left;
                    case "ArrowUp":
                    case "w":
                        return spriteFrames.up;
                    default:
                        return [spriteFrames.stand];
                }
            })();

            setFrame((prevFrame) => (prevFrame === frames[0] ? frames[1] : frames[0]));
            animationInterval = setInterval(() => {
                setFrame((prevFrame) => (prevFrame === frames[0] ? frames[1] : frames[0]));
            }, 200);
        }

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            clearInterval(animationInterval);
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [currentKey]);

    return (
        <div className="relative w-screen h-screen overflow-hidden flex justify-center items-center">
            {/* Main Avatar */}
            <div
                className="absolute w-[100px] h-[100px] bg-no-repeat bg-cover"
                style={{
                    top: `${position.top}%`,
                    left: `${position.left}%`,
                    backgroundImage: "url('src/assets/images/avatars/pink-hair-avatar.png')",
                    backgroundPosition: `-${frame * 100}px 0`,
                    zIndex: 10,
                }}
            ></div>

            {/* Smaller Avatar */}
            <div
                className="absolute w-[50px] h-[50px] bg-no-repeat bg-cover opacity-80"
                style={{
                    top: `${position.top + 6}%`,
                    left: `${position.left - 3}%`,
                    backgroundImage: "url('src/assets/images/avatars/red-hat-avatar.png')",
                    backgroundPosition: `-${frame * 50}px 0`,
                    zIndex: 9,
                }}
            ></div>
        </div>
    );
}

export default AvatarMovement;
