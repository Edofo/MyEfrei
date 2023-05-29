import { useMutation } from "react-query";

import ApiClient from "../ApiClient";

import { RegisterInput } from "@/types/api/Auth";

const Register = async (data: RegisterInput) => {
    try {
        const { data: response } = await ApiClient.post("/graphql", {
            query: `
              mutation {
                register(data: {
                    name: "${data.name}"
                    email: "${data.email}"
                    password: "${data.password}"
                }) {
                    uuid
                    user {
                        uuid
                        name
                        email
                    }
                }
              }
            `,
        });

        return response;
    } catch (error: any) {
        throw new Error(error);
    }
};

const useRegister = () => {
    return useMutation(async (data: RegisterInput) => await Register(data));
};

export default useRegister;
export { Register };
