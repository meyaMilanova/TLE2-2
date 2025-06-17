import { useNavigate } from 'react-router-dom';
import PinkButton from "./Components/PinkButton.jsx";
import OrangeButton from "./Components/OrangeButton.jsx";

function PauseMenu() {
    const navigate = useNavigate();

    const handleCloseGame = () => {
        localStorage.removeItem("gameDataWasteSorting")
        navigate('/hoofdpagina');
    };

    const handleLogout = () => {
        localStorage.removeItem('userData');
        localStorage.removeItem("gameDataWasteSorting")

        navigate('/');
        window.location.reload();
    };

    return(
        <section className="min-h-screen bg-green-900 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="flex flex-col gap-y-4 w-full max-w-sm">
                <PinkButton type="button" onClick={() => navigate(-1)}>DOORGAAN MET SPEL</PinkButton>
                <PinkButton type="button" onClick={() => navigate('/hoofdpagina')}>TERUG NAAR SPELLEN</PinkButton>
                <PinkButton type="button" onClick={() => navigate('/profiel')}>NAAR PROFIEL</PinkButton>
                <OrangeButton type="button" onClick={handleCloseGame}>SPEL SLUITEN</OrangeButton>
                <OrangeButton type="button" onClick={handleLogout}>UITLOGGEN</OrangeButton>
            </div>
        </section>
    )
}

export default PauseMenu;