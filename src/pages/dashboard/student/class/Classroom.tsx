import styles from "./Class.module.scss";

import useGetClassForStudent from "@/api/student/class/GetClassForStudent";

import { Table } from "@/components";

const Classroom = () => {
    const { data: classroom } = useGetClassForStudent();

    const dataClassroom = classroom?.data?.classForStudent;

    return (
        <div className={styles.class}>
            <h1>Ma team & teamates</h1>

            <h2>Nom de la team : {dataClassroom?.name}</h2>

            <Table
                head={["Nom", "Email"]}
                options={{
                    headTextPostion: "left",
                }}
            >
                {dataClassroom?.students?.map((student: any, index: number) => {
                    return (
                        <tr key={student?.user?.email + `${index}`}>
                            <td>{student?.user?.name}</td>
                            <td>{student?.user?.email}</td>
                        </tr>
                    );
                })}
            </Table>
        </div>
    );
};

export default Classroom;
