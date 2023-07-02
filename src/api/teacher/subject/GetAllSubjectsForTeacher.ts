import ApiClient from "@/api/ApiClient";
import { useQuery } from "react-query";

const GetAllSubjectsForTeacher = async () => {
    try {
        const { data } = await ApiClient.post("/graphql", {
            query: `
              query {
                subjectsForTeacher {
                    uuid
                    name
                    class {
                        uuid
                        name
                    }
                    module {
                        uuid
                        name
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

const useGetAllSubjectsForTeacher = () => useQuery("SubjectsForTeacher", GetAllSubjectsForTeacher);

export default useGetAllSubjectsForTeacher;
export { GetAllSubjectsForTeacher };
