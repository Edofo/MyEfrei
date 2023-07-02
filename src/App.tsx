import { Route, Routes } from "react-router-dom";

import { usePopupContext } from "@/contexts/PopupContext";
import { useMessageContext } from "@/contexts/MessageContext";
import { useAuthContext } from "@/contexts/AuthContext";

import * as RoutePaths from "@/constants/Routes";

import Auth, { Login, Register } from "@/pages/auth";
import Dashboard, { Home, Student, Teacher } from "@/pages/dashboard";

import { Popup, ProtectedRoute, TeacherRoute } from "@/components";
import { useEffect } from "react";

import { useGetUserInfos } from "./api/user/GetUserInfos";

const App = () => {
    const { setAuth } = useAuthContext();

    const { popup, hidePopup } = usePopupContext();
    const { message } = useMessageContext();

    const { data: userInfos, isLoading: userLoading } = useGetUserInfos();

    useEffect(() => {
        if (!userLoading) {
            const user = userInfos?.data?.userInfos;

            if (user !== undefined && user !== null) {
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
            {/* <RouterProvider router={BrowserRouter} /> */}
            <Routes location={window.location}>
                <Route
                    path={RoutePaths.DASHBOARD}
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                    caseSensitive
                >
                    <Route path={RoutePaths.HOME} element={<Home />} caseSensitive />
                    <Route path={RoutePaths.STUDENT_GRADES} element={<Student.Grades />} caseSensitive />
                    <Route path={RoutePaths.STUDENT_CLASSROOM} element={<Student.Classroom />} caseSensitive />
                    <Route path={RoutePaths.PLANNING} element={<Student.Planning />} caseSensitive />

                    <Route
                        path={RoutePaths.TEACHER_GRADES}
                        element={
                            <TeacherRoute>
                                <Teacher.Grades />
                            </TeacherRoute>
                        }
                        caseSensitive
                    />
                    <Route
                        path={RoutePaths.TEACHER_CLASSROOM}
                        element={
                            <TeacherRoute>
                                <Teacher.Classroom />
                            </TeacherRoute>
                        }
                        caseSensitive
                    />
                </Route>

                <Route path={RoutePaths.AUTH} element={<Auth />} caseSensitive>
                    <Route path={RoutePaths.LOGIN} element={<Login />} caseSensitive />
                    <Route path={RoutePaths.REGISTER} element={<Register />} caseSensitive />
                </Route>
            </Routes>

            {popup.isShow && <Popup.Classic onClose={hidePopup}>{popup.children}</Popup.Classic>}
            {message.isShow && <Popup.Message />}
        </>
    );
};

export default App;
