
import { Representative } from '../Representative/representative.model';

import { serializable, alias, object, list, primitive } from 'serializr';

export class GroupHead {

	@serializable(alias('id', primitive()))
	id?: number;

	@serializable(alias('mobile_number', primitive()))
	mobileNumber?: string;

	@serializable(alias('isd_code', primitive()))
	isdCode?: string;

	@serializable(alias('username', primitive()))
	username?: string;

	@serializable(alias('profile_pic_url', primitive()))
	profilePicUrl?: string;

	@serializable(alias('status', primitive()))
	status?: string;

	@serializable(alias('representative', object(Representative)))
	representative?: Representative;

}