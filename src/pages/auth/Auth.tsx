import { Outlet, useLocation } from "react-router-dom";

import styles from "./Auth.module.scss";

const Auth = () => {
    return (
        <section className={styles.auth}>
            <div className={styles.form}>
                <h1>Auth</h1>
                <Outlet />
            </div>
        </section>
    );
};

export default Auth;
