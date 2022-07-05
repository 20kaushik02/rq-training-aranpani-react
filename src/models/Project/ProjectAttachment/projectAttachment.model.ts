import { serializable, alias, primitive } from 'serializr';

export class ProjectAttachment {
	@serializable(alias('id', primitive()))
	id?: number;

	@serializable(alias('image_url', primitive()))
	imageUrl?: string;

}