import {
  uniqBy
} from 'lodash';
const STATIC_URL  = '/static/'
export function currentUserHeadPic(state) {
  console.log('head pic', state.headPic)
  if (state.headPic && state.headPic.name) {
    return process.env.STATIC_URL + STATIC_URL  + state.headPic.name;
  }
  return '/statics/DefaultHead.png';
}

export function currentUserAvatar(state) {
  console.log('avatar pic', state.avatar)
  if (state.avatar && state.avatar.name) {
    return process.env.STATIC_URL + STATIC_URL + state.avatar.name;
  }else {
	return currentUserHeadPic(state)
  }
  
}
export function involvedGroups(state) {
  return state.belongToGroups
}

export function allSelectableMembers(state) {
  let members = [];
  state.belongToGroups.forEach(group => {
    members = members.concat(group.members);
  })
  let uniqueMembers = uniqBy(members, 'id');
  if (uniqueMembers.length == 0) {
    return [state]
  }
  return uniqueMembers;
}
