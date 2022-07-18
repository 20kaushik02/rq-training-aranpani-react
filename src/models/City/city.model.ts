
import { serializable, alias, object, list, primitive } from 'serializr';

export class City {

	@serializable(alias('id', primitive()))
	id?: number;

	@serializable(alias('name', primitive()))
	name?: string;

	@serializable(alias('state_id', primitive()))
	stateId?: number;

}