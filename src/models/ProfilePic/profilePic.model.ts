
import {serializable, alias, object, list, primitive} from 'serializr';

export class ProfilePic { 

	@serializable(alias('url', primitive()))
	url?: string;

}