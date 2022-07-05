import { serializable, alias, primitive, list, object } from 'serializr';

class UserRole {
    @serializable(alias('id', primitive()))
    id?: number;

    @serializable(alias('name', primitive()))
    name?: string;
}

export class User {
    @serializable(alias('id', primitive()))
    id?: number;

    @serializable(alias('uid', primitive()))
    uid?: string;

    @serializable(alias('mobile_number', primitive()))
    mobileNumber?: string;

    @serializable(alias('provider', primitive()))
    provider?: string;

    @serializable(alias('reg_number', primitive()))
    regNumber?: string;

    @serializable(alias('is_deleted', primitive()))
    isDeleted?: string;

    @serializable(alias('status', primitive()))
    status?: boolean;

    @serializable(alias('isd_code', primitive()))
    isdCode?: string;

    @serializable(alias('email', primitive()))
    email?: string;

    @serializable(alias('username', primitive()))
    username?: string;

    @serializable(alias('role_id', primitive()))
    roleId?: number;

    @serializable(alias('password', primitive()))
    password?: string;

    @serializable(alias('confirm_password', primitive()))
    confirmPassword?: string;

    @serializable(alias('access_permissions', list(primitive())))
    accessPermissions?: string[];

    @serializable(alias('role', object(UserRole)))
    role?: UserRole;

    @serializable(alias('permissions', list(primitive())))
    permissions?: string[] = [];
}
