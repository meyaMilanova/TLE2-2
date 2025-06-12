import AvatarMovement from './avatarMovement';
import React from "react";
import PauseButton from "./Components/PauseButton.jsx";

function WasteSorting() {

    const handleBack = () => {
        // localStorage opslaan wat er in de game is gebeurt;
    };

    return (
        <div className="waste-sorting bg-green-500 min-h-screen flex items-center justify-center">
            <PauseButton onClick={handleBack} />
            <AvatarMovement />
        </div>
    );
}

export default WasteSorting;