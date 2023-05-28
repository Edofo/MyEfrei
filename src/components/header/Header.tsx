import styles from "./Header.module.scss";

const Header = () => {
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
                    <p>Nolan</p>
                    <i className="fas fa-user" />
                </div>
            </div>
        </header>
    );
};

export default Header;
