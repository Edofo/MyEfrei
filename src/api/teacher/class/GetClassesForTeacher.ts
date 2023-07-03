import ApiClient from "../../ApiClient";
import { useQuery } from "react-query";

const GetClassesForTeacher = async () => {
    try {
        const { data } = await ApiClient.post("/graphql", {
            query: `
              query {
                classesForTeacher {
                    uuid
                    name
                    students {
                        uuid
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

const useGetClassForTeacher = () => {
    return useQuery("classesForTeacher", () => GetClassesForTeacher());
};

export default useGetClassForTeacher;
export { GetClassesForTeacher };
