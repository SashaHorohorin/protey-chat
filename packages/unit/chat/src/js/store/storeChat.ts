import {IResponseAllChats, IResponseAllUsers} from "@/js/types/typeResponse";
import {action, makeAutoObservable, observable} from "mobx";


class StoreChat {
    chats: IResponseAllChats[] = [];
    allUsers: IResponseAllUsers[] = []

    get getChats(){
        return this.chats;
    }
    constructor() {
        makeAutoObservable(this)
    }

    setChats(array: IResponseAllChats[]){
        this.chats = array;
    }
    setAllUsers(array: IResponseAllUsers[]){
        this.allUsers = array;
        console.log(this.allUsers)
    }
}

export const storeChat = new StoreChat();