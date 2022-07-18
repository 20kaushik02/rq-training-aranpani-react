
import { serializable, alias, object, list, primitive } from 'serializr';

export class Country {

	@serializable(alias('id', primitive()))
	id?: number;

	@serializable(alias('name', primitive()))
	name?: string;

}