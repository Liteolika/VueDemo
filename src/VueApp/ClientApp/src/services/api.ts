import axios from "axios"
import AuthService from "./auth"

export function initAxios() {
    // Add the bearer token to all outgoing requests
    // Taken from here (https://github.com/axios/axios/issues/754) since I couldn't figure it out myself...
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