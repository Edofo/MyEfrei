import styles from "./Class.module.scss";

import useGetClassesForTeacher from "@/api/teacher/class/GetClassesForTeacher";

import { Table } from "@/components";
import { usePopupContext } from "@/contexts/PopupContext";

const Classroom = () => {
    const { showPopup } = usePopupContext();

    const { data: classrooms } = useGetClassesForTeacher();

    const dataClassroom = classrooms?.data?.classesForTeacher;

    const handleShowPopup = (data: any) => {
        showPopup(
            <>
                <h2>{data?.name}</h2>
                <p>{data?.students?.length} étudiants</p>
                <Table
                    head={["Nom", "Email"]}
                    options={{
                        headTextPostion: "left",
                    }}
                >
                    {data?.students?.map((data: any, index: number) => {
                        return (
                            <tr key={data?.user?.name + `${index}`}>
                                <td>{data?.user?.name}</td>
                                <td>{data?.user?.email}</td>
                            </tr>
                        );
                    })}
                </Table>
            </>,
        );
    };

    return (
        <div className={styles.class}>
            <h1>Consulter mes classes</h1>
            <p>
                {dataClassroom?.length} Classe{dataClassroom?.length > 1 ? "s" : ""}
            </p>

            <Table
                head={["Classe", "Nombres étudiants", "Actions"]}
                options={{
                    headTextPostion: "left",
                }}
            >
                {dataClassroom?.map((data: any, index: number) => {
                    return (
                        <tr key={data?.name + `${index}`}>
                            <td>{data?.name}</td>
                            <td>{data?.students?.length}</td>
                            <td>
                                <i className="fas fa-eye" onClick={() => handleShowPopup(data)} />
                            </td>
                        </tr>
                    );
                })}
            </Table>
        </div>
    );
};

export default Classroom;
