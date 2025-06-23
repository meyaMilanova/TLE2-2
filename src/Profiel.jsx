import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButtonProfiel from './components/BackButtonProfiel.jsx';
import AntiDeeplink from './components/AntiDeeplink.jsx';
import PinkButton from "./components/PinkButton.jsx";
import OrangeButton from "./components/OrangeButton.jsx";
import {greyAvatar} from "./data/avatars.js";

function Profiel() {
    const navigate = useNavigate();
    const [voornaam, setVoornaam] = useState('Gebruiker');
    const [achternaam, setAchternaam] = useState('Gebruiker Achternaam');
    const [avatar, setAvatar] = useState('/placeholder-profile.png');

    useEffect(() => {
        const userData = localStorage.getItem('userData');
        const savedAvatar = localStorage.getItem('selectedAvatar');
        if (userData) {
            const parsedData = JSON.parse(userData);
            setVoornaam(parsedData?.voornaam || 'Gebruiker');
            setAchternaam(parsedData?.achternaam || 'Gebruiker Achternaam');
        }
        if (savedAvatar) {
            setAvatar(savedAvatar);
        }
    }, []);

    useEffect(() => {
        const raw = localStorage.getItem('selectedAvatar');
        if (raw) {
            try {
                setAvatar(JSON.parse(raw));
            } catch {
                setAvatar(raw);
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('userData');
        localStorage.removeItem('selectedAvatar');
        navigate('/');
    };

    return (
        <>
            <AntiDeeplink />
            <div className="min-h-screen bg-green-900 flex flex-col items-center justify-center relative overflow-hidden">
                <BackButtonProfiel />

                <h1 className="text-white text-8xl font-bold mb-10 font-itim">Profiel</h1>

                <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="flex flex-col gap-11 items-center">
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

                    {/* Profielfoto */}
                    {/*<img*/}
                    {/*    src={avatar}*/}
                    {/*    alt="Profielfoto"*/}
                    {/*    className="w-[12vw] h-[12vw] rounded-full border-4 border-orange-100 object-cover"*/}
                    {/*/>*/}

                    {avatar ? (
                        <img
                            src={avatar}
                            alt="Profielfoto"
                            className="w-[18vw] h-[18vw] rounded-[1vw] p-[1vw] border-4 border-startButton object-cover ring-4 ring-hoverButton"
                        />
                    ) : (
                        <img
                            src={greyAvatar}
                            alt="Grey Profielfoto"
                            className="w-[18vw] h-[18vw] rounded-[1vw] p-[1vw] border-4 border-startButton object-cover ring-4 ring-hoverButton"
                        />
                    )}



                </div>

                {/* Buttons */}
                <div className="mt-10 flex gap-4">
                    <PinkButton
                        onClick={() => navigate('/avatarkiezen')}
                    >
                        Bewerken
                    </PinkButton>
                    <OrangeButton
                        onClick={handleLogout}
                    >
                        Uitloggen
                    </OrangeButton>
                </div>
            </div>
        </>
    );
}

export default Profiel;
