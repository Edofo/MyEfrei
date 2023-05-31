import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { usePopupContext } from "@/contexts/PopupContext";
import { useMessageContext } from "@/contexts/MessageContext";
import { useAuthContext } from "@/contexts/AuthContext";

import * as Routes from "@/constants/Routes";

import Auth, { Login, Register } from "@/pages/auth";
import Dashboard, { Home, Student } from "@/pages/dashboard";

import { Popup, ProtectedRoute } from "@/components";
import { useEffect } from "react";

import { useGetUserInfos } from "./api/user/GetUserInfos";

const BrowserRouter = createBrowserRouter(
    [
        {
            path: Routes.DASHBOARD,
            element: (
                <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>
            ),
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
                    path: Routes.CLASSROOM,
                    element: <Student.Classroom />,
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
    },
);

const App = () => {
    const { setAuth } = useAuthContext();

    const { popup } = usePopupContext();
    const { message } = useMessageContext();

    const { data: userInfos, isLoading: userLoading } = useGetUserInfos();

    useEffect(() => {
        if (!userLoading) {
            const user = userInfos?.data?.userInfos;

            if (user !== null) {
                setAuth({
                    isAuth: true,
                    token: "",
                    user,
                });
            } else {
                setAuth({
                    isAuth: false,
                    token: "",
                    user: null,
                });
            }
        }
    }, [userLoading]);

    return (
        <>
            <RouterProvider router={BrowserRouter} />
            {popup.isShow && <p>a</p>}
            {message.isShow && <Popup.Message />}
        </>
    );
};

export default App;
