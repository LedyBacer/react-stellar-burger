import styles from "./loading.module.css";
import React from "react";

export function Loading() {

    return (
        <div className={styles.center}>
            <p className="text text_type_main-medium text_color_inactive">Загрузка..</p>
        </div>
    )
}