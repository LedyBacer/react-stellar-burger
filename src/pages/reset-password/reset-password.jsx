import React from 'react';
import styles from "./reset-password.module.css";
import AppHeader from "../../components/app-header/app-header";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useNavigate} from "react-router-dom";

export default function ResetPassword() {
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
                <PasswordInput
                    onChange={onChange}
                    placeholder={'Введите новый пароль'}
                    value={value}
                    name={'password'}
                    extraClass="mt-6"
                />
                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={onChange}
                    value={value}
                    name={'name'}
                    error={false}
                    size={'default'}
                    extraClass="mt-6"
                />
                <Button htmlType="button" type="primary" size="large" extraClass="mt-6">Сохранить</Button>
                <div className={`${styles.second_text} mt-20`}>
                    <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?</p>
                    <Button htmlType="button" type="secondary" size="medium" extraClass={styles.no_padding} onClick={clickOnLogin}>Войти</Button>
                </div>
            </div>
        </div>
    );
};
