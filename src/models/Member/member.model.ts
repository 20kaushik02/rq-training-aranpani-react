
import { serializable, alias, object, list, primitive } from 'serializr';

export class Member {

	@serializable(alias('id', primitive()))
	id?: number;

	@serializable(alias('group_id', primitive()))
	groupId?: number;

	@serializable(alias('user_type', primitive()))
	userType?: string;

	@serializable(alias('user_id', primitive()))
	userId?: number;

	@serializable(alias('username', primitive()))
	username?: string;

	@serializable(alias('mobile_number', primitive()))
	mobileNumber?: string;

	@serializable(alias('isd_code', primitive()))
	isdCode?: string;

	@serializable(alias('role', primitive()))
	role?: string;

	@serializable(alias('reg_number', primitive()))
	regNumber?: string;

}