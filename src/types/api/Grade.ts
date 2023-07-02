export interface UpdateGradeRequest {
    grade_uuid: string;
    value: string;
}

export interface DeleteGradeRequest {
    grade_uuid: string;
}

export interface AddGradeRequest {
    value: string;
    coef: string;
    student_uuid: string;
    subject_uuid: string;
}
