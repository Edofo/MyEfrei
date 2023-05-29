import { Outlet, useLocation } from "react-router-dom";

import styles from "./Auth.module.scss";

const Auth = () => {
    const location = useLocation();

    console.log(location);

    const title = location.pathname.split("/")[2];

    return (
        <section className={styles.auth}>
            <div className={styles.form}>
                <h1>
                    {title.slice(0, 1).toUpperCase()}
                    {title.slice(1)}
                </h1>
                <Outlet />
            </div>
        </section>
    );
};

export default Auth;
