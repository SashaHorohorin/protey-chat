import {makeAutoObservable} from 'mobx'
import {IObjLogin, IObjRegistration, ISendObj} from "@/js/store/sroreAuth/types/sroreAuthTypes";
import AuthService from "../../service/AuthService";


class StoreAuth {
    objValInputs: ISendObj = {
        username: '',
        password: '',
        repeatPassword: ''
    }
    user:string = "";
    isAuth:Boolean = Boolean(localStorage.getItem("username")) || false;

    setUser(user: string) {
        this.user = user;
    }

    setAuth(bool: Boolean) {
        this.isAuth = bool;
    }

    constructor() {
        makeAutoObservable(this)
    }
    setObjValInputs(obj: ISendObj){
        this.objValInputs = obj;
    }
    async registration(obj: IObjRegistration) {
        try {
            const {status} = await AuthService.postRegister(obj);
            console.log(status)
            //Перенаправить на логин
        } catch (error) {
            console.log(error?.response?.data?.message)
        }
    }
    async login(obj: IObjLogin) {
        try {
            const {data} = await AuthService.postLogin(obj);
            localStorage.setItem("token", data.token);
            localStorage.setItem("username", data.username);
            localStorage.setItem("id", `${data.id}`);

            this.setAuth(true);
            this.setUser(data.username);
        } catch (error) {
            console.log(error);
        }
    }

    async logout() {
        try {
            localStorage.clear();
            this.setAuth(false);
            this.setUser("");
        } catch (error) {
            console.log(error?.message);
        }
    }
}


export const storeAuth = new StoreAuth();