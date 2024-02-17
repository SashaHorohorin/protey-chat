import $api from "@/js/http";
import {IJoinOrLeaveChatRequest, IPostCreateChat, IResponseAllChats, IResponseAllUsers} from "@/js/types/typeResponse";

export default class ChatService {
    static async getChats() {
        return await $api.get<IResponseAllChats[]>(`/api/chat/get-all`);
    }
    static async postCreateChat(obj:IPostCreateChat) {
        return await $api.post(`/api/chat/create`, obj);
    }
    static async getAllUsers() {
        return await $api.get<IResponseAllUsers[]>(`/api/users`);
    }

    static async postJoinOrLeaveChatRequest(obj:IJoinOrLeaveChatRequest) {
        return await $api.post(`api/chat/join-chat`, obj);
    }
    static async postDeleteChat(id: number) {
        return await $api.post(`/api/chat/delete/${id}`, {});
    }
}
