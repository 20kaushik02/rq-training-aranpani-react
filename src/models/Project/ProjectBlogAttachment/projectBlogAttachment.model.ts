import { serializable, alias, primitive } from 'serializr';

export class ProjectBlogAttachment {
	@serializable(alias('id', primitive()))
	id?: number;

	@serializable(alias('image_url', primitive()))
	imageUrl?: string;

}