import { useNavigate } from 'react-router-dom';
import BackButton from "./Components/BackButton.jsx";
import PinkButton from "./Components/PinkButton.jsx";
import OrangeButton from "./Components/OrangeButton.jsx";

function PauseMenu() {
    const navigate = useNavigate();

    return(
        <section className="min-h-screen bg-green-900 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="flex flex-col gap-y-4 w-full max-w-sm">
                <BackButton onClick={() => navigate(-1)} />
                <PinkButton type="button" onClick={() => navigate(-1)}>DOORGAAN MET SPEL</PinkButton>
                <PinkButton type="button" onClick={() => navigate('/hoofdpagina')}>TERUG NAAR SPELLEN</PinkButton>
                <PinkButton type="button" onClick={() => navigate('/')}>NAAR PROFIEL</PinkButton>
                <OrangeButton type="button" onClick={() => navigate('/')}>SPEL SLUITEN</OrangeButton>
                <OrangeButton type="button" onClick={() => navigate('/')}>UITLOGGEN</OrangeButton>
            </div>
        </section>
    )
}

export default PauseMenu;