import React, {useEffect, useState} from "react";
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css'
import {useNavigate} from "react-router-dom";

function AppHeader() {
    const navigate = useNavigate()
    const url = window.location.href;

    type TArgs = {
        text: string,
        icon: 'secondary' | 'primary' | 'error' | 'success'
    }
    const activeArgs: TArgs = {text: '', icon: 'primary'}
    const secondaryArgs: TArgs = {text: 'text_color_inactive', icon: 'secondary'}
    const initTabState = {
        home: secondaryArgs,
        profile: secondaryArgs
    }
    const [activeTab, setActiveTab] = useState(initTabState)
    const onClickProfile = () => {
        navigate('/profile')
    }

    const onClickConstructor = () => {
        navigate('/')
    }

    const onClickList = () => {
        //wip
    }

    useEffect(() => {
        if (url.endsWith('/')) {
            setActiveTab({...initTabState, home: activeArgs})
        } else if (url.includes('/profile')) {
            setActiveTab({...initTabState, profile: activeArgs})
        }
    }, [url]);

    return (
        <header className={styles.header}>
            <div className={styles['content-box']}>
                <div className={styles.tabs}>
                    <div className={`${styles.constructor} pl-5 pr-5 mt-4 mb-4`} onClick={onClickConstructor}>
                        <BurgerIcon type={activeTab.home.icon}/>
                        <p className={`text text_type_main-default ml-2 ${activeTab.home.text}`}>Конструктор</p>
                    </div>
                    <div className={`${styles['order-list']} pl-5 pr-5 mt-4 mb-4 ml-2`} onClick={onClickList}>
                        <ListIcon type="secondary"/>
                        <p className="text text_type_main-default text_color_inactive ml-2">Лента заказов</p>
                    </div>
                </div>
                <div className={styles.logo} onClick={onClickConstructor}>
                    <Logo />
                </div>
                <div className={`${styles.login} pl-5 pr-5 mt-4 mb-4`} onClick={onClickProfile}>
                    <ProfileIcon type={activeTab.profile.icon}/>
                    <p className={`text text_type_main-default ml-2 ${activeTab.profile.text}`}>Личный кабинет</p>
                </div>
            </div>
        </header>
    );
}

export default AppHeader