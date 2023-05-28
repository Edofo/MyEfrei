import { useMutation } from "react-query";

import ApiClient from "../ApiClient";

import { LoginInput } from "@/types/api/Auth";

const Login = async (data: LoginInput) => {
    try {
        const { data: response } = await ApiClient.post("/graphql", {
            query: `
                mutation {
                    login(email: "${data.email}", password: "${data.password}") {
                    accessToken
                    }
                }
            `,
        });

        return response;
    } catch (error: any) {
        throw new Error(error);
    }
};

const useLogin = () => {
    return useMutation((data: LoginInput) => Login(data));
};

export default useLogin;
export { Login };
