import React from 'react';
import PinkButton from "./Components/PinkButton.jsx";

const TitleScreen = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
        <h1 className="text-9xl font-klear text-white mb-2">GROENLANDIA</h1>


        <div className="flex justify-around mt-6 flex-col md:flex-col max-w-2xl gap-5">
            <PinkButton type="button">
                Inloggen
            </PinkButton>
            <PinkButton type="button">
                Aanmelden
            </PinkButton>
        </div>
    </div>
);

export default TitleScreen;