import React, {useEffect} from 'react';
import styles from "./profile.module.css";
import AppHeader from "../../components/app-header/app-header";
import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {updateUserInfoRequest} from "../../services/authSlice";
import {useDispatch, useSelector} from "react-redux";
import {deepEqual} from "../../utils/utils";
import {CustomNameInput} from "../../components/custom-input/custom-input";
import {ProfileNavbar} from "../../components/profile-nav/profile-nav";

export default function Profile() {
    const dispatch = useDispatch()
    const userEmail = useSelector(state => state.auth.userEmail)
    const userName = useSelector(state => state.auth.userName);
    const isError = useSelector(state => state.auth.requestErr);
    const isRequestInProcess = useSelector(state => state.auth.requestInProcess);
    const accessToken = useSelector(state => state.auth.accessToken)
    const [initFormState, setInitFormState] = React.useState({email: userEmail, password: '', name: userName});
    const [form, setValueForm] = React.useState(initFormState);
    const [submitState, handleSubmitState] = React.useState(true)

    const onFormChange = e => {
        setValueForm({ ...form, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        handleSubmitState(deepEqual(form, initFormState))
    }, [form, initFormState]);

    useEffect(() => {
        setInitFormState({email: userEmail, password: '', name: userName})
    }, [userEmail, userName]);

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUserInfoRequest({...form, accessToken}));
    }

    const onReset = e => {
        e.preventDefault();
        setValueForm(initFormState);
    }

    return (
        <div className={styles.index}>
            <AppHeader />
            <div className={styles.center}>
                <div className={styles.main}>
                    <ProfileNavbar />
                    <form className={styles.inputs} onSubmit={onSubmit} onReset={onReset}>
                        <CustomNameInput onChange={onFormChange} value={form.name}/>
                        <EmailInput
                            onChange={onFormChange}
                            placeholder={'Логин'}
                            value={form.email}
                            name={'email'}
                            isIcon={true}
                            extraClass="mt-6"
                        />
                        <PasswordInput
                            onChange={onFormChange}
                            value={form.password}
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
        </div>
    );
};
