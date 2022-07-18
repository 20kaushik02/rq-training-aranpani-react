
import {serializable, alias, object, list, primitive} from 'serializr';

export class State { 

	@serializable(alias('id', primitive()))
	id?: number;

	@serializable(alias('name', primitive()))
	name?: string;

	@serializable(alias('country_id', primitive()))
	countryId?: number;

}