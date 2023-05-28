import axios, { AxiosError, AxiosResponse } from "axios";

const ApiClient = axios.create({
    baseURL: import.meta.env.VITE_API as string,
    headers: {
        "Content-Type": "application/json",
    },
});

// Add a request interceptor
ApiClient.interceptors.request.use(
    (config) => {
        // Do something before request is sent

        // if (token) {
        //     config.headers["Authorization"] = `Bearer ${token}`;
        // }

        return config;
    },
    (error) => {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
ApiClient.interceptors.response.use(
    async (response: AxiosResponse) => {
        const template = {
            success: response.data?.data !== null,
            data: response.data?.data,
            code: response.data?.errors?.[0]?.extensions?.code,
            status: response.data?.errors?.[0]?.extensions?.status,
            error: response.data?.errors?.[0]?.message,
            // errors: response.data?.errors?.[0]?.extensions?.errors,
        };

        return { ...response, data: template };
    },
    async (error: AxiosError) => {
        if (error.response?.status === 401) {
            // Remove the token from the  cookie
        }

        return {
            ...error,
            data: {
                success: false,
                data: error.cause,
                code: error?.response?.status,
            },
        };
    }
);

export default ApiClient;
