import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { LOGIN } from "@/constants/Routes";

import { ProtectedRouteProps } from "@/types/components/ProtectedRoute";

import { useAuthContext } from "@/contexts/AuthContext";

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { isAuthenticate } = useAuthContext();

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticate === false) {
            navigate(LOGIN, { replace: true });
        }
    }, [isAuthenticate]);

    return <>{children}</>;
};

export default ProtectedRoute;
