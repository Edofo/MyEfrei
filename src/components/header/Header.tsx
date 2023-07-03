import { useState } from "react";
import styles from "./Header.module.scss";

import { useGetUserInfos } from "@/api/user/GetUserInfos";
import { useAuthContext } from "@/contexts/AuthContext";

import { LOGIN } from "@/constants/Routes";

const Header = () => {
    const { logout } = useAuthContext();

    const { data: userInfos } = useGetUserInfos();
    const user = userInfos?.data?.userInfos;

    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

    const handleLogout = () => {
        logout();

        // redirect to login page
        window.location.href = LOGIN;
    };

    return (
        <header className={styles.header}>
            <img
                src="https://www.myefrei.fr/portal/static/media/logo-efrei-black.af65d3fca2865884bb2f.png"
                alt="logo-efrei"
                loading="lazy"
            />
            <div>
                <i className="fas fa-bell" />
                <div className={styles.account}>
                    <div>
                        <p>{user?.name}</p>
                        <span>{user?.role === "STUDENT" ? "Etudiant" : "Intervenant"}</span>
                    </div>
                    <div className={styles.avatar}>
                        <i className="fas fa-user" onClick={() => setIsDropdownOpen(!isDropdownOpen)} />
                        {isDropdownOpen && (
                            <ul className={styles?.dropdown}>
                                <li>
                                    <p onClick={handleLogout}>Se déconnecter</p>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
