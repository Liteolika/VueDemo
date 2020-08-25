import axios from "axios"
import authService from "./auth"

export function initAxios() {

    axios.interceptors.request.use(async (config) => {
        console.log("axios.interceptors.request.use");
        const accessToken = await authService.getAccessToken();
        if (accessToken !== "" || accessToken !== undefined) {
            config.headers.common.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    });
}



export function getSecretMessage() {
    return axios("http://localhost:7000/api/secretMessage",
        {
            method: "get"
        });
}

export function postContent(content: string) {
    console.log("posting content:", content);
    return axios("https://localhost:5003/api/editor",
        {
            method: "post",
            data: { "Content": content }
        });
}