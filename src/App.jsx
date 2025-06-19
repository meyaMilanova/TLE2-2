import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TitleScreen from "./TitleScreen.jsx";
import RegisterScreen from "./RegisterScreen.jsx";
import LoginScreen from "./LoginScreen.jsx";
import HomeScreen from "./HomeScreen.jsx";
import GameExplainer from "./Components/GameExplainer.jsx";
import PauseMenu from "./Components/PauseMenu.jsx";
import WastePickup from "./WastePickup.jsx";
import AvatarMovement from "./Components/AvatarMovement.jsx";
import WasteSorting from "./WasteSorting.jsx";
import ToyCreation from "./ToyCreation.jsx"; // ✅ Import the new component
import Profiel from "./Profiel.jsx";
import Results from "./Results.jsx";
import AvatarSelection from "./ChooseAvatar.jsx";

const router = createBrowserRouter([{
        children: [
            {
                path: "/",
                element: <TitleScreen />
            },
            {
                path: "/aanmelden",
                element: <RegisterScreen />
            },
            {
                path: "/inloggen",
                element: <LoginScreen />
            },
            {
                path: "/hoofdpagina",
                element: <HomeScreen />
            },
            {
                path: "/game/:id",
                element: <GameExplainer />
            },
            {
                path: "/pauze",
                element: <PauseMenu />
            },
            {
                path: "/afvalrapen",
                element: <WastePickup />
            },
            {
                path: "/avatar",
                element: <AvatarMovement/>
            },
            {
                path: "/afvalsorteren",
                element: <WasteSorting/>
            },
            {
                path: "/profiel",
                element: <Profiel/>
            },
            {
                path: "/resultaten",
                element: <Results/>
            },
            {
                path: "/speelgoedmaken",
                element: <ToyCreation />
            },
            {
                path: "/avatarkiezen",
                element: <AvatarSelection/>
            }
        ]
    }
]);

function App() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;