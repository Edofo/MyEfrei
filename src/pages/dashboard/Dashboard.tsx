import styles from "./Dashboard.module.scss";

import { Outlet } from "react-router-dom";

import { Footer, Header, Navbar } from "@/components";

const Dashboard = () => {
    return (
        <>
            <div>
                <Header />
                <Navbar />
            </div>

            <main className={styles.main}>
                <Outlet />
            </main>

            <Footer />
        </>
    );
};

export default Dashboard;
