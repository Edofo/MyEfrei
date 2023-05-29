import { Fragment, useState } from "react";
import styles from "./Grades.module.scss";

import { Table } from "@/components";

import useGetAllGradesForStudent from "@/api/student/grades/GetAllGradesForStudent";

const Grades = () => {
    const head = ["UE", "Module", "Type", "Coef", "Moyenne/Résultat"];

    const [displayMessage, setDisplayMessage] = useState(false);

    const { data: grades } = useGetAllGradesForStudent();

    const handleDisplayMessage = () => {
        setDisplayMessage(!displayMessage);
        const message = document.querySelector(`.${styles.message}`);

        if (message) {
            if (!displayMessage) {
                message.classList.add(styles.show);
                const height = message?.scrollHeight;
                // eslint-disable-next-line
                // @ts-ignore
                message.style.height = `${height + 20}px`;
            } else {
                message.classList.remove(styles.show);
                // eslint-disable-next-line
                // @ts-ignore
                message.style.height = `0px`;
            }
        }
    };

    return (
        <div className={styles.grades}>
            <h1>Mes notes et crédits</h1>

            <section className={styles.info}>
                <i className="fas fa-info-circle" />
                <p>
                    Pour toute question relative à vos cours et notes, nous vous invitons à envoyer un mail à l'adresse
                    : <a href="mailto:scolarite@efrei.fr">scolarite@efrei.fr</a>.
                </p>
            </section>

            <button className={styles.moreInfo} onClick={handleDisplayMessage}>
                <i className="fas fa-info-circle" />
                <p>Informations sur les notes</p>
            </button>

            <p className={styles.message}>
                L’affichage de vos notes, de vos moyennes de module / UE et de vos ECTS obtenus n’est pas automatique.
                L’approbation par le responsable de département ou de majeure est nécessaire pour la publication de vos
                résultats.
                <br />
                <br />
                Cette icône <b>---</b> est affichée sur les éléments pour lesquels vous n'avez pas encore de résultat ou
                avez des résultats non approuvés.
            </p>

            <Table head={head} className={styles.table}>
                {grades?.data?.gradesForStudent?.map((module: any, index: number) => {
                    return (
                        <Fragment key={index + "t1"}>
                            <tr key={index + "t1"} className={styles.tableTitle}>
                                <td className="tableCenter">UE</td>
                                <td>{module?.module}</td>
                                <td></td>
                                <td></td>
                                <td className="tableCenter">{module?.moyenne}</td>
                            </tr>
                            {module?.subjects?.map((subject: any, index2: number) => {
                                return (
                                    <Fragment key={index2 + "t2"}>
                                        <tr className="tableColor">
                                            <td></td>
                                            <td>
                                                <b>{subject?.subject}</b> - <span>{subject.teacher}</span>
                                            </td>
                                            <td></td>
                                            <td className="tableCenter">ok</td>
                                            <td className="tableCenter">{subject.moyenne}</td>
                                        </tr>
                                        {subject?.grades?.map((grade: any, index3: number) => {
                                            return (
                                                <tr key={index3 + "t3"}>
                                                    <td colSpan={2}></td>
                                                    <td className="tableCenter">ok</td>
                                                    <td className="tableCenter">({grade?.coef})</td>
                                                    <td className="tableCenter">{grade?.value}</td>
                                                </tr>
                                            );
                                        })}
                                    </Fragment>
                                );
                            })}
                        </Fragment>
                    );
                })}
            </Table>
        </div>
    );
};

export default Grades;
