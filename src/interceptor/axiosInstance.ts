import axios from 'axios';
import { NotificationTypes } from '../enums/notificationTypes';
import { ApiRoutes } from "../routes/routeConstants/apiRoutes";
import Notification from '../shared/components/Notification';

export const getHeaders = (): any => {
    let headers, authHeaders;

    if (localStorage.getItem('authHeaders')) {
        authHeaders = JSON.parse(localStorage.getItem('authHeaders') || '');
    }
    headers = {
        'Content-Type': 'application/json',
    };

    if (authHeaders) {
        headers = {
            ...headers,
            'access-token': authHeaders['access-token'],
            'token-type': 'Bearer',
            'client': authHeaders['client'],
            'uid': authHeaders['uid'],
        }
    }
    return headers;
};

const axiosInstance = axios.create({
    baseURL: ApiRoutes.BASE_URL,
    timeout: 20000,
});

axiosInstance.interceptors.request.use((config) => {
    config.headers = getHeaders();
    return config;
});

axiosInstance.interceptors.response.use(
    (response): any => {
        return {
            data: response.data,
            message: response.statusText,
            status: response.status,
            headers: response.headers,
        }
    },
    (error) => {
        const { response } = error;
        if (response.status === 401) {
            localStorage.clear()
        }
        Notification({
            message: (
                typeof response.data === "string" ?
                    response.data.errors
                    : response.data.error
            ) || "Something went wrong",
            description: "",
            type: NotificationTypes.ERROR,
        });
        return Promise.reject(error);
    }
);

export default axiosInstance;
