import React from 'react';
import {CustomInputProps} from "@/js/view/app/components/CustomInput/CustomInput.props";
import {observer} from "mobx-react-lite";
import styles from './CustomInput.module.scss'
import {storeAuth} from "@/js/store/sroreAuth/storeAuth";

const CustomInput = observer(({...props}: CustomInputProps):JSX.Element => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        storeAuth.setObjValInputs({
            ...storeAuth.objValInputs,
            [event.target.name]: event.target.value
        })
    }
    return (
        <input
            {...props}
            className={styles.input}
            onChange={handleChange}
            value={(storeAuth.objValInputs as any)[props.name]}
        />
    );
});

export default CustomInput;