import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PinkButton from './components/PinkButton';
import BackButton from "./Components/BackButton.jsx";

function Profiel() {
    const navigate = useNavigate();
    const [voornaam, setVoornaam] = useState('Gebruiker')
    const [achternaam, setAchternaam] = useState('Gebruiker Achternaam')

    useEffect(() => {
        setVoornaam (JSON.parse(localStorage.getItem('userData'))?.voornaam || 'Gebruiker')
        setAchternaam (JSON.parse(localStorage.getItem('userData'))?.achternaam || 'Gebruiker Achternaam')
    }, []);

    return (
        <div className="min-h-screen bg-green-900 flex flex-col items-center justify-center relative overflow-hidden">
            <BackButton onClick={() => navigate('/hoofdpagina')} />

            <h1 className="text-white text-8xl font-bold mb-10 font-itim">Profiel</h1>

            <div className="flex">
                <div className="flex flex-col gap-[2vw]">
                    <p className={`bg-orange-100 text-[1.7vw] w-[25vw] text-center text-orange-800 placeholder-orange-700 rounded-full py-5 border-4 border-green-500 focus:outline-none text-xl 'opacity-50 cursor-not-allowed' : ''}`}
                    > {voornaam} </p>

                    <p className={`bg-orange-100 text-[1.7vw] w-[25vw] text-center text-orange-800 placeholder-orange-700 rounded-full py-5 border-4 border-green-500 focus:outline-none text-xl 'opacity-50 cursor-not-allowed' : ''}`}
                    > {achternaam} </p>

                    <p className={`bg-orange-100 text-[1.7vw] w-[25vw] text-center text-orange-800 placeholder-orange-700 rounded-full py-5 border-4 border-green-500 focus:outline-none text-xl 'opacity-50 cursor-not-allowed' : ''}`}
                    >*********</p>
                </div>

                <img/>

            </div>


        </div>
    );
}

export default Profiel;
