import React from 'react';
import styles from "./profile.module.css";
import AppHeader from "../../components/app-header/app-header";
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";

export default function Profile() {
    const [value, setValue] = React.useState('')
    const [disable, setDisable] = React.useState(true)
    const onChange = e => {
        setValue(e.target.value)
    }
    const onIconClick = () => {
        setDisable(!disable);
    }

    return (
        <div className={styles.index}>
            <AppHeader />
            <div className={styles.center}>
                <div className={styles.main}>
                    <div className={`${styles.menu} ml-5`}>
                        <nav>
                            <ul className={styles.reset_nav}>
                                <li className='pt-4 pb-4'><a className='text text_type_main-medium'>Профиль</a></li>
                                <li className='pt-4 pb-4'><a className='text text_type_main-medium text_color_inactive'>История заказов</a></li>
                                <li className='pt-4 pb-4'><a className='text text_type_main-medium text_color_inactive'>Выход</a></li>
                            </ul>
                        </nav>
                        <p className={`${styles.text_dark_grey_secondary_text} text text_type_main-small text_color_inactive mt-20`}>В этом разделе вы можете изменить свои персональные данные</p>
                    </div>
                    <div className={styles.inputs}>
                        <Input
                            type={'text'}
                            placeholder={'Имя'}
                            onChange={onChange}
                            value={value}
                            name={'name'}
                            error={false}
                            size={'default'}
                            icon={'EditIcon'}
                            onIconClick={onIconClick}
                            disabled={disable}
                        />
                        <EmailInput
                            onChange={onChange}
                            placeholder={'Логин'}
                            value={value}
                            name={'email'}
                            isIcon={true}
                            extraClass="mt-6"
                        />
                        <PasswordInput
                            onChange={onChange}
                            value={value}
                            name={'password'}
                            icon="EditIcon"
                            extraClass="mt-6"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
