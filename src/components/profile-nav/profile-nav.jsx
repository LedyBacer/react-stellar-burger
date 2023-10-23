import styles from "./profile-nav.module.css";
import React, {useEffect, useState} from "react";
import {setRedirection, userLogoutRequest} from "../../services/authSlice";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

export function ProfileNavbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const redirectNeeded = useSelector(state => state.auth.redirectNeeded);
    const url = window.location.href;
    const initTabState = {
        profile: 'text_color_inactive',
        orders: 'text_color_inactive'
    }
    const [activeTab, setActiveTab] = useState(initTabState)

    const onHistoryClick = () => {
        navigate('/profile/orders')
    }

    const onProfileClick = () => {
        navigate('/profile')
    }

    const onLogoutClick = () => {
        dispatch(userLogoutRequest());
    }

    // useEffect(() => {
    //     if (redirectNeeded) {
    //         dispatch(setRedirection())
    //         navigate('/login')
    //     }
    // }, [redirectNeeded]);

    useEffect(() => {
        if (url.endsWith('/profile')) {
            setActiveTab({...initTabState, profile: ''})
        } else if (url.endsWith('/profile/orders')) {
            setActiveTab({...initTabState, orders: ''})
        }
    }, [url]);

    return (
        <div className={`ml-5`}>
            <nav>
                <ul className={styles.reset_nav}>
                    <li className='pt-4 pb-4'><a className={`${styles.clickable} text text_type_main-medium ${activeTab.profile}`} onClick={onProfileClick}>Профиль</a></li>
                    <li className='pt-4 pb-4'><a className={`${styles.clickable} text text_type_main-medium ${activeTab.orders}`} onClick={onHistoryClick}>История заказов</a></li>
                    <li className='pt-4 pb-4'><a className={`${styles.clickable} text text_type_main-medium text_color_inactive`} onClick={onLogoutClick}>Выход</a></li>
                </ul>
            </nav>
            <p className={`${styles.text_dark_grey_secondary_text} text text_type_main-small text_color_inactive mt-20`}>В этом разделе вы можете изменить свои персональные данные</p>
        </div>
    );
}