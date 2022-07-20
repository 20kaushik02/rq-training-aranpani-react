
import { ProfilePic } from '../ProfilePic/profilePic.model';

import { DonorHomeProject } from '../DonorHomeProject/donorHomeProject.model';

import { ProjectSubscriber } from '../ProjectSubscriber/projectSubscriber.model';

import { Group } from '../Group/group.model';

import { DonorSubscriptionScheme } from '../DonorSubscriptionScheme/donorSubscriptionScheme.model';

import { serializable, alias, object, list, primitive } from 'serializr';

export class Representative {

	@serializable(alias('id', primitive()))
	id?: number;

	@serializable(alias('mobile_number', primitive()))
	mobileNumber?: string;

	@serializable(alias('isd_code', primitive()))
	isdCode?: string;

	@serializable(alias('username', primitive()))
	username?: string;

	@serializable(alias('role_id', primitive()))
	roleId?: number;

	@serializable(alias('role_name', primitive()))
	roleName?: string;

	@serializable(alias('guardian_name', primitive()))
	guardianName?: string;

	@serializable(alias('email', primitive()))
	email?: string;

	@serializable(alias('address_line1', primitive()))
	addressLine1?: string;

	@serializable(alias('address_line2', primitive()))
	addressLine2?: string;

	@serializable(alias('lat', primitive()))
	lat?: number;

	@serializable(alias('long', primitive()))
	long?: number;

	@serializable(alias('pincode', primitive()))
	pincode?: string;

	@serializable(alias('reg_number', primitive()))
	regNumber?: string;

	@serializable(alias('profile_pic_url', primitive()))
	profilePicUrl?: string;

	@serializable(alias('status', primitive()))
	status?: string;

	@serializable(alias('group_head', primitive()))
	groupHead?: string;

	@serializable(alias('group_subscription_scheme', primitive()))
	groupSubscriptionScheme?: string;

	@serializable(alias('member_group_details', primitive()))
	memberGroupDetails?: string;

	@serializable(alias('donor_subscription_scheme', object(DonorSubscriptionScheme)))
	donorSubscriptionScheme?: DonorSubscriptionScheme;

	@serializable(alias('payment_details', primitive()))
	paymentDetails?: string;

	@serializable(alias('profile_completion_status', primitive()))
	profileCompletionStatus?: string;

	@serializable(alias('head', primitive()))
	head?: string;

	@serializable(alias('total_contributions', primitive()))
	totalContributions?: number;

	@serializable(alias('total_contributions_current_yr', primitive()))
	totalContributionsCurrentYr?: number;


	@serializable(alias('otp', primitive()))
	otp?: string;

	@serializable(alias('expires_at', primitive()))
	expiresAt?: string;

	@serializable(alias('created_at', primitive()))
	createdAt?: string;

	@serializable(alias('updated_at', primitive()))
	updatedAt?: string;

	@serializable(alias('provider', primitive()))
	provider?: string;

	@serializable(alias('uid', primitive()))
	uid?: string;

	@serializable(alias('profile_pic', object(ProfilePic)))
	profilePic?: ProfilePic;

	@serializable(alias('district', primitive()))
	district?: string;

	@serializable(alias('representative_id', primitive()))
	representativeId?: number;

	@serializable(alias('deleted_at', primitive()))
	deletedAt?: string;

	@serializable(alias('country_id', primitive()))
	countryId?: number;

	@serializable(alias('state_id', primitive()))
	stateId?: string;

	@serializable(alias('city_id', primitive()))
	cityId?: string;

	@serializable(alias('pan', primitive()))
	pan?: string;

	@serializable(alias('gender_id', primitive()))
	genderId?: string;

	@serializable(alias('identification_card_id', primitive()))
	identificationCardId?: string;

	@serializable(alias('identification_card_value', primitive()))
	identificationCardValue?: string;

	@serializable(alias('age', primitive()))
	age?: string;

	@serializable(alias('is_legacy_data', primitive()))
	isLegacyData?: string;

	@serializable(alias('project_subscribers', list(object(ProjectSubscriber))))
	projectSubscribers?: ProjectSubscriber[] = [];

	@serializable(alias('donor_home_projects', list(object(DonorHomeProject))))
	donorHomeProjects?: DonorHomeProject[] = [];
}