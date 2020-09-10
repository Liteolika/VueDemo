import { AxiosRequestConfig } from "axios";
import HttpClient from "./HttpClient";

import { IEditorData, IWeatherForecast } from "@/models";
import authService from "./auth";


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

    getSecretMessage = async (): Promise<string> =>
        this.get<string>("secretMessage");

    postEditorContent = async (content: string): Promise<IEditorData> =>
        this.post("editor", JSON.stringify({
            Content: content
        }));

    loadForecasts = async (): Promise<IWeatherForecast[]> =>
        this.get<IWeatherForecast[]>("weatherforecast");
}

export default () => new AppApi();
