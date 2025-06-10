import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TitleScreen from "./TitleScreen.jsx";
import RegisterScreen from "./RegisterScreen.jsx";

const router = createBrowserRouter([{
        children: [
            {
                path: "/",
                element: <TitleScreen />
            },
            {
                path: "/register",
                element: <RegisterScreen />
            }
        ]
    }],
);

function App() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default App