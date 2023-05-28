import { useState } from "react";

import styles from "./Planning.module.scss";

const Planning = () => {
    const [displayMessage, setDisplayMessage] = useState(false);

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

            <div className={styles.info}>
                <i className="fas fa-info-circle" />
                <p>
                    Pour toute question relative à vos cours et notes, nous vous invitons à envoyer un mail à l'adresse
                    : <a href="mailto:scolarite@efrei.fr">scolarite@efrei.fr</a>.
                </p>
            </div>

            <button className={styles.moreInfo} onClick={handleDisplayMessage}>
                <i className="fas fa-info-circle" />
                <p>Informations sur les notes</p>
            </button>

            <p className={styles.message}>
                Pour toute question concernant votre planning, veuillez contacter (selon votre cycle d'étude)
                <ul>
                    <li>
                        Cycle <b>L1</b> et <b>L2 M</b>. - <a href="mailto://aida.farcy@efrei.fr">Mme Aïda FARCY</a>
                    </li>
                    <li>
                        Cycle <b>L3, L3 app, M1 app</b> et <b>BTS</b>. -{" "}
                        <a href="mailto://mehdi.baroudi@efrei.fr">M. Mehdi BAROUDI</a>
                    </li>
                </ul>
                Les cours en présentiel sont dispensés sur les lieux suivants :
            </p>
        </div>
    );
};

export default Planning;
