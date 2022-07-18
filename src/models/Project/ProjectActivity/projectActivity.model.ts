import {serializable, alias, primitive, list, object} from 'serializr';
import {ProjectAttachment} from "../ProjectAttachment/projectAttachment.model";

export class ProjectActivityModel {

    @serializable(alias('id', primitive()))
    id?: number;

    @serializable(alias('content_english', primitive()))
    contentEnglish?: string;

    @serializable(alias('content_tamil', primitive()))
    contentTamil?: string;

    @serializable(alias('project_blog_attachments', list(object(ProjectAttachment))))
    attachments?: ProjectAttachment[] = [];

    @serializable(alias('project_blog_attachment_ids', list(primitive())))
    attachmentIds?: string[] = [];

    @serializable(alias('created_at', primitive()))
    createdAt?: string;

}