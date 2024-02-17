import React, {useEffect} from 'react';
import {Outlet, useNavigate} from "react-router-dom";

const AppContainer = () => {
    const navigate = useNavigate()
    useEffect(() => {
        if(localStorage.getItem('token'))
            navigate('/chat')
        else
            navigate('/auth/login')
    }, [])
    return (
        <>
            <Outlet/>
        </>
    );
};

export default AppContainer;