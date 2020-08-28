import axios from "axios";
import authService from "./auth";
import { IEditorData } from "@/models";

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

const serviceUrl = "https://localhost:5003";

const http = axios.create({
    baseURL: `${serviceUrl}/api`,
    headers: { "Content-Type": "application/json" }
});

export function getSecretMessage() {
    return axios("http://localhost:7000/api/secretMessage",
        {
            method: "get"
        });
}

export async function postEditorContent(content: string): Promise<IEditorData> {

    const data = {
        Content: content
    };

    const response = await http.post("editor", JSON.stringify(data));
    return response.data;

}
