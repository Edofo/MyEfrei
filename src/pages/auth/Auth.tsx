import { Outlet, useLocation, useNavigate } from "react-router-dom";

import styles from "./Auth.module.scss";
import { LOGIN } from "@/constants/Routes";
import { useEffect } from "react";

const Auth = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const title = location.pathname.split("/")[2];

    useEffect(() => {
        if (!title) {
            return navigate(LOGIN, { replace: true });
        }
    }, []);

    return (
        <section className={styles.auth}>
            <div className={styles.form}>
                <h1>
                    {title?.slice(0, 1)?.toUpperCase()}
                    {title?.slice(1)}
                </h1>
                <Outlet />
            </div>
        </section>
    );
};

export default Auth;
