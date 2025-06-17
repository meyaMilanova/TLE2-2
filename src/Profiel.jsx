import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from './Components/BackButton.jsx';
import AntiDeeplink from './Components/AntiDeeplink.jsx';

function Profiel() {
    const navigate = useNavigate();
    const [voornaam, setVoornaam] = useState('Gebruiker');
    const [achternaam, setAchternaam] = useState('Gebruiker Achternaam');

    useEffect(() => {
        const userData = localStorage.getItem('userData');
        if (userData) {
            const parsedData = JSON.parse(userData);
            setVoornaam(parsedData?.voornaam || 'Gebruiker');
            setAchternaam(parsedData?.achternaam || 'Gebruiker Achternaam');
        }
    }, [navigate]);

    return (
        <>
            <AntiDeeplink />
            <div className="min-h-screen bg-green-900 flex flex-col items-center justify-center relative overflow-hidden">
                <BackButton onClick={() => navigate('/hoofdpagina')} />

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

                    {/* Profielfoto placeholder */}
                    <img
                        src="/placeholder-profile.png"
                        alt="Profielfoto"
                        className="w-[12vw] h-[12vw] rounded-full border-4 border-orange-100 object-cover"
                    />
                </div>
            </div>
        </>
    );
}

export default Profiel;