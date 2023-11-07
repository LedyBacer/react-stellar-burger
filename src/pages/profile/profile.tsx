import React, {useEffect} from 'react';
import styles from "./profile.module.css";
import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {refreshTokenRequest, updateUserInfoRequest} from "../../services/authSlice";
import {deepEqual} from "../../utils/utils";
import {CustomNameInput} from "../../components/custom-input/custom-input";
import {ProfileNavbar} from "../../components/profile-nav/profile-nav";
import {isTokenExpired} from "../../utils/api";
import {useForm} from "../../hooks/useForm";
import {useAppDispatch, useAppSelector} from "../../hooks/typedHooks";

export default function Profile() {
    const dispatch = useAppDispatch()
    const userEmail = useAppSelector(state => state.auth.userEmail)
    const userName = useAppSelector(state => state.auth.userName);
    const isError = useAppSelector(state => state.auth.requestErr);
    const isRequestInProcess = useAppSelector(state => state.auth.requestInProcess);
    const accessToken = useAppSelector(state => state.auth.accessToken)
    const [initFormState, setInitFormState] = React.useState({email: userEmail, password: '', name: userName});
    const {values, handleChange, setValues} = useForm(initFormState);
    const [submitState, handleSubmitState] = React.useState(true)

    useEffect(() => {
        handleSubmitState(deepEqual(values, initFormState))
    }, [values, initFormState]);

    useEffect(() => {
        setInitFormState({email: userEmail, password: '', name: userName})
    }, [userEmail, userName]);

    const onSubmit = (e: React.FormEvent<HTMLElement>) => {
        if (accessToken) {
            e.preventDefault();
            if (isTokenExpired(accessToken)) {
                dispatch(refreshTokenRequest());
            }
            dispatch(updateUserInfoRequest({...values, accessToken}));
        }
    }

    const onReset = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        setValues(initFormState);
    }

    return (
        <div className={styles.center}>
            <div className={styles.main}>
                <ProfileNavbar />
                <form className={styles.inputs} onSubmit={onSubmit} onReset={onReset}>
                    <CustomNameInput onChange={handleChange} value={values.name}/>
                    <EmailInput
                        onChange={handleChange}
                        placeholder={'Логин'}
                        value={values.email}
                        name={'email'}
                        isIcon={true}
                        extraClass="mt-6"
                    />
                    <PasswordInput
                        onChange={handleChange}
                        value={values.password}
                        name={'password'}
                        icon="EditIcon"
                        extraClass="mt-6"
                    />
                    <div className={`${styles.buttons} mt-6`}>
                        <Button htmlType="reset" type="secondary" size="medium" extraClass={styles.no_padding} disabled={isRequestInProcess || submitState}>Отмена</Button>
                        <Button htmlType="submit" type="primary" size="large" disabled={isRequestInProcess || submitState}>Сохранить</Button>
                    </div>
                    {isError ? <p className={`${styles.error} text text_type_main-small mt-2`}>Произошла ошибка! Попробуйте ещё раз.</p> : <></>}
                </form>
            </div>
        </div>
    );
};
