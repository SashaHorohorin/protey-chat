export interface IResponseAllChats {
    adminId: number;
    id: number;
    name: string;
    private: boolean;
}

export interface IPostCreateChat {
    name: string;
    creatorId: number;
    private: boolean;
}

export interface IResponseAllUsers {
    id: number;
    username: string
}

export interface IJoinOrLeaveChatRequest{
    chatId: number;
    userId: number;
}