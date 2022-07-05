import { AxiosResponseHeaders } from "axios";
import { User } from "../../../models/User/user.model";

export type Name = "user" |
    "authHeaders";

type Values = AxiosResponseHeaders | User;

const sensitive: Name[] = ["user", "authHeaders"];

export default class LocalStorage {
    static getItem(name: Name) {
        const value = localStorage.getItem(name);
        if (value) {
            return JSON.parse(value);
        }
        return undefined;
    }

    static setItem(name: Name, value: Values) {
        localStorage.setItem(name, JSON.stringify(value));
    }

    static removeItem(name: Name) {
        localStorage.removeItem(name);
    }

    static clear() {
        localStorage.clear();
    }

    static clearSenstive() {
        sensitive.forEach((key) => {
            this.removeItem(key);
        });
    }
}
