import styles from "./Navbar.module.scss";

import { Link, useLocation } from "react-router-dom";

import * as Routes from "@/constants/Routes";

import { InputList } from "@/components";

const Navbar = () => {
    const location = useLocation();

    const isColor = (path: string) => {
        if (path === Routes.HOME) {
            return location.pathname === path ? styles.active : "";
        }

        return location.pathname.includes(path) ? styles.active : "";
    };

    return (
        <nav className={styles.navbar}>
            <ul>
                <li className={isColor(Routes.HOME)}>
                    <Link to={Routes.HOME}>Accueil</Link>
                </li>
                <li className={isColor(Routes.STUDENT)}>
                    <InputList.Dropdown className={styles.dropdownNav} value="Scolarité">
                        <Link to={Routes.GRADES}>
                            <i className="fad fa-clipboard-list" /> Consulter mes notes
                        </Link>
                        <Link to={Routes.CLASSROOM}>
                            <i className="fad fa-clipboard-list" /> Consulter ma classe
                        </Link>
                    </InputList.Dropdown>
                </li>
                <li className={isColor(Routes.CAMPUS)}>
                    <InputList.Dropdown className={styles.dropdownNav} value="Campus">
                        <Link to={Routes.PLANNING}>
                            <i className="fad fa-calendar-alt" /> Consulter mon planning
                        </Link>
                    </InputList.Dropdown>
                </li>
                <li>
                    <a href="https://leets.app" target="__blank">
                        Leets
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
