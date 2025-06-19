import React from 'react';
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('userData');
        navigate('/');
        window.location.reload();
    };

    return (
        <button
            className="absolute top-6 left-6 bg-red-500 rounded-lg px-6 py-3 shadow-lg flex items-center justify-center text-white text-xl font-bold z-50 transition-colors duration-200 hover:bg-red-600"
            onClick={handleLogout}
            type="button"
        >
            Uitloggen
        </button>
    );
}

export default LogoutButton;