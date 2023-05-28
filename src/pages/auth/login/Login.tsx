import { useNavigate } from "react-router-dom";

import { ButtonList, InputList } from "@/components";

// import styles from "./Login.module.css";

import useLogin from "@/api/auth/Login";

import { useMessageContext } from "@/contexts/MessageContext";

import { DASHBOARD } from "@/constants/Routes";

const Login = () => {
    const mutation = useLogin();

    const { showMessage, MessageType } = useMessageContext();

    const navigate = useNavigate();

    const onSubmit = async (e: any) => {
        e?.preventDefault();

        // get all input values
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

        navigate(DASHBOARD);
    };

    return (
        <form onSubmit={onSubmit}>
            <InputList.Classic
                label="email"
                inputOptions={{
                    required: true,
                    type: "email",
                }}
            />

            <InputList.Classic
                label="password"
                inputOptions={{
                    required: true,
                    type: "password",
                }}
            />

            <ButtonList.Classic text="Login" buttonOptions={{ type: "submit" }} />
        </form>
    );
};

export default Login;
