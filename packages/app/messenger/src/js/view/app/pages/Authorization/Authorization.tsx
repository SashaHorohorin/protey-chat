import React from 'react';
import {useParams} from "react-router-dom";
import AuthorizationForm from "@/js/view/app/components/AuthorizationForm/AuthorizationForm";
import {AuthURL} from "@/js/constants";

const Authorization = () => {
    const { sign } = useParams();
    return (
        <>
            <AuthorizationForm
                title={sign === AuthURL.login ? 'Войти' : 'Регистрация'}
                nameButton={sign === AuthURL.registration ? 'Зарегистрироваться' : 'Войти'}/>
        </>
    );
};

export default Authorization;