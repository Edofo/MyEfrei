import ApiClient from "@/api/ApiClient";
import { useMutation } from "react-query";

import { UpdateGradeRequest } from "@/types/api/Grade";

const UpdateGrade = async ({ grade_uuid, value }: UpdateGradeRequest) => {
    try {
        const response = await ApiClient.post("/graphql", {
            query: `
                mutation ($grade_uuid: String!, $value: Float!) {
                    updateGrade(grade_uuid: $grade_uuid, value: $value) {
                        uuid
                        value
                    }
                }
            `,
            variables: {
                grade_uuid,
                value: Number(value),
            },
        });

        return response.data;
    } catch (error: any) {
        throw new Error(error);
    }
};

const useUpdateGrade = () => {
    return useMutation(({ grade_uuid, value }: UpdateGradeRequest) => UpdateGrade({ grade_uuid, value }));
};

export default useUpdateGrade;
export { UpdateGrade };
