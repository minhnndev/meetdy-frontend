import qs from "query-string";
import axios, { type AxiosError, type AxiosResponse } from "axios";

import { isSuccess } from "@/utils/httpUtils";
import { API_URL } from "@/constants/api.constant";

declare module "axios" {
    export interface AxiosRequestConfig {
        metadata?: {
            startTime?: number | Date | string;
        };
    }
}

const _httpsAxios = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,
    paramsSerializer: (params) => qs.stringify(params),
});

_httpsAxios.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        config.metadata = { startTime: new Date().getTime() };
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

_httpsAxios.interceptors.response.use(
    (response) => {
        const endTime = new Date().getTime();
        const startTime = Number(response.config.metadata?.startTime);
        const duration = endTime - startTime;
        console.log(
            `[${response.config.url}]: ${
                duration < 500
                    ? "\x1b[32m"
                    : duration > 500 && duration < 1000
                      ? "\x1b[33m"
                      : "\x1b[31m"
            }${duration} ms\x1b[0m`
        );
        if (isSuccess(response.status)) {
            return response.data;
        }
        return response;
    },
    async (error: AxiosError) => {
        // console.log('error:', error.response.data);
        const url = error.response.config.baseURL + error.response.config.url;
        console.log(`[${url}]`, error.response.status);
        const errorResponse = error.response as AxiosResponse<{
            errors: { code: string; message: string; name: string }[];
        }>;
        const errorData = errorResponse.data.errors[0];
        const { code: errorCode, message: errorMessage, name } = errorData;

        console.log(errorCode);

        return Promise.reject({
            errorCode,
            errorMessage,
            name,
            status: error.response.status,
        });
    }
);

export default _httpsAxios;
