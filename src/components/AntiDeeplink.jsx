import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AntiDeeplink({ onNameFetched, requireCollectedItems = false, requireGameFlag = false }) {
    const navigate = useNavigate();

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("userData"));
        const collectedItems = localStorage.getItem("collectedItems");

        console.log("AntiDeeplink userData:", userData);
        console.log("AntiDeeplink collectedItems raw:", collectedItems);

        if (!userData) {
            console.log("AntiDeeplink: geen userData, redirect naar inloggen");
            navigate("/inloggen");
            return;
        }

        if (requireCollectedItems) {
            if (!collectedItems) {
                console.log("AntiDeeplink: geen collectedItems, redirect naar hoofdpagina");
                navigate("/hoofdpagina");
                return;
            }
            try {
                const parsed = JSON.parse(collectedItems);
                console.log("AntiDeeplink parsed collectedItems:", parsed);

                if (!Array.isArray(parsed) || parsed.length !== 15) {
                    console.log("AntiDeeplink: collectedItems is geen array of lengte !== 15, redirect");
                    navigate("/hoofdpagina");
                    return;
                }
            } catch (e) {
                console.log("AntiDeeplink: parse error collectedItems", e);
                navigate("/hoofdpagina");
                return;
            }
        }

        if (requireGameFlag) {
            console.log("AntiDeeplink: requireGameFlag true, redirect naar hoofdpagina");
            navigate("/hoofdpagina");
            return;
        }

        if (onNameFetched && userData.name) {
            onNameFetched(userData.name);
        }
    }, [navigate, onNameFetched, requireCollectedItems, requireGameFlag]);

    return null;
}

export default AntiDeeplink;