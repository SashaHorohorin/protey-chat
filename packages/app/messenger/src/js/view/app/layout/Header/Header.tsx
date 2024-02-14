import React from 'react';
import {HeaderProps} from "@/js/view/app/layout/Header/Header.props";
import styles from './Header.module.scss'
import {useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {storeAuth} from "@/bootstrap";
import BtnGroupAuthorization from "@/js/view/app/layout/component/BtnGroupAuthorization/BtnGroupAuthorization";
import BtnGroupChat from "@/js/view/app/layout/component/BtnGroupChat/BtnGroupChat";

const Header = observer(({...props}: HeaderProps): JSX.Element => {
    const {sign} = useParams();

    return (
        <div {...props} className={styles.header}>
            <div className={styles.logo}>Протей чат</div>
            <div className={styles.navigation}>
                {storeAuth.isAuth ? <BtnGroupChat/> : <BtnGroupAuthorization sign={sign}/>}
            </div>
        </div>
    );
});

export default Header;