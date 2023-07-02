import ApiClient from "@/api/ApiClient";
import { useMutation } from "react-query";

import { DeleteGradeRequest } from "@/types/api/Grade";

const DeleteGrade = async ({ grade_uuid }: DeleteGradeRequest) => {
    try {
        const response = await ApiClient.post("/graphql", {
            query: `
                mutation ($grade_uuid: String!) {
                    deleteGrade(grade_uuid: $grade_uuid) {
                        uuid
                        value
                    }
                }
            `,
            variables: {
                grade_uuid,
            },
        });

        return response.data;
    } catch (error: any) {
        throw new Error(error);
    }
};

const useDeleteGrade = () => {
    return useMutation(({ grade_uuid }: { grade_uuid: string }) => DeleteGrade({ grade_uuid }));
};

export default useDeleteGrade;
export { DeleteGrade };
