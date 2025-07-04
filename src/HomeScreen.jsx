import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {motion} from 'framer-motion';
import LogoutButton from "./components/LogoutButton.jsx";
import woodBackground from '../public/images/wood.webp';
import OrangeButton from "./components/OrangeButton.jsx";
import games from "./data/games.js";
import funFact from "./components/FunFact.jsx";
import AntiDeeplink from "./components/AntiDeeplink.jsx";
import {greyAvatar} from "./data/avatars.js";



function HomeScreen() {
    const navigate = useNavigate();
    const [name, setName] = useState('Gebruiker');
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        const userData = localStorage.getItem('userData');
        const avatarData = localStorage.getItem('selectedAvatar');

        if (userData && avatarData) {
            const parsedUserData = JSON.parse(userData);
            setName(parsedUserData?.voornaam || 'Gebruiker');
            setAvatar(avatarData || 'Profielfoto');
            console.log(avatarData)
        }
    }, []);

    useEffect(() => {
        localStorage.removeItem("collectedItems");
        localStorage.removeItem("gameDataWasteSorting");
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


    return (
        <>
            <AntiDeeplink onNameFetched={setName}/>

        <motion.div
            className="min-h-screen bg-green-900 flex flex-col items-center justify-center relative overflow-hidden"
            style={{ backgroundColor: '#14532d' }}
            animate={{ opacity: 1, y: 0 }}
        >

                <div className='flex justify-center items-center gap-[1vw] pl-[86vw] mt-[-3vw]' onClick={() => navigate('/profiel')}>
                    <p className='text-right text-white text-[1.6vw] leading-none'>{name}</p>
                    {avatar ? (
                        <img
                            src={avatar}
                            alt="Profielfoto"
                            className="w-[5vw] h-[5vw] p-2 rounded-full border-2 border-startButton object-cover ring-2 ring-hoverButton"                            />
                    ) : (
                        <img
                            src={greyAvatar}
                            alt="Grey Profielfoto"
                            className="w-[5vw] h-[5vw] p-2 rounded-full border-2 border-startButton object-cover ring-2 ring-hoverButton"                            />
                    )}
                </div>

            {/*<h1 className="text-white text-4xl mb-5">*/}
            {/*    Hoi {name}!*/}
            {/*</h1>*/}

            <motion.div
                style={{ backgroundColor: '#72AC43' }}
                className="flex items-center p-5 rounded-xl mb-5"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                <motion.p className="text-white text-2xl mr-4">
                    Feitje van de dag:
                </motion.p>
                <motion.h1 className="text-black text-1.5xl">
                    {funFact}
                </motion.h1>
            </motion.div>

            <div
                className="w-[1150px] h-[600px] rounded-2xl flex items-center justify-center relative"
                style={{
                    backgroundImage: `url(${woodBackground})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                {/* Decorative corners */}
                <div className="absolute top-4 left-4 w-5 h-5 bg-gray-700 rounded-full border-2 border-gray-400 shadow-md z-10"></div>
                <div className="absolute top-4 right-4 w-5 h-5 bg-gray-700 rounded-full border-2 border-gray-400 shadow-md z-10"></div>
                <div className="absolute bottom-4 left-4 w-5 h-5 bg-gray-700 rounded-full border-2 border-gray-400 shadow-md z-10"></div>
                <div className="absolute bottom-4 right-4 w-5 h-5 bg-gray-700 rounded-full border-2 border-gray-400 shadow-md z-10"></div>

                <div className="grid grid-cols-2 grid-rows-2 w-[1100px] h-[550px] gap-8 p-6">
                    {games.map((rectangle, idx) => (
                        <motion.div
                            key={rectangle.id}
                            className="flex flex-row items-center justify-center rounded border-2 text-2xl w-full h-full relative"
                            style={{
                                backgroundColor: '#FDE3CF',
                                boxShadow: '0 8px 24px rgba(60, 30, 10, 0.25), 0 2px 4px rgba(60, 30, 10, 0.15)',
                                border: '3px solid #b48a78'
                            }}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 + idx * 0.15, duration: 0.5 }}
                            whileHover={{ scale: 1.04, boxShadow: '0 12px 32px rgba(60,30,10,0.35)' }}
                        >
                            {/* Decorative dots */}
                            <div className="absolute top-2 left-2 w-4 h-4 bg-gray-700 rounded-full border-2 border-gray-400 shadow-md"></div>
                            <div className="absolute top-2 right-2 w-4 h-4 bg-gray-700 rounded-full border-2 border-gray-400 shadow-md"></div>

                            <div className="flex items-center justify-center w-1/3 h-full">
                                <img src={rectangle.image} alt={rectangle.title} className="w-full h-full object-cover" />
                            </div>

                            <div className="flex flex-col items-start w-2/3 h-full pl-4 pr-2">
                                <span className="text-4xl mt-8" style={{ color: '#632713' }}>{rectangle.title}</span>
                                <p className="mt-2 mb-2 text-base text-black flex-1">{rectangle.description}</p>
                                <OrangeButton
                                    type="button"
                                    onClick={() => {
                                        if (rectangle.id !== 3 && rectangle.id !== 4) {
                                            navigate(`/game/${rectangle.id}`);
                                        }
                                    }}
                                    disabled={rectangle.id === 3 || rectangle.id === 4}
                                    style={{
                                        fontSize: '1.4rem',
                                        padding: '0.7rem 2rem',
                                        backgroundColor: rectangle.id === 3 || rectangle.id === 4 ? '#cccccc' : '#F97316', // grijs of oranje
                                        color: rectangle.id === 3 || rectangle.id === 4 ? '#666666' : 'white',
                                        opacity: rectangle.id === 3 || rectangle.id === 4 ? 0.8 : 1,
                                        cursor: rectangle.id === 3 || rectangle.id === 4 ? 'not-allowed' : 'pointer',
                                    }}
                                    className="self-end mb-4 mr-3"
                                >
                                    {rectangle.id === 3 || rectangle.id === 4 ? 'Binnenkort' : 'Start'}
                                </OrangeButton>

                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
        </>
    );
}

export default HomeScreen;
