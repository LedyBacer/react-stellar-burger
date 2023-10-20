import React from 'react';
import styles from "./register.module.css";
import AppHeader from "../../components/app-header/app-header";
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useNavigate} from "react-router-dom";

export default function Register() {
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
                <p className="text text_type_main-medium">Регистрация</p>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={onChange}
                    value={value}
                    name={'name'}
                    error={false}
                    size={'default'}
                    extraClass="mt-6"
                />
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
                <Button htmlType="button" type="primary" size="large" extraClass="mt-6">Зарегистрироваться</Button>
                <div className={`${styles.second_text} mt-20`}>
                    <p className="text text_type_main-default text_color_inactive">Уже зарегистрированы?</p>
                    <Button htmlType="button" type="secondary" size="medium" extraClass={styles.no_padding} onClick={clickOnLogin}>Войти</Button>
                </div>
            </div>
        </div>
    );
};
