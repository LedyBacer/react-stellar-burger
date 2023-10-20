import React from 'react';
import styles from "./login.module.css";
import AppHeader from "../../components/app-header/app-header";
import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useNavigate} from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [value, setValue] = React.useState('')
    const onChange = e => {
        setValue(e.target.value)
    }

    const clickOnRegister = () => {
        navigate('/register');
    }

    const clickOnForgotPass = () => {
        navigate('/forgot-password');
    }

    return (
        <div className={styles.index}>
            <AppHeader />
            <div className={styles.main}>
                <p className="text text_type_main-medium">Вход</p>
                <EmailInput
                    onChange={onChange}
                    value={value}
                    name={'email'}
                    isIcon={false}
                    extraClass="mt-6"
                />
                <PasswordInput
                    onChange={onChange}
                    value={value}
                    name={'password'}
                    extraClass="mt-6"
                />
                <Button htmlType="button" type="primary" size="large" extraClass="mt-6">Войти</Button>
                <div className={`${styles.second_text} mt-20`}>
                    <p className="text text_type_main-default text_color_inactive">Вы — новый пользователь?</p>
                    <Button htmlType="button" type="secondary" size="medium" extraClass={styles.no_padding} onClick={clickOnRegister}>Зарегистрироваться</Button>
                </div>
                <div className={`${styles.second_text} mt-4`}>
                    <p className="text text_type_main-default text_color_inactive">Забыли пароль?</p>
                    <Button htmlType="button" type="secondary" size="medium" extraClass={styles.no_padding} onClick={clickOnForgotPass}>Восстановить пароль</Button>
                </div>
            </div>
        </div>
    );
};
