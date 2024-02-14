import axios from "axios";
import {HOST} from "@/js/constants";


// const HOST = "http://localhost:9005";

const $api = axios.create({
    withCredentials: true,
    baseURL: HOST,
});

$api.interceptors.request.use((config) => {
    if (localStorage?.getItem("accessToken") !== null) {
        config.headers.Authorization = `Bearer_${localStorage.getItem(
            "accessToken"
        )}`;
    }
    return config;
});

$api.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;
        console.log(error);
        if (error.response.status === 401) {
            localStorage.clear();
            console.log("Не авторизован");
        }
    }
);

export default $api;

