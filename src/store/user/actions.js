import apolloClient from '../../boot/apollo-client';
import gql from "graphql-tag";

export function createNewGroup({
  commit
}, {
  name,
  creator
}) {
  return new Promise(function (resolve, reject) {
    apolloClient.mutate({
      mutation: gql ` mutation createNewGroup($groupName:String!,$creator:String!){
		createNewGroup(groupName:$groupName, creator:$creator) {
			identifyCode
			name
			createdBy {
				id
				name
			}
			members {
				id
				name
				headPic {
					name
				}
			}
		}
	}
	`,
      variables: {
        groupName: name,
        creator: creator
      }
    }).then((res) => {
      let newGroup = res.data.createNewGroup;
      commit('addToGroups', newGroup);
      resolve(newGroup)
    }).catch(reject);
  })
}

export function joinGroup({
  commit
}, {
  groupId,
  joiner
}) {
  return new Promise(function (resolve, reject) {
    apolloClient.mutate({
      mutation: gql ` mutation joinGroup($groupIdentify:String!,$joiner:String!){
		joinGroup(groupIdentify:$groupIdentify, joiner:$joiner) {
			identifyCode
			name
			createdBy {
				id
				name
			}
			members {
				id
				name
				headPic {
					name
				}
			}
		}
	}
	`,
      variables: {
        groupIdentify: groupId,
        joiner: joiner
      }
    }).then((res) => {
      let newGroup = res.data.joinGroup;
      commit('addToGroups', newGroup);
      resolve(newGroup)
    }).catch(err => {
      reject(err);
    })
  });
}

export function loadUserGroupInfo({
  commit
}, userId) {
  return new Promise(function (resolve, reject) {
    apolloClient.query({
        query: gql `
						query getUserGroups($userId: String!) {
							getUserGroups(userId: $userId) {
								id
								name
								identifyCode
								createdBy {
									id
									name
									headPic {
										name
									}
								}
								members {
									id
									name
									headPic {
										name
									}
								}
							}
						}
					`,
        variables: {
          userId: userId
        },
        fetchPolicy: "network-only"
      })
      .then(res => {
        let groups = res.data.getUserGroups;
        console.log("user groups", res.data.getUserGroups);
        commit("setGroups", groups);
        resolve(res);
      })
  });
}
