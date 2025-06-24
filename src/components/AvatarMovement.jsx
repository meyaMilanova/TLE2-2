import React, { useState, useEffect, useRef } from "react";
import petSprites from '../data/petSpritesMap.js';

function AvatarMovement({ position, onMove, avatar, disabled }) {
    const [pos, setPos] = useState(position || { top: 50, left: 50 });
    const [frame, setFrame] = useState(0);
    const [currentKey, setCurrentKey] = useState(null);
    const pressedKeysRef = useRef(new Set());
    const requestRef = useRef();
    const petId = JSON.parse(localStorage.getItem("userData"))?.pet_id;
    const petSprite = petSprites[petId];
    const petFrameSize = 16;
    const petFrameHeight = 64;

    const spriteFrames = {
        stand: 0,
        down: [1, 2],
        right: [3, 4],
        left: [5, 6],
        up: [7, 8],
    };

    const [avatarImage, setAvatarImage] = useState("blond-hair-girl-avatar-p.png");

    useEffect(() => {
        const raw = localStorage.getItem('selectedAvatar');
        if (raw) {
            try {
                const parsed = JSON.parse(raw)
                const updated = parsed.replace("-p.png", ".png")
                setAvatarImage(updated)
            } catch {
                const updated = raw.replace("-p.png", ".png")
                setAvatarImage(updated);
            }
        }
    }, []);


    useEffect(() => {
        if (
            position &&
            (position.top !== pos.top || position.left !== pos.left)
        ) {
            setPos(position);
        }
    }, [position]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (disabled) return;
            const key = event.key;
            if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "a", "s", "d"].includes(key)) {
                pressedKeysRef.current.add(key);
                setCurrentKey((prev) => (prev !== key ? key : prev));
            }
        };

        const handleKeyUp = (event) => {
            if (disabled) return;
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

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [currentKey, disabled]);

    useEffect(() => {
        if (disabled || !currentKey) {
            cancelAnimationFrame(requestRef.current);
            return;
        }

        const move = () => {
            setPos((prevPosition) => {
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

                onMove?.({ left, top });
                return { top, left };
            });

            requestRef.current = requestAnimationFrame(move);
        };

        requestRef.current = requestAnimationFrame(move);
        return () => cancelAnimationFrame(requestRef.current);
    }, [currentKey, onMove, disabled]);

    useEffect(() => {
        if (disabled) {
            pressedKeysRef.current.clear();
            setCurrentKey(null);
            setFrame(spriteFrames.stand);
            cancelAnimationFrame(requestRef.current);
        }
    }, [disabled]);

    useEffect(() => {
        if (disabled) return;

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

            setFrame(frames[0]);
            animationInterval = setInterval(() => {
                setFrame((prevFrame) => (prevFrame === frames[0] ? frames[1] : frames[0]));
            }, 200);
        }

        return () => clearInterval(animationInterval);
    }, [currentKey, disabled]);

    return (
        <div className="relative w-screen h-screen overflow-hidden flex justify-center items-center">
            {/* Main Avatar */}
            <div
                className="absolute w-[100px] h-[100px] bg-no-repeat bg-cover"
                style={{
                    top: `${pos.top}%`,
                    left: `${pos.left}%`,
                    backgroundImage: `url('${avatarImage}')`,
                    backgroundPosition: `-${frame * 100}px 0`,
                    zIndex: 10,
                    imageRendering: "pixelated"
                }}
            ></div>
            {/* Small Pet Avatar */}
            {petSprite && (
                <div
                    className="absolute bg-no-repeat bg-cover"
                    style={{
                        width: `${petFrameSize}px`,
                        height: `${petFrameHeight}px`,
                        top: `${pos.top}%`,
                        left: `${pos.left - 4}%`,
                        backgroundImage: `url('${petSprite}')`,
                        backgroundPosition: `-${frame * petFrameSize}px 0`,
                        backgroundSize: 'auto',
                        zIndex: 9,
                        imageRendering: 'pixelated',
                        transform: 'scale(4)',
                        transformOrigin: 'top left',
                    }}
                />
            )}
        </div>
    );
}

export default AvatarMovement;
