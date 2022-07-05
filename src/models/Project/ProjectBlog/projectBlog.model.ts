import { ProjectBlogAttachment } from '../ProjectBlogAttachment/projectBlogAttachment.model';

import { serializable, alias, object, list, primitive } from 'serializr';

export class ProjectBlog {
	@serializable(alias('id', primitive()))
	id?: number;

	@serializable(alias('content_english', primitive()))
	contentEnglish?: string;

	@serializable(alias('content_tamil', primitive()))
	contentTamil?: string;

	@serializable(alias('project_blog_attachments', list(object(ProjectBlogAttachment))))
	projectBlogAttachments?: ProjectBlogAttachment[];

	@serializable(alias('updated_at', primitive()))
	updatedAt?: string;

	@serializable(alias('created_at', primitive()))
	createdAt?: string;
}