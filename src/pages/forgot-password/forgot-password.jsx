import React from 'react';
import styles from "./forgot-password.module.css";
import AppHeader from "../../components/app-header/app-header";
import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useNavigate} from "react-router-dom";

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [value, setValue] = React.useState('')
    const onChange = e => {
        setValue(e.target.value)
    }

    const clickOnLogin = () => {
        navigate('/login');
    }

    return (
        <div className={styles.index}>
            <AppHeader />
            <div className={styles.main}>
                <p className="text text_type_main-medium">Восстановление пароля</p>
                <EmailInput
                    onChange={onChange}
                    placeholder={'Укажите e-mail'}
                    value={value}
                    name={'email'}
                    isIcon={false}
                    extraClass="mt-6"
                />
                <Button htmlType="button" type="primary" size="large" extraClass="mt-6">Восстановить</Button>
                <div className={`${styles.second_text} mt-20`}>
                    <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?</p>
                    <Button htmlType="button" type="secondary" size="medium" extraClass={styles.no_padding} onClick={clickOnLogin}>Войти</Button>
                </div>
            </div>
        </div>
    );
};
