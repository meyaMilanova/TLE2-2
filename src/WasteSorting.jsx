import AvatarMovement from './avatarMovement';
import BackButton from "./Components/BackButton.jsx";
import React from "react";

function WasteSorting() {
    return (
        <div className="waste-sorting bg-green-500 min-h-screen flex items-center justify-center">
            <BackButton onClick={() => { /* handle navigation here */ }} />
            <AvatarMovement />
        </div>
    );
}

export default WasteSorting;