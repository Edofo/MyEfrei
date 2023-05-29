import { Link, useNavigate } from "react-router-dom";

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
        const { name, email, password, confirmPassword } = e?.target.elements;

        if (password.value !== confirmPassword.value) {
            return showMessage({
                type: MessageType.ERROR,
                message: "Passwords do not match",
            });
        }

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

        navigate(LOGIN);
    };

    return (
        <form onSubmit={onSubmit}>
            <InputList.Classic
                label="name"
                inputOptions={{
                    id: "name",
                    required: true,
                    type: "text",
                }}
            />

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

            <InputList.Classic
                label="Confirm Password"
                inputOptions={{
                    id: "confirmPassword",
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
                    Already have an account? <Link to={LOGIN}>Login</Link>
                </p>
            </div>

            <ButtonList.Classic text="Register" buttonOptions={{ type: "submit" }} />
        </form>
    );
};

export default Login;
