
import {serializable, alias, object, list, primitive} from 'serializr';

export class DonorHomeProject { 

	@serializable(alias('id', primitive()))
	id?: number;

	@serializable(alias('project_id', primitive()))
	projectId?: number;

	@serializable(alias('donor_id', primitive()))
	donorId?: number;

}