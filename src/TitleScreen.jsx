import React from 'react';

const TitleScreen = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
        <h1 className="text-8xl font-klear text-white mb-2">GROENLANDIA</h1>


        <div className="mt-8 flex flex-col items-center">
            <button className="mt-4 px-6 py-2 bg-rozeButton text-white font-semibold rounded hover:bg-hoverButton">
                Inloggen
            </button>
            <button className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600">
                Aanmelden
            </button>
        </div>
    </div>
);

export default TitleScreen;