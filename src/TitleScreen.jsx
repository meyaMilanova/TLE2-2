import React from 'react';
import PinkButton from "./Components/PinkButton.jsx";
import {useNavigate} from "react-router-dom";
import batcat from '/src/assets/images/pets-single/batcat1_single.webp';
import grass from '/public/backgrounds/Pixilart_-_gramado-removebg-preview 1.png';
import trash1 from '/public/wastesorting/appel.png';
import trash2 from '/public/wastesorting/flesje.png';
import avatar1 from '/src/assets/images/avatars-profiel/grey-tshirt-girl-avatar-p.png';
import avatar2 from '/src/assets/images/avatars-profiel/blond-hair-girl-avatar-p.png';
import applepet from '/src/assets/images/pets-single/zombie1_single.webp'
import avatar3 from '/src/assets/images/avatars-profiel/red-hat-avatar-p.png';
import background from '/public/backgrounds/Vector.png'


const TitleScreen = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-green-900 relative">
            {/* Add position relative to the parent container */}
            <img src={background} alt='background' className='w-full h-full absolute top-0 left-0'/>

            <h1 className="text-[23vw] leading-[17vw] font-klear text-white mb-2 z-20">GROENLANDIA</h1>

            <div className="flex justify-around mt-6 flex-col md:flex-col max-w-2xl gap-5 z-30">
                <PinkButton type="button" onClick={() => navigate('/inloggen')}>
                    INLOGGEN
                </PinkButton>
                <PinkButton type="button" onClick={() => navigate('/aanmelden')}>
                    AANMELDEN
                </PinkButton>
            </div>

            <div className="absolute top-0 left-0 right-0 bottom-0 w-full flex flex-col items-center justify-between my-[1.8vw] z-10">
                <div className='flex w-[60vw] ml-[20vw] mr-[10vw] justify-between'>
                    <img className='w-[5vw] h-auto' src={batcat} alt="Batcat Background Decoration"/>
                    <img className='w-[3.5vw] pt-[2.5vw] h-auto rotate-[25deg]' src={trash1} alt="Trash Background Decoration"/>
                </div>

                <div className='flex ml-[5vw] gap-[40vw] pr-[40vw] justify-between w-auto pt-[1.2vw]'>
                    <img className='w-[3.5vw] h-auto pb-[4vw] rotate-[-35deg]' src={trash2} alt="Trash Background Decoration"/>
                    <img className='w-[4vw] h-auto pt-[4vw]' src={avatar1} alt="Avatar Background Decoration"/>
                </div>
                <div className='flex mx-[5vw] justify-between w-full'>
                    <img className='w-[5.5vw] h-auto' src={avatar2} alt="Avatar Background Decoration"/>
                    <img className='w-[4vw] h-auto' src={applepet} alt="Avatar's Pet Background Decoration"/>
                    <img className='w-[5.5vw] h-auto' src={avatar3} alt="Avatar Background Decoration"/>
                </div>

            </div>

            <div className='flex absolute h-screen justify-end items-end'>
            <img className='w-[20vw] h-auto' src={grass}/>
                <img className='w-[20vw] h-auto' src={grass}/>
                <img className='w-[20vw] h-auto' src={grass}/>
                <img className='w-[20vw] h-auto' src={grass}/>
                <img className='w-[20vw] h-auto' src={grass}/>
            </div>


        </div>
    );
}


export default TitleScreen;