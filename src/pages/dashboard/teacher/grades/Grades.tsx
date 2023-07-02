import { useState } from "react";

import styles from "./Grades.module.scss";

import { ButtonList, InputList, Table, Teacher } from "@/components";

import useGetAllGradesForTeacher from "@/api/teacher/grades/GetAllGradesForTeacher";
import useGetAllSubjectsForTeacher from "@/api/teacher/subject/GetAllSubjectsForTeacher";

import { usePopupContext } from "@/contexts/PopupContext";

const Grades = () => {
    const { showPopup } = usePopupContext();

    const { data: grades } = useGetAllGradesForTeacher();
    const { data: subjects } = useGetAllSubjectsForTeacher();

    const dataGrades = grades?.data?.gradesForTeacher;
    const dataSubjects = subjects?.data?.subjectsForTeacher;

    const [selectedClass, setSelectedClass] = useState<string>("Tous");

    const classes = dataGrades
        ?.sort((a: any, b: any) => a?.class > b?.class)
        .map((grade: any) => {
            return grade?.class;
        });
    classes?.unshift("Tous");

    const displayPopupAddGrade = () => {
        const tab: any = [];
        /* [{ classe: "XXX", students: [{ name: "XXX", uuid: "XXX" }] }] */

        dataGrades?.forEach((grade: any) => {
            const index = tab.findIndex((x: any) => x?.classe === grade?.class);

            if (index === -1) {
                tab.push({
                    classe: grade?.class,
                    students: grade?.grades?.map((x: any) => {
                        return { name: x?.student?.name, uuid: x?.student?.uuid };
                    }),
                });
            } else {
                tab[index].students.push({
                    name: grade?.grades?.map((x: any) => {
                        return { name: x?.student?.name, uuid: x?.student?.uuid };
                    }),
                });
            }
        });

        showPopup(<Teacher.Grades.AddGrade classes={tab} subjects={dataSubjects} />);
    };

    const displayPopupEditGrade = () => {
        showPopup(<Teacher.Grades.EditGrade />);
    };

    const displayPopupDeleteGrade = () => {
        showPopup(<Teacher.Grades.DeleteGrade />);
    };

    return (
        <div className={styles.grades}>
            <h1>Mes notes</h1>

            <div className={styles.sub}>
                <div>
                    <p>Filtrer par :</p>
                    <div>
                        <p>Classe</p>
                        <InputList.Dropdown value={selectedClass} onChange={e => setSelectedClass(e.props?.children)}>
                            {classes?.map((classe: any) => {
                                return <p key={classe}>{classe}</p>;
                            })}
                        </InputList.Dropdown>
                    </div>
                    <div>
                        <p>Sujet</p>
                    </div>
                    {/* <InputList.Classic inputOptions={{placeholder: "Rechercher une"}} /> */}
                </div>
                <div>
                    <ButtonList.Classic buttonOptions={{ onClick: displayPopupAddGrade }} text="Ajouter une note" />
                </div>
            </div>

            <Table
                head={["Classe", "Sujet", "Elève", "Coef", "Note", "Actions"]}
                className={styles.table}
                options={{
                    headTextPostion: "left",
                }}
            >
                {dataGrades
                    ?.filter((grade: any) => {
                        if (selectedClass === "Tous") {
                            return grade;
                        } else {
                            return grade?.class === selectedClass;
                        }
                    })
                    ?.sort((a: any, b: any) => a?.class > b?.class)
                    ?.sort((a: any, b: any) => a?.subject > b?.subject)
                    .map((grade: any) => {
                        return grade?.grades
                            ?.sort((a: any, b: any) => a?.student?.name > b?.student?.name)
                            .map((x: any, index: number) => {
                                return (
                                    <tr key={grade?.class + x?.student?.name + String(index)}>
                                        <td>{grade?.class}</td>
                                        <td>{grade?.subject}</td>
                                        <td>{x?.student?.name}</td>
                                        <td>{x?.grade?.coef}</td>
                                        <td>{x?.grade?.value}</td>
                                        <td>
                                            <i className="fas fa-edit" onClick={() => displayPopupEditGrade()} />
                                            <i className="fas fa-trash" onClick={() => displayPopupDeleteGrade()} />
                                        </td>
                                    </tr>
                                );
                            });
                    })}
            </Table>
        </div>
    );
};

export default Grades;
