import styles from "./Dashboard.module.scss";

import { Outlet } from "react-router-dom";

import { Footer, Header, Navbar } from "@/components";

const Dashboard = () => {
    return (
        <div className={styles.dashboard}>
            <div>
                <Header />
                <Navbar />

                <main className={styles.main}>
                    <Outlet />
                </main>
            </div>

            <Footer />
        </div>
    );
};

export default Dashboard;
