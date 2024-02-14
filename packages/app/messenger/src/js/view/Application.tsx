import React from 'react';
import {observer} from 'mobx-react-lite'
import './global.module.scss'
import AppContainer from "@/js/view/app/AppContainer";
import {withLayout} from "@/js/view/app/layout/Layout";

const Application = observer(() => {

    return (
        <>
            <AppContainer/>
        </>
    );
});

export default withLayout(Application);