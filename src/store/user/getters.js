
import {uniqBy} from 'lodash';
export function currentUserHeadPic(state) {
	if(state.headPic){
		return process.env.BASE_URL + '/static/' + state.headPic.name;
	}
	return '/statics/DefaultHead.png';
}

export function involvedGroups(state){
	return state.belongToGroups
}

export function allSelectableMembers(state){
	let members = [];
	state.belongToGroups.forEach(group=>{
		members = members.concat(group.members);
	})
	return uniqBy(members,'id');
}