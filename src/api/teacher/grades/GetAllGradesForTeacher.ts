import ApiClient from "../../ApiClient";

import { useQuery } from "react-query";

const GetAllGradesForTeacher = async () => {
    try {
        const { data } = await ApiClient.post("/graphql", {
            query: `
              query {
                gradesForTeacher {
                    class
                    subject
                    grades {
                        student {
                            uuid
                            name
                        }
                        grade {
                            uuid
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

const useGetAllGradesForTeacher = () => {
    return useQuery("GradesForTeacher", GetAllGradesForTeacher);
};

export default useGetAllGradesForTeacher;
export { GetAllGradesForTeacher };
