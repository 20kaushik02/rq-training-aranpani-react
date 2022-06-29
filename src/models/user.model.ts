import { serializable, alias, primitive } from 'serializr';

export class User {
    @serializable(alias('email', primitive()))
    email?: string;

    @serializable(alias('password', primitive()))
    password?: string;

    @serializable(alias('id', primitive()))
    id?: number;

    @serializable(alias('mobileNumber', primitive()))
    mobileNumber?: number;

    @serializable(alias('regNumber', primitive()))
    regNumber?: number;

    @serializable(alias('uid', primitive()))
    uid?: string;
    
    @serializable(alias('provider', primitive()))
    provider?: string;

    @serializable(alias('username', primitive()))
    username?: string;

    @serializable(alias('status', primitive()))
    status?: boolean;
}
