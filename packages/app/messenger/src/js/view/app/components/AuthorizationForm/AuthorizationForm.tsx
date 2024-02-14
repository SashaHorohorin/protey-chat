import React, {useState} from 'react';
import styles from './AuthorizationForm.module.scss';
import {AuthorizationFormProps} from "@/js/view/app/components/AuthorizationForm/AuthorizationForm.props";
import CustomInput from "@/js/view/app/components/CustomInput/CustomInput";
import {useNavigate, useParams} from "react-router-dom";
import {AuthURL} from "@/js/constants";
import {observer} from "mobx-react-lite";
import {storeAuth} from "@/bootstrap";
import cn from 'classnames';

const AuthorizationForm = observer(({title, nameButton}: AuthorizationFormProps): JSX.Element => {
    const {sign} = useParams();
    const navigation = useNavigate();
    const [flagError, setFlagError] = useState<boolean>(false)
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }

    const sendDataAuth = async () => {
        let newObjAuthorization = {
            ...storeAuth.objValInputs
        }

        if(sign === AuthURL.registration) {
            if (storeAuth.objValInputs.password !== storeAuth.objValInputs.repeatPassword){
                console.log('!==')
                setFlagError(true);
            } else {
                setFlagError(false);
                delete newObjAuthorization.repeatPassword;
                console.log(newObjAuthorization)
                await storeAuth.registration(newObjAuthorization);
                navigation('/auth/login');
            }
        }
        else {
            delete newObjAuthorization.repeatPassword;
            console.log(newObjAuthorization)
            await storeAuth.login(newObjAuthorization);
            navigation('/chat')
        }
        storeAuth.setObjValInputs({
            username: '',
            password: '',
            repeatPassword: ''
        })

    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>{title}</div>
            <form onSubmit={handleSubmit} className={styles.form} action="">
                <CustomInput type="text" id="username" name="username" placeholder={'Имя'}/>
                <CustomInput type="password" id="password" name="password" placeholder={"Пароль"}/>
                {sign === AuthURL.registration ? (
                    <>
                        <CustomInput type="password" id="repeatPassword" name="repeatPassword"
                                     placeholder={"Повторите пароль"}/>
                        <span className={cn(styles.error, {
                            [styles.active]: flagError
                        })}>Пароли не совпадают</span>
                    </>

                ) : null}
                <button onClick={sendDataAuth} className={styles.button}>{nameButton}</button>
            </form>
        </div>
    );
});


export default AuthorizationForm;