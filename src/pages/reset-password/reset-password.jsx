import React, {useEffect} from 'react';
import styles from "./reset-password.module.css";
import AppHeader from "../../components/app-header/app-header";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {redirectionComplete, resetPasswordRequest, setRedirection} from "../../services/authSlice";
import {useForm} from "../../hooks/useForm";

export default function ResetPassword() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const {values, handleChange} = useForm({ password: '', token: '' });

    const isRequestInProcess = useSelector(state => state.auth.requestInProcess)
    const redirectNeeded = useSelector(state => state.auth.redirectNeeded)
    const isError = useSelector(state => state.auth.requestErr)

    const clickOnLogin = () => {
        navigate('/login');
    }

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(resetPasswordRequest(values))
    }

    useEffect(() => {
        if (redirectNeeded) {
            dispatch(setRedirection())
            navigate('/login')
        }
    }, [redirectNeeded]);

    return (
        <div className={styles.main}>
            <form className={styles.form} onSubmit={onSubmit}>
                <p className="text text_type_main-medium">Восстановление пароля</p>
                <PasswordInput
                    onChange={handleChange}
                    placeholder={'Введите новый пароль'}
                    value={values.password}
                    name={'password'}
                    extraClass="mt-6"
                />
                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={handleChange}
                    value={values.token}
                    name={'token'}
                    required={true}
                    error={false}
                    size={'default'}
                    extraClass="mt-6"
                />
                <Button htmlType="submit" type="primary" size="large" extraClass="mt-6" disabled={isRequestInProcess}>Сохранить</Button>
                {isError ? <p className={`${styles.error} text text_type_main-small mt-2`}>Произошла ошибка! Попробуйте ещё раз.</p> : <></>}
            </form>
            <div className={`${styles.second_text} mt-20`}>
                <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?</p>
                <Button htmlType="button" type="secondary" size="medium" extraClass={styles.no_padding} onClick={clickOnLogin}>Войти</Button>
            </div>
        </div>
    );
};
