import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { usePopupContext } from "@/contexts/PopupContext";
import { useMessageContext } from "@/contexts/MessageContext";

import * as Routes from "@/constants/Routes";

import Auth, { Login, Register } from "@/pages/auth";
import Dashboard, { Home, Student } from "@/pages/dashboard";
import { Popup } from "./components";

const BrowserRouter = createBrowserRouter(
    [
        {
            path: Routes.DASHBOARD,
            element: <Dashboard />,
            caseSensitive: true,
            children: [
                {
                    path: Routes.HOME,
                    element: <Home />,
                    caseSensitive: true,
                },
                {
                    path: Routes.GRADES,
                    element: <Student.Grades />,
                    caseSensitive: true,
                },
                {
                    path: Routes.PLANNING,
                    element: <Student.Planning />,
                    caseSensitive: true,
                },
            ],
        },
        {
            path: Routes.AUTH,
            element: <Auth />,
            caseSensitive: true,
            children: [
                {
                    path: Routes.LOGIN,
                    element: <Login />,
                    caseSensitive: true,
                },
                {
                    path: Routes.REGISTER,
                    element: <Register />,
                    caseSensitive: true,
                },
            ],
        },
    ],
    {
        basename: "/", // optional
        window: window, // optional
    }
);

const App = () => {
    const { popup } = usePopupContext();
    const { message } = useMessageContext();

    return (
        <>
            <RouterProvider router={BrowserRouter} />
            {popup.isShow && <p>a</p>}
            {message.isShow && <Popup.Message />}
        </>
    );
};

export default App;
