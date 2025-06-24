import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AntiDeeplink({ onNameFetched, requireCollectedItems = false, requireGameFlag = false }) {
    const navigate = useNavigate();

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const collectedItems = localStorage.getItem('collectedItems');

        if (!userData) {
            navigate('/inloggen');
            return;
        }

        if (requireCollectedItems && !collectedItems) {
            navigate('/hoofdpagina');
            return;
        }

        if (requireGameFlag) {
            navigate('/hoofdpagina');
            return;
        }

        if (onNameFetched && typeof onNameFetched === 'function') {
            onNameFetched(userData.voornaam || 'Gebruiker');
        }
    }, [navigate, onNameFetched, requireCollectedItems, requireGameFlag]);

    return null;
}

export default AntiDeeplink;
