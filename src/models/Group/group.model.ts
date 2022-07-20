
import { GroupHead } from '../GroupHead/groupHead.model';

import { Member } from '../Member/member.model';

import { serializable, alias, object, list, primitive } from 'serializr';

export class Group {

	@serializable(alias('id', primitive()))
	id?: number;

	@serializable(alias('members', list(object(Member))))
	members?: Member[] = [];

	@serializable(alias('group_head', object(GroupHead)))
	groupHead?: GroupHead;

}