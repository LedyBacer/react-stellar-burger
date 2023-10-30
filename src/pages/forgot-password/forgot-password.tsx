import React, {useEffect} from 'react';
import styles from "./forgot-password.module.css";
import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useLocation, useNavigate} from "react-router-dom";
import {forgotPasswordRequest, setRedirection} from "../../services/authSlice";
import {useForm} from "../../hooks/useForm";
import {useAppDispatch, useAppSelector} from "../../hooks/typedHooks";

export default function ForgotPassword() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isRequestInProcess = useAppSelector(state => state.auth.requestInProcess)
    const redirectNeeded = useAppSelector(state => state.auth.redirectNeeded)
    const isError = useAppSelector(state => state.auth.requestErr)
    const {values, handleChange} = useForm({email: ''});
    const location = useLocation();

    const clickOnLogin = () => {
        navigate('/login');
    }

    const onSubmit = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        dispatch(forgotPasswordRequest(values.email));
    }

    useEffect(() => {
        if (redirectNeeded) {
            dispatch(setRedirection())
            navigate('/reset-password', { state: {from: location}})
        }
    }, [redirectNeeded]);

    return (
        <div className={styles.main}>
            <form className={styles.form} onSubmit={onSubmit}>
                <p className="text text_type_main-medium">Восстановление пароля</p>
                <EmailInput
                    onChange={handleChange}
                    placeholder={'Укажите e-mail'}
                    value={values.email}
                    name={'email'}
                    isIcon={false}
                    extraClass="mt-6"
                />
                <Button htmlType="submit" type="primary" size="large" extraClass="mt-6" disabled={isRequestInProcess}>Восстановить</Button>
                {isError ? <p className={`${styles.error} text text_type_main-small mt-2`}>Произошла ошибка! Попробуйте ещё раз.</p> : <></>}
            </form>
            <div className={`${styles.second_text} mt-20`}>
                <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?</p>
                <Button htmlType="button" type="secondary" size="medium" extraClass={styles.no_padding} onClick={clickOnLogin}>Войти</Button>
            </div>
        </div>
    );
};
