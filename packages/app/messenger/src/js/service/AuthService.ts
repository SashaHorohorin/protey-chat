import {IObjLogin, IObjRegistration, IResponseLogin} from "@/js/store/sroreAuth/types/sroreAuthTypes";
import $api from "@/js/http";

export default class AuthService {
    static async postRegister(obj: IObjRegistration) {
        return await $api.post(`/api/auth/register`, obj);
    }
    static async postLogin(obj: IObjLogin) {
        return await $api.post<IResponseLogin>(`/api/auth/login`, obj);
    }
}