import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useEffect, useRef} from "react";

export function CustomNameInput({onChange, value}) {
    const inputNameRef = useRef(null);
    const [disable, setDisable] = React.useState(true);

    const onIconClick = () => setDisable(false);

    useEffect(() => {
        if (!disable) inputNameRef.current.focus()
    }, [disable]);

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