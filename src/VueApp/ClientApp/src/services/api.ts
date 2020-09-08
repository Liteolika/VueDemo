import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios";
import authService from "./auth";
import { IEditorData, IWeatherForecast } from "@/models";

declare module "axios" {
    interface AxiosResponse<T = any> extends Promise<T> { }
}

export interface IHttpClient {
    get<TOut>(url: string): Promise<TOut>;
    post<TIn, TOut>(url: string, data: TIn): Promise<TOut>;
    put<TIn, TOut>(url: string, data: TIn): Promise<TOut>;
    delete(url: string, params?: any): Promise<void>;
}

abstract class HttpClient implements IHttpClient {
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

    get = async <TOut>(url: string, params: any = null): Promise<TOut> => {
        return await this.instance.get(url, { params: params });
    }

    post = async <TIn, TOut>(url: string, data: TIn): Promise<TOut> => {
        return await this.instance.post(url, data);
    }

    put = async <TIn, TOut>(url: string, data: TIn): Promise<TOut> => {
        return await this.instance.put(url, data);
    }

    delete = async (url: string, params?: any): Promise<void> => {
        return await this.instance.delete(url, { params: params });
    }
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
