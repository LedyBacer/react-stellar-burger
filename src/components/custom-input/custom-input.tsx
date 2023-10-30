import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useEffect, useRef} from "react";

type TCustomNameInput = {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    value: string
}

export function CustomNameInput({onChange, value}: TCustomNameInput) {
    const inputNameRef = useRef<HTMLInputElement>(null);
    const [disable, setDisable] = React.useState(true);

    const onIconClick = () => setDisable(false);

    useEffect(() => {
        if (!disable && inputNameRef.current) inputNameRef.current.focus()
    }, [disable, inputNameRef]);

    const onBlur = () => setDisable(true);

    return (
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
            onBlur={onBlur}
            disabled={disable}
            ref={inputNameRef}
        />
    )
}