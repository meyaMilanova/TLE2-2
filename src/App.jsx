import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Title from "./Title.jsx";

const router = createBrowserRouter([{
        children: [
            {
                path: "/",
                element: <Title />
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