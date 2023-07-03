import { createContext, useContext, useState } from "react";

import { AuthContextType, AuthProviderType, Auth } from "@/types/contexts/AuthContext";
import GetUserInfos from "@/api/user/GetUserInfos";

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: AuthProviderType) => {
    const [auth, setAuth] = useState<Auth>({
        isAuth: null,
        token: "",
        user: null,
    });

    return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuthContext must be used within a AuthProvider");
    }

    const { auth, setAuth } = context;

    const checkAuth = async () => {
        const user = await GetUserInfos();

        console.log(user);
        // if(user?.)
    };

    const logout = () => {
        // remove token from cookies
        document.cookie = `${import.meta.env.VITE_COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

        setAuth({ isAuth: false, token: "", user: null });
    };

    const isTeacher: boolean = auth.user?.role === "TEACHER";

    return { checkAuth, isAuthenticate: auth.isAuth, setAuth, isTeacher, logout };
};

export { AuthProvider, useAuthContext };
