import React from 'react';
import styles from "./not-found.module.css";

export default function NotFound404() {

    return (
        <div className={styles.main}>
            <p className="text text_type_digits-large text_color_inactive">404</p>
            <p className="text text_type_main-medium mt-4">Здесь ничего нет :(</p>
        </div>
    );
};