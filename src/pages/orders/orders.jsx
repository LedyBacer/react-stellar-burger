import styles from "./orders.module.css";
import AppHeader from "../../components/app-header/app-header";
import React from "react";
import {ProfileNavbar} from "../../components/profile-nav/profile-nav";

export function Orders() {

    return (
        <div className={styles.index}>
            <AppHeader />
            <div className={styles.center}>
                <div className={styles.main}>
                    <ProfileNavbar />
                    <p className='text text_type_main-default'>wip</p>
                </div>
            </div>
        </div>
    );
}