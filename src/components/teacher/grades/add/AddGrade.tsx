import { useState } from "react";

import styles from "./AddGrade.module.scss";

import { ButtonList, InputList } from "@/components";

const AddGrade = ({ classes, subjects }: any) => {
    const [selectedClass, setSelectedClass] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("");
    const [selectedStudent, setSelectedStudent] = useState("");
    const [selectedCoef, setSelectedCoef] = useState("");
    const [selectedGrade, setSelectedGrade] = useState("");

    const handleSubmit = () => {};

    return (
        <div className={styles.AddGrade}>
            <h2>Ajouter une note</h2>

            <div>
                <p>Sélectionne la classe :</p>
                <InputList.Dropdown value={selectedClass} onChange={e => setSelectedClass(e.props?.children)}>
                    {classes?.map((classe: any) => {
                        return <p key={classe?.classe}>{classe?.classe}</p>;
                    })}
                </InputList.Dropdown>
            </div>

            {selectedClass !== "" && (
                <div>
                    <p>Sélectionne le sujet :</p>
                    <InputList.Dropdown value={selectedSubject} onChange={e => setSelectedSubject(e.props?.children)}>
                        {subjects?.map((subject: any) => {
                            return <p key={subject?.name}>{subject?.name}</p>;
                        })}
                    </InputList.Dropdown>
                </div>
            )}

            {selectedSubject !== "" && (
                <div>
                    <p>Sélectionne l'élève :</p>
                    <InputList.Dropdown value={selectedStudent} onChange={e => setSelectedStudent(e.props?.children)}>
                        {classes
                            ?.find((classe: any) => classe?.classe === selectedClass)
                            ?.students?.map((student: any) => {
                                return <p key={student?.name}>{student?.name}</p>;
                            })}
                    </InputList.Dropdown>
                </div>
            )}

            {selectedStudent !== "" && (
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
