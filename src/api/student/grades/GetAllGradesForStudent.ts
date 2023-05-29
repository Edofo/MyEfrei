import ApiClient from "../../ApiClient";

import { useQuery } from "react-query";

const GetAllGradesForStudent = async () => {
    try {
        const { data } = await ApiClient.post("/graphql", {
            query: `
              query {
                gradesForStudent {
                    module
                    moyenne
                    subjects {
                        subject
                        moyenne
                        teacher
                        grades {
                            value
                            coef
                        }
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

const useGetAllGradesForStudent = () => {
    return useQuery("students", GetAllGradesForStudent);
};

export default useGetAllGradesForStudent;
export { GetAllGradesForStudent };
