import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PinkButton from './components/PinkButton';
import BackButton from "./Components/BackButton.jsx";

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

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Registratie verstuurd:\n' + JSON.stringify(form, null, 2));
    };

    return (
        <div className="min-h-screen bg-green-900 flex flex-col items-center justify-center relative overflow-hidden">
            <BackButton onClick={() => { /* handle navigation here */ }} />

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
                    <PinkButton type="submit">VOLGENDE</PinkButton>
                </div>
            </form>
        </div>
    );
}

export default RegisterScreen;