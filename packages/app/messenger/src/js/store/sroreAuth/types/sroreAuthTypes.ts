export interface ISendObj {
    username: string;
    password: string;
    repeatPassword?: string;
}
export interface IObjRegistration{
    username: string;
    password: string;
}
export interface IObjLogin extends IObjRegistration{}
export interface IResponseLogin{
    isSuccess: boolean;
    token: string;
    id: number;
    username: string;
}
