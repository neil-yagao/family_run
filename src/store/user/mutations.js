export function login(state, user) {
  state.hasLogin = true;
  state.id = user.id;
  state.name = user.name;
  state.headPic = user.headPic;
  state.avatar = user.avatar;
  if (localStorage) {
    localStorage.setItem('userId', user.id);
    localStorage.setItem('hasLogin', true);
  }
}

export function setHeadPic(state, headPic) {
  if (!state.headPic) {
    state.headPic = {}
  }
  state.headPic.name = headPic.name;
  state.headPic.id = headPic.id;
}

export function setAvatar(state, avatar) {
  if (!state.avatar) {
    state.avatar = {}
  }
  state.avatar.name = avatar.name;
  state.avatar.id = avatar.id;
}

export function addToGroups(state, group) {
  state.belongToGroups.push(group);
}

export function setGroups(state, groups) {
  state.belongToGroups = groups;
}

export function logout(state) {
  state.hasLogin = false;
  state.id = '';
  state.name = '';
  state.headPic = {};
  state.belongToGroups = [];
  localStorage.setItem('userId', '');
  localStorage.setItem('hasLogin', false);
}
