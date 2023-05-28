import styles from "./Foorter.module.scss";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.content}>
                <section>
                    <h3>MyEfrei</h3>
                    <p>MyEfrei est une plateforme de gestion de projets étudiants.</p>
                </section>
                <section>
                    <h3>Liens utiles</h3>
                    <ul>
                        <li>
                            <a href="#">Accueil</a>
                        </li>
                        <li>
                            <a href="#">Projets</a>
                        </li>
                    </ul>
                </section>
                <section>
                    <h3>Contact</h3>
                    <ul>
                        <li>
                            <a href="mailto:scolarite@efrei.fr">scolarite@efrei.fr</a>
                        </li>
                    </ul>
                </section>
            </div>
            <p className={styles.bottom}>&copy; MyEfrei - 2023</p>
        </footer>
    );
};

export default Footer;
