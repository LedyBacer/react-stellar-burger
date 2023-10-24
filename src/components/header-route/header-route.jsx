import styles from "./header-route.module.css";
import AppHeader from "../app-header/app-header";
import {Outlet} from "react-router-dom";

export function HeaderRoute() {

    return (
        <div className={styles.index}>
            <AppHeader />
            <Outlet />
        </div>
    )
}
