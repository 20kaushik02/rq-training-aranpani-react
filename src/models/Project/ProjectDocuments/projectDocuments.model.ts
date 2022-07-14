import {serializable, alias, primitive} from 'serializr';

export class ProjectDocuments {
    @serializable(alias('id', primitive()))
    id: string = "";

    @serializable(alias('document_url', primitive()))
    documentUrl: string = "";
}