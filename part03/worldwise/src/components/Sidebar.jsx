import React from "react";
import styles from "./Sidebar.module.css";
import Logo from "./Logo";
import AppNav from "./AppNav";
import { Outlet } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className={styles.sidebar}>
            <Logo />
            <AppNav />
            <Outlet />
            <footer className={styles.footer}>
                <p className={styles.copyright}>
                    &copy; Copyright {new Date().getFullYear()} by WorldWise
                    Inc.
                </p>
            </footer>
        </div>
    );
};

export default Sidebar;
