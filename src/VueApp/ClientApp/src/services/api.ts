import axios from "axios"
import AuthService from "./auth"

export function initAxios() {
    axios.interceptors.request.use(async (config) => {
        const authService = new AuthService();
        const accessToken = await authService.getAccessToken();
        config.headers.common.Authorization = `Bearer ${accessToken}`;
        return config;
    });
}

export function getSecretMessage() {
    return axios("http://localhost:7000/api/secretMessage",
        {
            method: "get"
        });
}