import styles from "./Navbar.module.scss";

import { Link } from "react-router-dom";

import * as Routes from "@/constants/Routes";

import { InputList } from "@/components";

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <ul>
                <li>
                    <Link to={Routes.HOME}>Accueil</Link>
                </li>
                <li>
                    <InputList.Dropdown value={<p>Scolarité</p>}>
                        <Link to={Routes.GRADES}>
                            <i className="fad fa-clipboard-list" /> Consulter mes notes
                        </Link>
                    </InputList.Dropdown>
                </li>
                <li>
                    <InputList.Dropdown value={<p>Campus</p>}>
                        <Link to={Routes.PLANNING}>
                            <i className="fad fa-calendar-alt" /> Consulter mon planning
                        </Link>
                    </InputList.Dropdown>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
