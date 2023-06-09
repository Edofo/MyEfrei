import ApiClient from "../ApiClient";

import { useQuery } from "react-query";

export const GetUserInfos = async () => {
    try {
        const { data } = await ApiClient.post("/graphql", {
            query: `
              query {
                userInfos {
                    uuid
                    name
                    email
                    role
                }
              }
            `,
        });

        return data;
    } catch (error: any) {
        throw new Error(error);
    }
};

const useGetUserInfos = () => {
    return useQuery("userInfos", GetUserInfos);
};

export default GetUserInfos;
export { useGetUserInfos };
