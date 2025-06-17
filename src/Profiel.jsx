import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PinkButton from './components/PinkButton';
import BackButton from "./Components/BackButton.jsx";

function Profiel() {
    const navigate = useNavigate();
    const [voornaam, setVoornaam] = useState('Gebruiker');
    const [achternaam, setAchternaam] = useState('Gebruiker Achternaam');
    const [image_url, setAvatar] = useState('/placeholder-profile.png'); // Default avatar

    useEffect(() => {
        const userData = localStorage.getItem('userData');
        if (!userData) {
            navigate("/inloggen");
            return;
        }

        const parsedData = JSON.parse(userData);
        setVoornaam(parsedData?.voornaam || 'Gebruiker');
        setAchternaam(parsedData?.achternaam || 'Gebruiker Achternaam');
        setAvatar(parsedData?.image_url || '/placeholder-profile.png');
    }, [navigate]);

    return (
        <div className="min-h-screen bg-green-900 flex flex-col items-center justify-center relative overflow-hidden">
            <BackButton onClick={() => navigate('/hoofdpagina')}/>

            <h1 className="text-white text-8xl font-bold mb-10 font-itim">Profiel</h1>

            <div className="flex flex-col md:flex-row items-center gap-10">
                <div className="flex flex-col gap-6 items-center">
                    <p className="bg-orange-100 text-[1.7vw] w-[25vw] text-center text-orange-800 rounded-full py-5 border-4 border-green-500 text-xl">
                        {voornaam}
                    </p>

                    <p className="bg-orange-100 text-[1.7vw] w-[25vw] text-center text-orange-800 rounded-full py-5 border-4 border-green-500 text-xl">
                        {achternaam}
                    </p>

                    <p className="bg-orange-100 text-[1.7vw] w-[25vw] text-center text-orange-800 rounded-full py-5 border-4 border-green-500 text-xl">
                        *********
                    </p>
                </div>

                {/* Display the user's selected avatar */}
                <img
                    src={image_url}
                    alt="Profielfoto"
                    className="w-[20vw] h-[20vw] border-4 border-orange-100 object-cover"
                />
            </div>
            <div className='mt-[4vw]'>
                <button className={`bg-rozeButton text-white font-bold py-4 px-12 text-2xl rounded-full shadow-lg hover:bg-hoverButton font-itim `}>
                    BEWERKEN
                </button>
                <button className={`bg-startButton text-white font-bold py-4 px-12 text-2xl rounded-full shadow-lg hover:bg-hoverButton font-itim `}>
                    UITLOGGEN
                </button>
            </div>
        </div>
    );
}

export default Profiel;
