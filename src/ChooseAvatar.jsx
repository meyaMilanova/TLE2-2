import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import avatars, { greyAvatar } from './data/avatars.js';
import PinkButton from "./components/PinkButton.jsx";
import AntiDeeplink from "./components/AntiDeeplink.jsx";
import BackButtonProfiel from "./components/BackButtonProfiel.jsx";

function AvatarSelection() {
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const navigate = useNavigate();

    const handleAvatarClick = (avatar) => {
        setSelectedAvatar(avatar);
    };

    const handleSave = async () => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const userId = userData?.id;

        if (!selectedAvatar || !userId) {
            if (!userId) {
                setAlertMessage('Je moet ingelogd zijn om een avatar op te slaan.');
            } else {
                setAlertMessage('Selecteer een avatar voordat je opslaat.');
            }
            setShowAlert(true);
            return;
        }

        try {
            const response = await fetch('http://145.24.223.108:8000/user/avatar', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'apikey' : 'superspookysecretadminapikeythatsuuuurelywontbeguessed',
                },
                body: JSON.stringify({
                    userId,
                    avatar: selectedAvatar,
                }),
            });

            if (response.ok) {
                localStorage.setItem('selectedAvatar', selectedAvatar);
                navigate(-1); // Navigate back to homepage
            } else {
                const errorData = await response.json();
                console.error('Error saving avatar:', errorData);
                alert('Fout bij opslaan avatar: ' + (errorData.message || errorData.error));
            }
        } catch (error) {
            console.error('Netwerkfout:', error);
            alert('Netwerkfout: ' + error.message);
        }
    };

    return (
        <>
            <AntiDeeplink />
            <div className="flex min-h-screen items-center justify-center bg-green-900 p-6">

                {/* Alert Modal */}
                {showAlert && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 w-[90vw] max-w-md shadow-xl relative text-center">
                            <h2 className="text-2xl font-bold mb-4">⚠️ Fout</h2>
                            <p className="mb-6 text-lg">{alertMessage}</p>
                            <PinkButton onClick={() => setShowAlert(false)}>Oké</PinkButton>
                        </div>
                    </div>
                )}

                {/* Geselecteerde Avatar */}
                <div className="flex-1 flex flex-col items-center justify-center">
                    {selectedAvatar ? (
                        <img
                            src={selectedAvatar}
                            alt="Selected Avatar"
                            className="w-auto h-[50vh] rounded-[1vw] border-4 px-2 py-5 border-orange-500 ring-4 ring-yellow-400 ring-inset"
                            style={{ imageRendering: "pixelated" }}
                        />
                    ) : (
                        <img
                            src={greyAvatar}
                            alt="Unselected Avatar"
                            className="w-auto h-[50vh] rounded-[1vw] border-4 px-2 py-5 border-orange-500 ring-4 ring-yellow-400 ring-inset"
                            style={{ imageRendering: "pixelated" }}
                        />
                    )}
                    <PinkButton onClick={handleSave} className="mt-6">Save</PinkButton>
                </div>

                {/* Avatar Galerie */}
                <div className="flex-1 flex flex-wrap items-center justify-center gap-[0.2vw]">
                    {avatars.map((avatar, index) => (
                        <div
                            key={index}
                            onClick={() => handleAvatarClick(avatar)}
                            className={`cursor-pointer p-2 bg-[#FDE3CF] ${
                                selectedAvatar === avatar ? 'ring-4 ring-orange-500 ring-inset' : ''
                            }`}
                        >
                            <img
                                src={avatar}
                                alt={`Avatar ${index + 1}`}
                                className="w-[9vw] h-[9vw] object-cover"
                                style={{ imageRendering: "pixelated" }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default AvatarSelection;
