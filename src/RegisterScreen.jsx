import React, { useState } from 'react';

function RegisterScreen() {
    const [form, setForm] = useState({
        voornaam: '',
        achternaam: '',
        wachtwoord: '',
        klassencode: '',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Registratie verstuurd:\n' + JSON.stringify(form, null, 2));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Voornaam:</label>
                <input
                    type="text"
                    name="voornaam"
                    value={form.voornaam}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Achternaam:</label>
                <input
                    type="text"
                    name="achternaam"
                    value={form.achternaam}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Wachtwoord:</label>
                <input
                    type="password"
                    name="wachtwoord"
                    value={form.wachtwoord}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Klassencode:</label>
                <input
                    type="text"
                    name="klassencode"
                    value={form.klassencode}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">Registreren</button>
        </form>
    );
}

export default RegisterScreen;