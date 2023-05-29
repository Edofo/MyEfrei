import styles from "./Header.module.scss";

import { useGetUserInfos } from "@/api/user/GetUserInfos";

const Header = () => {
    const { data: userInfos } = useGetUserInfos();

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
                    <p>{userInfos?.data?.userInfos?.name}</p>
                    <i className="fas fa-user" />
                </div>
            </div>
        </header>
    );
};

export default Header;
