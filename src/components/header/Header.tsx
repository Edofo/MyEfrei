import { useState } from "react";
import styles from "./Header.module.scss";

import { useGetUserInfos } from "@/api/user/GetUserInfos";
import { InputList } from "..";

const Header = () => {
    const { data: userInfos } = useGetUserInfos();
    const user = userInfos?.data?.userInfos;

    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

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
                    <i className="fas fa-user" onClick={() => setIsDropdownOpen(!isDropdownOpen)} />
                    {isDropdownOpen && (
                        <InputList.Dropdown value={user?.name} onChange={() => {}}>
                            <p>Mon compte</p>
                            <p>Se déconnecter</p>
                        </InputList.Dropdown>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
