import ApiClient from "../../ApiClient";

import { useQuery } from "react-query";

export const GetAllGradesForStudent = async () => {
    try {
        // fetch data (graphql) from api (students query)
        const { data } = await ApiClient.post("/graphql", {
            query: `
              query {
                gradesForStudent {
                    uuid
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

const useGetAllGradesForStudent = () => {
    return useQuery("students", GetAllGradesForStudent);
};

export default GetAllGradesForStudent;
export { useGetAllGradesForStudent };
