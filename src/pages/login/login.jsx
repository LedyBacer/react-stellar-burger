import styles from "./login.module.css";
import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {loginUserRequest} from "../../services/authSlice";
import {useForm} from "../../hooks/useForm";

export default function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const isRequestInProcess = useSelector(state => state.auth.requestInProcess)
    const isError = useSelector(state => state.auth.requestErr)
    const {values, handleChange} = useForm({ email: '', password: ''});


    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUserRequest(values))
    }

    const clickOnRegister = () => {
        navigate('/register');
    }

    const clickOnForgotPass = () => {
        navigate('/forgot-password');
    }

    return (
        <div className={styles.main}>
            <form className={styles.form} onSubmit={onSubmit}>
                <p className="text text_type_main-medium">Вход</p>
                <EmailInput
                    onChange={handleChange}
                    value={values.email}
                    name={'email'}
                    isIcon={false}
                    extraClass="mt-6"
                />
                <PasswordInput
                    onChange={handleChange}
                    value={values.password}
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
    );
};
