import React, {useEffect, useState} from 'react';
import ChatService from "@/js/service/ChatService";
import {observer} from "mobx-react-lite";
import styles from './Chat.module.scss';
import cn from 'classnames';
import {IResponseAllChats} from "@/js/types/typeResponse";
import {storeChat} from "@/js/store/storeChat";
import {toggleType} from "@protey-chat/app-messenger/src/js/view/app/layout/component/BtnGroupChat/BtnGroupChat";

const Chat = observer(():JSX.Element => {
    const [categoryChat, setCategoryChat] = useState<toggleType>('group')
    const [sortChats, setSortChats] = useState<IResponseAllChats[]>([])
    const [valueSearch, setValueSearch] = useState<string>("")
    const getAllChats = async () => {
        const {data} = await ChatService.getChats();
        storeChat.setChats(data);
        sortChatByCategory('group');
    }
    const getAllUsers = async () => {
        const {data} = await ChatService.getAllUsers();
        storeChat.setAllUsers(data);
    }
    useEffect(() => {
        getAllChats();
        getAllUsers();
    }, [])

    useEffect(() => {
        if(categoryChat === 'group')
            sortChatByCategory('group')
        else
            sortChatByCategory('personal')
    }, [storeChat.chats])

    const sortChatByCategory = (category: toggleType) =>  {
        setCategoryChat(category);
        if (category === 'group')
            setSortChats(storeChat.chats.filter(chat => !chat.private))
        else
            setSortChats(storeChat.chats.filter(chat => chat.private))
    }

    //  new function needs testing
    const searchChat = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValueSearch(event.target.value);
        setSortChats(storeChat.chats.filter((chat) => chat.name.includes(event.target.value)))
    }

    const namePrivateChat = (chat: IResponseAllChats):string => {
        if(chat.private){
            if(chat.adminId !== +localStorage.getItem('id')) {
                return storeChat.allUsers.find((user) => chat.adminId === user.id).username
            }
        }
        return chat.name;
    }

    const deleteChat = async (id: number) => {
        const response = await ChatService.postDeleteChat(id);
        setSortChats((cur) => cur.filter((chat) => chat.id !== response.data));
        storeChat.setChats(storeChat.chats.filter((chat) => chat.id !== response.data));
    }

    const handleSubmit = (event:  React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }


    return (
        <div onClick={() => console.log(storeChat.chats)} className={styles.chatContainer}>
            <div className={styles.chats}>
                <div className={styles.chats__names}>
                    <div onClick={() => sortChatByCategory('group')} className={cn(styles.chats__name, {
                        [styles.activeTab]: categoryChat === 'group'
                    })}>Групповые чаты</div>
                    <div onClick={() => sortChatByCategory('personal')} className={cn(styles.chats__name, {
                        [styles.activeTab]: categoryChat === 'personal'
                    })}>Личные чаты</div>
                </div>
                <form onSubmit={(event) => handleSubmit(event)} className={styles.chats__search}>
                    <input value={valueSearch} onChange={(event) => searchChat(event)}  className={styles.chats__input} type="text" placeholder={'Название чата'}/>
                    <button className={styles.chats__button}>Найти</button>
                </form>
                <div className={styles.chatWrapper}>
                    {
                        sortChats.map(chat => (
                            <div key={chat.id} className={styles.chat}>
                                <span className={styles.chat__label}>{chat.private ? "Личный чат" : "Групповой чат"}</span>
                                <div className={styles.chat__title}>{namePrivateChat(chat)}</div>
                                <div className={styles.chat__btns}>
                                    {chat.adminId === +localStorage.getItem('id') &&
                                        <button onClick={() => deleteChat(chat.id)} className={styles.chat__button}>Удалить</button>}
                                    <button className={styles.chat__button}>Открыть</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className={styles.communication}>
                <div className={cn(styles.communication__header, styles.header)}>
                    <div className={styles.header__title}>Никита</div>
                    <div className={styles.header__count}>2 участника</div>
                </div>
                <div className={styles.communication__message}>
                    <div className={styles.messageContainer}>
                        <div className={styles.message}>
                            <div className={styles.message__header}>
                                <div className={styles.message__name}>Никита</div>
                                <div className={styles.message__time}>23:03</div>
                            </div>
                            <div className={styles.message__text}>Привет</div>
                        </div>
                    </div>

                </div>
                <form className={cn(styles.communication__form, styles.form)}>
                    <input className={styles.form__input} type="text"/>
                    <button className={styles.form__button}>Отправить</button>
                </form>
            </div>
        </div>
    );
});

export default Chat;