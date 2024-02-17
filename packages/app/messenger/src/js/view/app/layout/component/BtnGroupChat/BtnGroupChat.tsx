import React, {useEffect, useState} from 'react';
import cn from "classnames";
import styles from "@/js/view/app/layout/Header/Header.module.scss";

import {Link} from "react-router-dom";

import {
    IJoinOrLeaveChatRequest,
    IPostCreateChat,
    IResponseAllChats, IResponseAllUsers
} from "@protey-chat/unit-chat/src/js/types/typeResponse";
import ChatService from "@protey-chat/unit-chat/src/js/service/ChatService";
import {observer} from "mobx-react-lite";
import {storeAuth} from "@/js/store/sroreAuth/storeAuth";
// @ts-ignore
import {storeChat} from "chat/store";
import {AuthURL} from "@/js/constants";


export type toggleType = 'personal' | 'group';
enum placeholderType {
    GROUP='Название чата',
    PERSONAL='Имя пользователя'
}

const BtnGroupChatProps = observer(():JSX.Element => {
    const [flagActive, setFlagActive] = useState<boolean>(false);
    const [toggle, setToggle] = useState<toggleType>('group');
    const [value, setValue] = useState<string>('')
    const btnLogout = async () => {
        await storeAuth.logout();
    }
    const createChat = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        let objSend: IPostCreateChat = {
            name: value,
            creatorId: +localStorage.getItem('id'),
            private: false,
        }
        if (toggle === "group") {
            let response = await ChatService.postCreateChat(objSend);
            if (response.status === 201) {
                let addChatObj: IResponseAllChats = {
                    name: objSend.name,
                    adminId: objSend.creatorId,
                    private: objSend.private,
                    id: response.data
                }
                storeChat.setChats([...storeChat.chats, addChatObj]);
            }
        } else {
            objSend.private = true;
            let response = await ChatService.postCreateChat(objSend);
            let addChatObj: IResponseAllChats = {
                name: objSend.name,
                adminId: objSend.creatorId,
                private: objSend.private,
                id: response.data
            }
            storeChat.setChats([...storeChat.chats, addChatObj]);
            let joinObj: IJoinOrLeaveChatRequest = {
                chatId: response.data,
                userId: storeChat.allUsers.find((user: IResponseAllUsers) => user.username === value).id
            }
            await ChatService.postJoinOrLeaveChatRequest(joinObj);
        }
    }
    
    const switchToggle = () => {
        if('group' === toggle){
            setToggle('personal')
        }else {
            setToggle('group');
        }
    }

    return (
        <div className={styles.wrapperBtnsChat}>
            <div className={styles.btnCreateWrapper}>
                <button onClick={() => setFlagActive(!flagActive)} className={cn(styles.link, {
                    [styles.activeBtnCreate]: flagActive
                })}>Создать чат</button>
                <div className={cn(styles.create, {
                    [styles.activeCreate]: flagActive
                })}>
                    <div className={cn(styles.create__header, styles.header)}>
                        <div onClick={() => setToggle('group')} className={styles.header__name}>Групповой</div>
                        <div onClick={() => switchToggle()} className={styles.header__toggle}><span className={toggle == 'personal' ? styles.activeToggle : null}></span></div>
                        <div onClick={() => setToggle('personal')} className={styles.header__name}>Личный</div>
                    </div>
                    <form className={styles.form}>
                        <input value={value} onChange={(event) => setValue(event.target.value)} className={styles.form__input} type="text" placeholder={toggle == 'personal' ? placeholderType.PERSONAL : placeholderType.GROUP}/>
                        <button onClick={(event) => createChat(event)} className={styles.form__btn}>Создать</button>
                    </form>
                </div>
            </div>
            <Link
                onClick={btnLogout}
                className={cn(styles.link)}
                to={`/auth/${AuthURL.login}`}>
                Выйти
            </Link>
        </div>
    );
});

export default BtnGroupChatProps;