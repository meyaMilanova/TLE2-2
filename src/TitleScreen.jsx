import React from 'react';
import PinkButton from "./Components/PinkButton.jsx";
import {useNavigate} from "react-router-dom";

const TitleScreen = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-green-900">

            <h1 className="text-9xl font-klear text-white mb-2">GROENLANDIA</h1>

            <div className="flex justify-around mt-6 flex-col md:flex-col max-w-2xl gap-5">
                <PinkButton type="button" onClick={() => navigate('/inloggen')}>
                    INLOGGEN
                </PinkButton>
                <PinkButton type="button" onClick={() => navigate('/aanmelden')}>
                    AANMELDEN
                </PinkButton>
            </div>
        </div>
    );
}




export default TitleScreen;