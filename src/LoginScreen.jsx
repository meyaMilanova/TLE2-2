import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PinkButton from './components/PinkButton';
import OrangeButton from "./components/OrangeButton.jsx";

function LoginScreen() {
    const [form, setForm] = useState({
        voornaam: '',
        achternaam: '',
        wachtwoord: '',
        klassencode: '',
    });

    const navigate = useNavigate(); // <-- Fix: create navigate function

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://145.24.223.108:8000/user/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'apikey' : 'superspookysecretadminapikeythatsuuuurelywontbeguessed',
                },
                body: JSON.stringify({
                    voornaam: form.voornaam,
                    wachtwoord: form.wachtwoord,
                }),
            })

            if (response.ok) {
                const data = await response.json()
                console.log('Login succesvol:', data)

                if (!localStorage.getItem('userData')) {
                    localStorage.setItem('userData', JSON.stringify(data.user))
                }
                if (!localStorage.getItem('selectedAvatar')) {
                    localStorage.setItem('selectedAvatar', JSON.stringify(data.user.avatar))
                    console.log(JSON.stringify(data.user.avatar))
                }

                navigate('/hoofdpagina');

            } else {
                const errorData = await response.json()
                console.error('Fout bij inloggen:', errorData)
                alert('Fout bij inloggen: ' + (errorData.message || errorData.error))
            }
        } catch (error) {
            console.error('Netwerkfout:', error)
            alert('Netwerkfout: ' + error.message)
        }
    }

    return (
        <div className="min-h-screen bg-green-900 flex flex-col items-center justify-center relative overflow-hidden">

            <h1
                className="text-white text-8xl font-bold mb-10 font-itim">Inloggen</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-[90%] max-w-md">
                <input
                    type="text"
                    name="voornaam"
                    placeholder="Voornaam..."
                    value={form.voornaam}
                    onChange={handleChange}
                    required
                    className="bg-orange-100 text-orange-800 placeholder-orange-700 rounded-full px-6 py-3 border-4 border-green-500 focus:outline-none text-xl"
                />
                <input
                    type="text"
                    name="achternaam"
                    placeholder="Achternaam..."
                    value={form.achternaam}
                    onChange={handleChange}
                    required
                    className="bg-orange-100 text-orange-800 placeholder-orange-700 rounded-full px-6 py-3 border-4 border-green-500 focus:outline-none text-xl"
                />
                <input
                    type="password"
                    name="wachtwoord"
                    placeholder="Wachtwoord..."
                    value={form.wachtwoord}
                    onChange={handleChange}
                    required
                    className="bg-orange-100 text-orange-800 placeholder-orange-700 rounded-full px-6 py-3 border-4 border-green-500 focus:outline-none text-xl"
                />

                <div className="flex justify-around mt-6">
                    <PinkButton type="button" onClick={() => navigate('/aanmelden')}>AANMELDEN</PinkButton>
                    <OrangeButton type="submit">START</OrangeButton>
                </div>
            </form>
        </div>
    );
}

export default LoginScreen;