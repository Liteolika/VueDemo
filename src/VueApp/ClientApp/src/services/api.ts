import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios";
import authService from "./auth";
import { IEditorData, IWeatherForecast } from "@/models";

declare module "axios" {
    interface AxiosResponse<T = any> extends Promise<T> { }
}

abstract class HttpClient {
    protected readonly instance: AxiosInstance;

    public constructor(baseURL: string) {
        this.instance = axios.create({
            baseURL: baseURL,
            headers: { "Content-Type": "application/json" }
        });
        this.initializeResponseInterceptor();
    }

    private initializeResponseInterceptor = () => {
        this.instance.interceptors.response.use(
            this.handleResponse,
            this.handleError,
        );
    };

    private handleResponse = ({ data }: AxiosResponse) => data;

    protected handleError = (error: any) => Promise.reject(error);

}

export interface IAppApi {
    getSecretMessage(): Promise<string>;
    postEditorContent(content: string): Promise<IEditorData>;
    loadForecasts(): Promise<IWeatherForecast[]>;
}

export class AppApi extends HttpClient implements IAppApi {
    public constructor() {
        super("https://localhost:5003/api/");
        this.initializeRequestInterceptor();
    }

    private initializeRequestInterceptor = () => {
        this.instance.interceptors.request.use(
            this.handleRequest,
            this.handleError,
        );
    }

    private handleRequest = async (config: AxiosRequestConfig) => {
        const accessToken = await authService.getAccessToken();
        if (accessToken !== "" || accessToken !== undefined) {
            config.headers.common.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    }

    getSecretMessage = async (): Promise<string> => {
        const response = await this.instance.get("secretMessage");
        return response.data as string;
    };

    postEditorContent = async (content: string): Promise<IEditorData> => {
        const data = {
            Content: content
        };
        return this.instance.post("editor", JSON.stringify(data));
    }

    loadForecasts = async (): Promise<IWeatherForecast[]> => {
        return this.instance.get("weatherforecast");
    }

}

export default () => new AppApi();


//export function initAxios() {

//    axios.interceptors.request.use(async (config) => {
//        console.log("axios.interceptors.request.use");
//        const accessToken = await authService.getAccessToken();
//        if (accessToken !== "" || accessToken !== undefined) {
//            config.headers.common.Authorization = `Bearer ${accessToken}`;
//        }
//        return config;
//    });
//}

//const serviceUrl = "https://localhost:5003";

//const http = axios.create({
//    baseURL: `${serviceUrl}/api`,
//    headers: { "Content-Type": "application/json" }
//});

//export function getSecretMessage() {
//    return axios("http://localhost:7000/api/secretMessage",
//        {
//            method: "get"
//        });
//}

//export async function postEditorContent(content: string): Promise<IEditorData> {

//    const data = {
//        Content: content
//    };

//    const response = await http.post("editor", JSON.stringify(data));
//    return response.data;

//}
