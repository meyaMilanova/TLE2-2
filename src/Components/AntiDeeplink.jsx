import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AntiDeeplink({ onNameFetched }) {
    const navigate = useNavigate();

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));

        if (!userData) {
            navigate('/inloggen');
        } else {
            if (onNameFetched && typeof onNameFetched === 'function') {
                onNameFetched(userData.voornaam || 'Gebruiker');
            }
        }
    }, [navigate, onNameFetched]);


    return null;
}

export default AntiDeeplink;
