import ApiClient from "@/api/ApiClient";
import { useMutation } from "react-query";

import { AddGradeRequest } from "@/types/api/Grade";

const AddGrade = async ({ value, coef, student_uuid, subject_uuid }: AddGradeRequest) => {
    try {
        const response = await ApiClient.post("/graphql", {
            query: `
                mutation ($value: Float!, $coef: Float!, $student_uuid: String!, $subject_uuid: String!) {
                    createGrade(value: $value, coef: $coef, student_uuid: $student_uuid, subject_uuid: $subject_uuid) {
                        uuid
                        value
                        coef
                        subject {
                            uuid
                            name
                        }
                    }
                }
            `,
            variables: {
                value: Number(value),
                coef: Number(coef),
                student_uuid,
                subject_uuid,
            },
        });

        return response.data;
    } catch (error: any) {
        throw new Error(error);
    }
};

const useAddGrade = () => {
    return useMutation(({ value, coef, student_uuid, subject_uuid }: AddGradeRequest) =>
        AddGrade({ value, coef, student_uuid, subject_uuid }),
    );
};

export default useAddGrade;
export { AddGrade };
