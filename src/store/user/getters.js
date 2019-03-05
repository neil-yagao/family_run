
import {uniqBy} from 'lodash';
export function currentUserHeadPic(state) {
	console.log('head pic', state.headPic)
	if(state.headPic && state.headPic.name){
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
	let uniqueMembers = uniqBy(members,'id');
	if(uniqueMembers.length == 0){
		return [state]
	}
	return uniqueMembers;
}