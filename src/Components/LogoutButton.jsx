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
            className="absolute top-6 left-6 bg-orange-500 rounded-full w-16 h-16 flex items-center justify-center text-white text-3xl z-50"
            onClick={handleLogout}
            type="button"
        >
            <span className="font-bold">&#8592;</span>
        </button>
    );
}

export default LogoutButton;