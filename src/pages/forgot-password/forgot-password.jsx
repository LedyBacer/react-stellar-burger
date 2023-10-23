import React, {useEffect} from 'react';
import styles from "./forgot-password.module.css";
import AppHeader from "../../components/app-header/app-header";
import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useNavigate} from "react-router-dom";
import {forgotPasswordRequest, setRedirection} from "../../services/authSlice";
import {useDispatch, useSelector} from "react-redux";

export default function ForgotPassword() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [email, setEmail] = React.useState('')
    const isRequestInProcess = useSelector(state => state.auth.requestInProcess)
    const awaitPassReset = useSelector(state => state.auth.awaitPassReset)
    const isError = useSelector(state => state.auth.requestErr)

    const onChangeEmail = e => {
        setEmail(e.target.value)
    }

    const clickOnLogin = () => {
        navigate('/login');
    }

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(forgotPasswordRequest(email))
    }

    useEffect(() => {
        if (awaitPassReset) {
            navigate('/reset-password')
        }
    }, [awaitPassReset]);

    return (
        <div className={styles.index}>
            <AppHeader />
            <div className={styles.main}>
                <form className={styles.form} onSubmit={onSubmit}>
                    <p className="text text_type_main-medium">Восстановление пароля</p>
                    <EmailInput
                        onChange={e => onChangeEmail(e)}
                        placeholder={'Укажите e-mail'}
                        value={email}
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
        </div>
    );
};
