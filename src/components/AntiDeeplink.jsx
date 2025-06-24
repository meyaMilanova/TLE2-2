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

        if (requireCollectedItems) {
            if (!collectedItems) {
                navigate('/hoofdpagina');
                return;
            }
            try {
                const parsed = JSON.parse(collectedItems);
                if (!Array.isArray(parsed) || parsed.length !== 15) {
                    navigate('/hoofdpagina');
                    return;
                }
            } catch {
                // Bij parse-fout ook terug
                navigate('/hoofdpagina');
                return;
            }
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
