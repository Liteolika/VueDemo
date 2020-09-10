import axios, { AxiosInstance, AxiosResponse } from "axios";

declare module "axios" {
    interface AxiosResponse<T = any> extends Promise<T> { }
}

export interface IHttpClient {
    get<TOut>(url: string): Promise<TOut>;
    post<TIn, TOut>(url: string, data: TIn): Promise<TOut>;
    put<TIn, TOut>(url: string, data: TIn): Promise<TOut>;
    delete(url: string, params?: any): Promise<void>;
}

export default abstract class HttpClient implements IHttpClient {
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