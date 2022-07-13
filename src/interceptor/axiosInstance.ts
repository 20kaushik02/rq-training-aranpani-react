import axios from 'axios';
import { NotificationTypes } from '../enums/notificationTypes';
import { ApiRoutes } from "../routes/routeConstants/apiRoutes";
import LocalStorage from '../shared/components/LocalStorage';
import Notification from '../shared/components/Notification';
import { objectCoalesce } from '../shared/utils/nullCoalesce';
import { sleep } from '../shared/utils/sleep';

export const getHeaders = (): any => {
    let headers;
    const authHeaders = LocalStorage.getItem("authHeaders");

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
            data: response?.data,
            message: response?.statusText,
            status: response?.status,
            headers: response?.headers,
        }
    },
    async (error) => {
        const { response } = error;
        let errMsg: any = objectCoalesce(response?.data, ["errors", "error"]);
        if (Array.isArray(errMsg)) {
            errMsg = errMsg[0];
        }
        Notification({
            message: (errMsg) || "Something went wrong",
            description: "",
            type: NotificationTypes.ERROR,
        });

        await sleep(500);

        if (response?.status === 401) {
            LocalStorage.clearSensitive();
            window.location.reload();
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
