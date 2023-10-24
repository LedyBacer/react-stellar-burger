import styles from "./register.module.css";
import AppHeader from "../../components/app-header/app-header";
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {createUserRequest, setRedirection} from "../../services/authSlice";
import {useForm} from "../../hooks/useForm";

export default function Register() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const {values, handleChange} = useForm({ email: '', password: '', name: '' });
    const isRequestInProcess = useSelector(state => state.auth.requestInProcess)
    const isError = useSelector(state => state.auth.requestErr)

    const clickOnLogin = () => {
        navigate('/login');
    }

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(createUserRequest(values))
    }

    return (
        <div className={styles.main}>
            <form className={styles.form} onSubmit={onSubmit}>
                <p className="text text_type_main-medium">Регистрация</p>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={handleChange}
                    value={values.name}
                    name={'name'}
                    error={false}
                    size={'default'}
                    extraClass="mt-6"
                />
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
                <Button htmlType="submit" type="primary" size="large" extraClass="mt-6" disabled={isRequestInProcess}>Зарегистрироваться</Button>
                {isError ? <p className={`${styles.error} text text_type_main-small mt-2`}>Произошла ошибка! Попробуйте ещё раз.</p> : <></>}
            </form>
            <div className={`${styles.second_text} mt-20`}>
                <p className="text text_type_main-default text_color_inactive">Уже зарегистрированы?</p>
                <Button htmlType="button" type="secondary" size="medium" extraClass={styles.no_padding} onClick={clickOnLogin}>Войти</Button>
            </div>
        </div>
    );
};
