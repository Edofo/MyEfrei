import { useState } from "react";

import styles from "./AddGrade.module.scss";

import { ButtonList, InputList } from "@/components";

import { useMessageContext } from "@/contexts/MessageContext";

import useGetClassesForTeacher from "@/api/teacher/class/GetClassesForTeacher";
import useAddGrade from "@/api/teacher/grades/AddGrade";
import useGetAllSubjectsForClass from "@/api/teacher/subject/GetAllSubjectsForClass";

const AddGrade = () => {
    const { showMessage, MessageType } = useMessageContext();

    const { mutateAsync: addGrade } = useAddGrade();

    const { data: classrooms } = useGetClassesForTeacher();

    const dataClassroom = classrooms?.data?.classesForTeacher;

    const [selectedClass, setSelectedClass] = useState({ uuid: "", name: "" });
    const [selectedSubject, setSelectedSubject] = useState({ uuid: "", name: "" });
    const [selectedStudent, setSelectedStudent] = useState({ uuid: "", name: "" });
    const [selectedCoef, setSelectedCoef] = useState("");
    const [selectedGrade, setSelectedGrade] = useState("");

    const { data: subjects } = useGetAllSubjectsForClass({ class_uuid: selectedClass?.uuid });
    const dataSubjects = subjects?.data?.subjectsForClass;

    const handleSubmit = async () => {
        const result = await addGrade({
            student_uuid: selectedStudent.uuid,
            subject_uuid: selectedSubject.uuid,
            value: selectedGrade,
            coef: selectedCoef,
        });

        if (result?.success) {
            showMessage({ message: "La note a bien été ajoutée", type: MessageType.SUCCESS });
        } else {
            showMessage({ message: "Une erreur est survenue", type: MessageType.ERROR });
        }

        // window.location.reload();
    };

    const handleSelectClass = (classe: any) => {
        setSelectedClass({ name: classe?.name, uuid: classe?.uuid });

        setSelectedSubject({ uuid: "", name: "" });
        setSelectedStudent({ uuid: "", name: "" });
        setSelectedCoef("");
        setSelectedGrade("");
    };

    return (
        <div className={styles.AddGrade}>
            <h2>Ajouter une note</h2>

            <div>
                <p>Sélectionne la classe :</p>
                <InputList.Dropdown value={selectedClass?.name}>
                    {dataClassroom?.map((classe: any) => {
                        return (
                            <p
                                key={classe?.name}
                                onClick={() => handleSelectClass({ name: classe?.name, uuid: classe?.uuid })}
                            >
                                {classe?.name}
                            </p>
                        );
                    })}
                </InputList.Dropdown>
            </div>

            {selectedClass.uuid !== "" && (
                <div>
                    <p>Sélectionne le sujet :</p>
                    <InputList.Dropdown value={selectedSubject?.name}>
                        {dataSubjects?.map((subject: any) => {
                            return (
                                <p
                                    key={subject?.name}
                                    onClick={() => setSelectedSubject({ uuid: subject?.uuid, name: subject?.name })}
                                >
                                    {subject?.name}
                                </p>
                            );
                        })}
                    </InputList.Dropdown>
                </div>
            )}

            {selectedSubject.uuid !== "" && (
                <div>
                    <p>Sélectionne l'élève :</p>
                    <InputList.Dropdown value={selectedStudent?.name}>
                        {dataClassroom
                            ?.find((classe: any) => classe?.name === selectedClass?.name)
                            ?.students?.map((student: any) => {
                                return (
                                    <p
                                        key={student?.name}
                                        onClick={() => setSelectedStudent({ uuid: student?.uuid, name: student?.name })}
                                    >
                                        {student?.name}
                                    </p>
                                );
                            })}
                    </InputList.Dropdown>
                </div>
            )}

            {selectedStudent.uuid !== "" && (
                <div>
                    <p>Sélectionne le coefficient :</p>
                    <InputList.Classic
                        inputOptions={{
                            placeholder: "Coef",
                            onChange: e => setSelectedCoef(e.target.value),
                            type: "number",
                            min: 0,
                            max: 20,
                        }}
                    />
                </div>
            )}

            {selectedCoef !== "" && (
                <div>
                    <p>Sélectionne la note :</p>
                    <InputList.Classic
                        inputOptions={{
                            placeholder: "Note",
                            onChange: e => setSelectedGrade(e.target.value),
                            type: "number",
                            min: 0,
                            max: 20,
                        }}
                    />
                </div>
            )}

            {selectedGrade !== "" && <ButtonList.Classic buttonOptions={{ onClick: handleSubmit }} text="Ajouter" />}
        </div>
    );
};

export default AddGrade;
