import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { DASHBOARD, LOGIN } from "@/constants/Routes";

import { ProtectedRouteProps } from "@/types/components/ProtectedRoute";

import { useAuthContext } from "@/contexts/AuthContext";

const TeacherRoute = ({ children }: ProtectedRouteProps) => {
    const { isTeacher, isAuthenticate } = useAuthContext();

    const navigate = useNavigate();

    useEffect(() => {
        if (isTeacher === false) {
            if (isAuthenticate === false) {
                navigate(LOGIN, { replace: true });
            } else {
                navigate(DASHBOARD, { replace: true });
            }
        }
    }, [isTeacher]);

    return <>{children}</>;
};

export default TeacherRoute;
