import ApiClient from "../../ApiClient";

import { useQuery } from "react-query";

const GetClassForStudent = async () => {
    try {
        const { data } = await ApiClient.post("/graphql", {
            query: `
              query {
                classForStudent {
                    name
                    createdAt
                    updatedAt
                    students {
                        name
                        email
                    }
                }
              }
            `,
        });

        return data;
    } catch (error: any) {
        throw new Error(error);
    }
};

const useGetClassForStudent = () => {
    return useQuery("class", GetClassForStudent);
};

export default useGetClassForStudent;
export { GetClassForStudent };
