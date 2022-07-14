import { serializable, alias, object, list, primitive, custom } from 'serializr';
import { ProjectBlog } from './ProjectBlog/projectBlog.model';
import { ProjectAttachment } from './ProjectAttachment/projectAttachment.model';
import { ProjectDocuments } from './ProjectDocuments/projectDocuments.model';

export class Project {
	@serializable(alias('id', primitive()))
	id?: number;

	@serializable(alias('status', primitive()))
	status?: string;

	@serializable(alias('reg_number', primitive()))
	regNumber?: string;

	@serializable(alias('name', primitive()))
	name?: string;

	@serializable(alias('start_date', primitive()))
	startDate?: string;

	@serializable(alias('end_date', primitive()))
	endDate?: string;

	@serializable(alias('incharge_name', primitive()))
	inchargeName?: string;

	@serializable(alias('incharge_mobile_number', primitive()))
	inchargeMobileNumber?: string;

	@serializable(alias('expensed_amt', primitive()))
	expensedAmt?: number;

	@serializable(alias('estimated_amt', primitive()))
	estimatedAmt?: number;

	@serializable(alias('temple_name_tamil', primitive()))
	templeNameTamil?: string;

	@serializable(alias('temple_incharge_name_tamil', primitive()))
	templeInchargeNameTamil?: string;

	@serializable(alias('location', primitive()))
	location?: string;

	@serializable(alias('location_name_tamil', primitive()))
	locationNameTamil?: string;

	@serializable(alias('lat', primitive()))
	lat?: number;

	@serializable(alias('long', primitive()))
	long?: number;

	@serializable(alias('completion', primitive()))
	completion?: number;

	@serializable(alias('project_attachment_url', primitive()))
	projectAttachmentUrl?: string;

	@serializable(alias('updated_at', primitive()))
	updatedAt?: string;

	@serializable(alias('created_at', primitive()))
	createdAt?: string;

	@serializable(alias('project_attachments', list(object(ProjectAttachment))))
	projectAttachments?: ProjectAttachment[];

	@serializable(alias('project_blogs', list(object(ProjectBlog))))
	projectBlogs?: ProjectBlog[];

	@serializable(alias('project_documents', list(object(ProjectDocuments))))
	projectDocuments?: ProjectDocuments[] = [];

	@serializable(alias('reason', primitive()))
	reason?: string;

	@serializable(alias('project_id', primitive()))
	projectId?: number;

	@serializable(alias('image', custom(
		(file) => file,
		() => { }
	)))
	image?: File;

	@serializable(alias('document', custom(
		(file) => file,
		() => { }
	)))
	document?: File;
}