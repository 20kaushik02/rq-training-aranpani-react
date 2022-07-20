
import { State } from '../State/state.model';

import { Country } from '../Country/country.model';

import { City } from '../City/city.model';

import { DonorHomeProject } from '../DonorHomeProject/donorHomeProject.model';

import { ProjectSubscriber } from '../ProjectSubscriber/projectSubscriber.model';

import { Group } from '../Group/group.model';

import { DonorSubscriptionScheme } from '../DonorSubscriptionScheme/donorSubscriptionScheme.model';

import { Representative } from '../Representative/representative.model';

import { serializable, alias, object, list, primitive } from 'serializr';

export class Donor {

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

	@serializable(alias('representative', object(Representative)))
	representative?: Representative;

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
	totalContributions?: string;

	@serializable(alias('total_contributions_current_yr', primitive()))
	totalContributionsCurrentYr?: number;

	@serializable(alias('pan', primitive()))
	pan?: string;

	@serializable(alias('paid_status', primitive()))
	paidStatus?: string;

	@serializable(alias('paid_status_for_donor', primitive()))
	paidStatusForDonor?: string;

	@serializable(alias('identification_card_value', primitive()))
	identificationCardValue?: string;

	@serializable(alias('age', primitive()))
	age?: string;

	@serializable(alias('gender', primitive()))
	gender?: string;

	@serializable(alias('identification_card', primitive()))
	identificationCard?: string;

	@serializable(alias('group', object(Group)))
	group?: Group;

	@serializable(alias('project_subscribers', list(object(ProjectSubscriber))))
	projectSubscribers?: ProjectSubscriber[] = [];

	@serializable(alias('donor_home_projects', list(object(DonorHomeProject))))
	donorHomeProjects?: DonorHomeProject[] = [];

	@serializable(alias('city', object(City)))
	city?: City;

	@serializable(alias('class_name', primitive()))
	className?: string;

	@serializable(alias('country', object(Country)))
	country?: Country;

	@serializable(alias('donor_type', primitive()))
	donorType?: string;

	@serializable(alias('head_reg_number', primitive()))
	headRegNumber?: string;

	@serializable(alias('state', object(State)))
	state?: State;

}