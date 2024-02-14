import React from 'react';
import {Outlet} from "react-router-dom";

const AppContainer = () => {
    return (
        <>
            <Outlet/>
        </>
    );
};

export default AppContainer;