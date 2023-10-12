import React from "react";
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css'

function AppHeader() {
    return (
        <header className={styles.header}>
            <div className={styles['content-box']}>
                <div className={styles.tabs}>
                    <div className={`${styles.constructor} pl-5 pr-5 mt-4 mb-4`}>
                        <BurgerIcon type="primary"/>
                        <p className="text text_type_main-default ml-2">Конструктор</p>
                    </div>
                    <div className={`${styles['order-list']} pl-5 pr-5 mt-4 mb-4 ml-2`}>
                        <ListIcon type="secondary"/>
                        <p className="text text_type_main-default text_color_inactive ml-2">Лента заказов</p>
                    </div>
                </div>
                <div className={styles.logo}>
                    <Logo/>
                </div>
                <div className={`${styles.login} pl-5 pr-5 mt-4 mb-4`}>
                    <ProfileIcon type="secondary"/>
                    <p className="text text_type_main-default text_color_inactive ml-2">Личный кабинет</p>
                </div>
            </div>
        </header>
    );
}

export default AppHeader