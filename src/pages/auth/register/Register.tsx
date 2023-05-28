import { useNavigate } from "react-router-dom";

import useRegister from "@/api/auth/Register";

import { ButtonList, InputList } from "@/components";

import { useMessageContext } from "@/contexts/MessageContext";

import { LOGIN } from "@/constants/Routes";

const Login = () => {
    const { showMessage, MessageType } = useMessageContext();

    const mutation = useRegister();

    const navigate = useNavigate();

    const onSubmit = async (e: any) => {
        e?.preventDefault();

        // get all input values
        const { name, email, password } = e?.target.elements;

        const result = await mutation.mutateAsync({
            name: name.value,
            email: email.value,
            password: password.value,
        });

        if (!result.success) {
            return showMessage({
                type: MessageType.ERROR,
                message: result.error,
            });
        }

        // save token to cookies
        // document.cookie = `token=${result.data.token}`;

        navigate(LOGIN);
    };

    return (
        <form onSubmit={onSubmit}>
            <InputList.Classic
                label="name"
                inputOptions={{
                    required: true,
                    type: "text",
                }}
            />

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

            <ButtonList.Classic text="Register" buttonOptions={{ type: "submit" }} />
        </form>
    );
};

export default Login;
