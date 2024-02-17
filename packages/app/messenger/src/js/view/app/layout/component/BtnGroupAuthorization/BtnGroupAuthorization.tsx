import React from 'react';
import {Link} from "react-router-dom";
import cn from "classnames";
import styles from "@/js/view/app/layout/Header/Header.module.scss";
import {AuthURL} from "@/js/constants";
import {
    BtnGroupAuthorizationProps
} from "@/js/view/app/layout/component/BtnGroupAuthorization/BtnGroupAuthorization.props";
import {storeAuth} from "@/js/store/sroreAuth/storeAuth";

const BtnGroupAuthorization = ({sign}: BtnGroupAuthorizationProps):JSX.Element => {
    const nextLink = () => {
        storeAuth.setObjValInputs({
            username: '',
            password: '',
            repeatPassword: ''
        })
    }
    return (
        <>
            <Link
                onClick={nextLink}
                className={cn(styles.link, {
                    [styles.active]: sign === AuthURL.registration
                })}
                to={`/auth/${AuthURL.registration}`}>
                Регитрация
            </Link>
            <Link
                onClick={nextLink}
                className={cn(styles.link, {
                    [styles.active]: sign === AuthURL.login
                })}
                to={`/auth/${AuthURL.login}`}>
                Войти
            </Link>
        </>
    );
};

export default BtnGroupAuthorization;