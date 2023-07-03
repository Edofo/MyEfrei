import ApiClient from "@/api/ApiClient";
import { useQuery } from "react-query";

import { GetSubjectByClass } from "@/types/api/Subject";

const GetAllSubjectsForClass = async ({ class_uuid }: GetSubjectByClass) => {
    try {
        const { data } = await ApiClient.post("/graphql", {
            query: `
              query ($class_uuid: String!) {
                subjectsForClass(class_uuid: $class_uuid) {
                    uuid
                    name
                    module {
                        uuid
                        name
                    }
                }
              }
            `,
            variables: {
                class_uuid,
            },
        });

        return data;
    } catch (error: any) {
        throw new Error(error);
    }
};

const useGetAllSubjectsForClass = ({ class_uuid }: GetSubjectByClass) => {
    return useQuery(["subjectsForClass", class_uuid], () => GetAllSubjectsForClass({ class_uuid }));
};

export default useGetAllSubjectsForClass;
export { GetAllSubjectsForClass };
