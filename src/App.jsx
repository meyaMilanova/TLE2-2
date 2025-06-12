import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TitleScreen from "./TitleScreen.jsx";
import RegisterScreen from "./RegisterScreen.jsx";
import LoginScreen from "./LoginScreen.jsx";
import HomeScreen from "./HomeScreen.jsx";
import GameExplainer from "./Components/GameExplainer.jsx";
import PauseMenu from "./PauseMenu.jsx";
import WasteSorting from "./WasteSorting.jsx";
import AvatarMovement from "./AvatarMovement.jsx";

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
                path: "/afvalsorteren",
                element: <WasteSorting />
            },
            {
                path: "/avatar",
                element: <AvatarMovement/>
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