import React from 'react';
import cn from "classnames";
import styles from "@/js/view/app/layout/Header/Header.module.scss";
import {AuthURL} from "@/js/constants";
import {Link} from "react-router-dom";
import {storeAuth} from "@/bootstrap";

const BtnGroupChatProps = ():JSX.Element => {
    const btnLogout = async () => {
        await storeAuth.logout();
    }
    return (
        <>
            <button className={cn(styles.link)}>Создать чат</button>
            <Link
                onClick={btnLogout}
                className={cn(styles.link)}
                to={`/auth/${AuthURL.login}`}>
                Выйти
            </Link>
        </>
    );
};

export default BtnGroupChatProps;