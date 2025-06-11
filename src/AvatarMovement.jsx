import React, { useState, useEffect } from "react";

function AvatarMovement() {
    const [position, setPosition] = useState({ top: "50%", left: "50%" });
    const [frame, setFrame] = useState(0);
    const [currentKey, setCurrentKey] = useState(null);

    const spriteFrames = {
        stand: 0,
        down: [1, 2],
        right: [3, 4],
        left: [5, 6],
        up: [7, 8],
    };

    const handleKeyDown = (event) => {
        setCurrentKey(event.key);
        setPosition((prevPosition) => {
            let { top, left } = prevPosition;
            const step = 1;

            switch (event.key) {
                case "ArrowUp":
                case "w":
                    top = `${Math.max(0, parseInt(top) - step)}%`;
                    break;
                case "ArrowDown":
                case "s":
                    top = `${Math.min(90, parseInt(top) + step)}%`;
                    break;
                case "ArrowLeft":
                case "a":
                    left = `${Math.max(0, parseInt(left) - step)}%`;
                    break;
                case "ArrowRight":
                case "d":
                    left = `${Math.min(90, parseInt(left) + step)}%`;
                    break;
                default:
                    break;
            }
            return { top, left };
        });
    };

    const handleKeyUp = () => {
        setCurrentKey(null);
        setFrame(spriteFrames.stand);
    };

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

            animationInterval = setInterval(() => {
                setFrame((prevFrame) => (prevFrame === frames[0] ? frames[5] : frames[0]));
            }, 50);
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
            <div
                className="absolute w-[100px] h-[100px] bg-no-repeat bg-cover"
                style={{
                    top: position.top,
                    left: position.left,
                    backgroundImage: "url('src/assets/images/avatars/pink-hair-avatar.png')",
                    backgroundPosition: `-${frame * 100}px 0`,
                }}
            ></div>
        </div>
    );
}

export default AvatarMovement;