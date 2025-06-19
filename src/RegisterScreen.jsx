import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PinkButton from './components/PinkButton';
import BackButton from "./Components/BackButton.jsx";
import OrangeButton from "./Components/OrangeButton.jsx";

function RegisterScreen() {
    const [form, setForm] = useState({
        voornaam: '',
        achternaam: '',
        wachtwoord: '',
        klassencode: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://145.24.223.108:8000/user', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            })

            if (response.ok) {
                const data = await response.json()
                console.log('Registratie succesvol:', data)
                navigate('/hoofdpagina')
            } else {
                const errorData = await response.json()
                console.error('Fout bij registratie:', errorData)
                alert('Fout bij registratie: ' + errorData.message || errorData.error)
            }
        } catch (error) {
            console.error('Netwerkfout:', error)
            alert('Netwerkfout: ' + error.message)
        }
    }

    return (
        <div className="min-h-screen bg-green-900 flex flex-col items-center justify-center relative overflow-hidden">

            <h1
                className="text-white text-8xl font-bold mb-10 font-itim" >Aanmelden</h1>

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
                <input
                    type="text"
                    name="klassencode"
                    placeholder="Klas Code..."
                    value={form.klassencode}
                    onChange={handleChange}
                    required
                    className="bg-orange-100 text-orange-800 placeholder-orange-700 rounded-full px-6 py-3 border-4 border-green-500 focus:outline-none text-xl"
                />

                <div className="flex justify-around mt-6">
                    <PinkButton type="button" onClick={() => navigate('/inloggen')}>INLOGGEN</PinkButton>
                    <OrangeButton type="submit">VOLGENDE</OrangeButton>
                </div>
            </form>
        </div>
    );
}

export default RegisterScreen;