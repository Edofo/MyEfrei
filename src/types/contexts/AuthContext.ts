export interface AuthContextType {
    auth: Auth;
    setAuth: (auth: Auth) => void;
}

export interface AuthProviderType {
    children: JSX.Element;
}

export interface Auth {
    isAuth: boolean | null;
    token: string;
    user: User | null;
}

export interface User {
    uuid: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}
