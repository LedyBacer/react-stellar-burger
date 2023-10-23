import React, {useEffect} from 'react';
import styles from "./login.module.css";
import AppHeader from "../../components/app-header/app-header";
import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {loginUserRequest, setRedirection} from "../../services/authSlice";

export default function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [form, setValueForm] = React.useState({ email: '', password: ''});
    const isRequestInProcess = useSelector(state => state.auth.requestInProcess)
    // const redirectNeeded = useSelector(state => state.auth.redirectNeeded)
    const isError = useSelector(state => state.auth.requestErr)
    // const location = useLocation();

    const onChange = e => {
        setValueForm({ ...form, [e.target.name]: e.target.value });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUserRequest(form))
    }

    // useEffect(() => {
    //     // console.log(location)
    //     // if (redirectNeeded && location.state !== null) {
    //     //     // dispatch(setRedirection())
    //     //     // navigate(location.state)
    //     //     console.log('1', location)
    //     // } else if (redirectNeeded) {
    //     //     // dispatch(setRedirection())
    //     //     // navigate('/')
    //     //     console.log('2', location)
    //     // }
    //
    //     if (redirectNeeded) {
    //         dispatch(setRedirection())
    //         // navigate('/')
    //         // console.log('2', location)
    //     }
    //
    // }, [redirectNeeded, location]);

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
                <form className={styles.form} onSubmit={onSubmit}>
                    <p className="text text_type_main-medium">Вход</p>
                    <EmailInput
                        onChange={onChange}
                        value={form.email}
                        name={'email'}
                        isIcon={false}
                        extraClass="mt-6"
                    />
                    <PasswordInput
                        onChange={onChange}
                        value={form.password}
                        name={'password'}
                        extraClass="mt-6"
                    />
                    <Button htmlType="submit" type="primary" size="large" extraClass="mt-6" disabled={isRequestInProcess}>Войти</Button>
                    {isError ? <p className={`${styles.error} text text_type_main-small mt-2`}>Произошла ошибка! Попробуйте ещё раз.</p> : <></>}
                </form>
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
