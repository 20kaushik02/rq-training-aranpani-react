
import { serializable, alias, object, list, primitive } from 'serializr';

export class DonorSubscriptionScheme {

    @serializable(alias('donor_id', primitive()))
    donorId?: number;

    @serializable(alias('id', primitive()))
    id?: number;

    @serializable(alias('pending_for_current_yr', primitive()))
    pendingForCurrentYr?: string;

    @serializable(alias('subscription_scheme_amount', primitive()))
    subscriptionSchemeAmount?: number;

    @serializable(alias('subscription_scheme_id', primitive()))
    subscriptionSchemeId?: number;

    @serializable(alias('subscription_scheme_name', primitive()))
    subscriptionSchemeName?: string;

    @serializable(alias('total_contributions', primitive()))
    totalContributions?: number;

    @serializable(alias('total_contributions_current_yr', primitive()))
    totalContributionsCurrentYr?: number;

}