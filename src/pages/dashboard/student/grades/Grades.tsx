import { Fragment, useState } from "react";
import styles from "./Grades.module.scss";

import { Table } from "@/components";
import useGetAllGradesForStudent from "@/api/student/grades/GetAllGradesForStudent";

const Grades = () => {
    const head = ["UE", "Module", "Type", "Coef", "Moyenne/Résultat"];

    const body = [
        {
            ue: "UE - Concevoir et développer des composants d'interface utilisateur - (ECTS --- / 3)",
            moyenne: "---",
            modules: [
                {
                    name: "ReactJS",
                    teacher: "Edofo",
                    moyenne: "---",
                    coef: 1,
                    grades: [
                        {
                            name: "CTD",
                            coef: 1,
                            grade: "---",
                        },
                    ],
                },
            ],
        },
    ];

    const [displayMessage, setDisplayMessage] = useState(false);

    const test = useGetAllGradesForStudent();

    console.log(test);

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
                {body?.map((item, index) => {
                    return (
                        <Fragment key={index + "t1"}>
                            <tr key={index + "t1"} className={styles.tableTitle}>
                                <td colSpan={2}>{item.ue}</td>
                                <td></td>
                                <td></td>
                                <td className="tableCenter">{item.moyenne}</td>
                            </tr>
                            {item?.modules?.map((module, index2) => {
                                return (
                                    <Fragment key={index2 + "t2"}>
                                        <tr className="tableColor">
                                            <td></td>
                                            <td>
                                                <b>{module?.name}</b> - <span>{module.teacher}</span>
                                            </td>
                                            <td></td>
                                            <td className="tableCenter">({module?.coef})</td>
                                            <td className="tableCenter">{module?.moyenne}</td>
                                        </tr>
                                        {module?.grades?.map((grade, index3) => {
                                            return (
                                                <tr key={index3 + "t3"}>
                                                    <td colSpan={2}></td>
                                                    <td className="tableCenter">{grade?.name}</td>
                                                    <td className="tableCenter">({grade?.coef})</td>
                                                    <td className="tableCenter">{grade?.grade}</td>
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
