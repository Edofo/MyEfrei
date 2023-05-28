import ApiClient from "../../ApiClient";

import { useQuery } from "react-query";

export const GetAllGrades = async () => {
    try {
        // fetch data (graphql) from api (students query)
        const { data } = await ApiClient.post("/graphql", {
            query: `
              query {
                grades {
                    id
                }
              }
            `,
        });

        // return data
        return data;
    } catch (error: any) {
        throw new Error(error);
    }
};

const useGetAllGrades = () => {
    return useQuery("students", GetAllGrades);
};

export default GetAllGrades;
export { useGetAllGrades };
