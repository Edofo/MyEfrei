import { Link, useNavigate } from "react-router-dom";

import { ButtonList, InputList } from "@/components";

// import styles from "./Login.module.css";

import useLogin from "@/api/auth/Login";

import { useMessageContext } from "@/contexts/MessageContext";
import { useAuthContext } from "@/contexts/AuthContext";

import { DASHBOARD, REGISTER } from "@/constants/Routes";
import GetUserInfos from "@/api/user/GetUserInfos";

const Login = () => {
    const mutation = useLogin();

    const { showMessage, MessageType } = useMessageContext();
    const { setAuth } = useAuthContext();

    const navigate = useNavigate();

    const onSubmit = async (e: any) => {
        e?.preventDefault();

        const { email, password } = e?.target?.elements;

        const result = await mutation.mutateAsync({
            email: email.value,
            password: password.value,
        });

        if (!result.success) {
            return showMessage({
                type: MessageType.ERROR,
                message: result.error,
            });
        }

        // save token to cookies with expiry date
        document.cookie = `${import.meta.env.VITE_COOKIE_NAME}=${result.data?.login?.accessToken}; expires=${new Date(
            result.data.expiresAt,
        ).toUTCString()}; path=/`;

        const userInfos = await GetUserInfos();

        setAuth({
            isAuth: true,
            token: result.data?.login?.accessToken,
            user: userInfos.data?.userInfos,
        });

        navigate(DASHBOARD);
    };

    return (
        <form onSubmit={onSubmit}>
            <InputList.Classic
                label="email"
                inputOptions={{
                    id: "email",
                    required: true,
                    type: "email",
                }}
            />

            <InputList.Classic
                label="password"
                inputOptions={{
                    id: "password",
                    required: true,
                    type: "password",
                }}
            />

            <div
                style={{
                    marginRight: "auto",
                }}
            >
                <p>
                    Don't have an account? <Link to={REGISTER}>Register</Link>
                </p>
                <p>
                    Forgot your password? <Link to={REGISTER}>Reset</Link>
                </p>
            </div>

            <ButtonList.Classic text="Login" buttonOptions={{ type: "submit" }} />
        </form>
    );
};

export default Login;
