
import { serializable, alias, object, list, primitive } from 'serializr';
import { City } from '../City/city.model';
import { State } from '../State/state.model';
import { Country } from '../Country/country.model';
import { DonorSubscriptionScheme } from '../DonorSubscriptionScheme/donorSubscriptionScheme.model';

export class AreaRepresentative {

	@serializable(alias('address_line1', primitive()))
	addressLine1?: string;

	@serializable(alias('address_line2', primitive()))
	addressLine2?: string;

	@serializable(alias('audit_status', primitive()))
	auditStatus?: boolean;

	@serializable(alias('donors_count', primitive()))
	donorsCount?: number;

	@serializable(alias('email', primitive()))
	email?: string;

	@serializable(alias('guardian_name', primitive()))
	guardianName?: string;

	@serializable(alias('id', primitive()))
	id?: number;

	@serializable(alias('isd_code', primitive()))
	isdCode?: string;

	@serializable(alias('lat', primitive()))
	lat?: number;

	@serializable(alias('long', primitive()))
	long?: number;

	@serializable(alias('mobile_number', primitive()))
	mobileNumber?: string;

	@serializable(alias('pincode', primitive()))
	pincode?: string;

	@serializable(alias('profile_pic_url', primitive()))
	profilePicUrl?: string;

	@serializable(alias('reg_number', primitive()))
	regNumber?: string;

	@serializable(alias('role_id', primitive()))
	roleId?: number;

	@serializable(alias('role_name', primitive()))
	roleName?: string;

	@serializable(alias('status', primitive()))
	status?: boolean;

	@serializable(alias('username', primitive()))
	username?: string;

	@serializable(alias('city', object(City)))
	city?: City;

	@serializable(alias('state', object(State)))
	state?: State;

	@serializable(alias('country', object(Country)))
	country?: Country;

	@serializable(alias('donor_subscription_scheme', object(DonorSubscriptionScheme)))
	donorSubscriptionScheme?: DonorSubscriptionScheme;
}