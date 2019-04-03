<template>
	<div class="row">
		<q-icon
		 name="mdi-account-arrow-right-outline"
		 class="col-1 tag-input-icon "
		/>
		<div class="col tag-input-area">
			<q-chip
			 dense
			 v-for="member in selectedUsers"
			 :key="member.id"
			 :removable="!readOnly"
			 @remove="removeUser(member)"
			>
				<q-avatar>
					<img :src="member.avatar&&member.avatar.name?baseUrl + '/static/' + member.avatar.name:'/statics/DefaultHead.png'">
				</q-avatar>
				{{member.name}}
			</q-chip>
		</div>
		<q-icon
		 name="search"
		 v-if="!readOnly"
		 @click="userSelecting = true"
		 class="col-1 tag-input-icon"
		/>
		<q-dialog v-model="userSelecting">
			<q-card class="full-width full-height ">
				<q-card-section style="overflow-y:auto;max-height:90vh">
					<q-tree
					 class="col-12 col-sm-6"
					 :nodes="groupedUsers"
					 node-key="id"
					 default-expand-all
					 tick-strategy="leaf"
					 :ticked.sync="tickedUser"
					/>
				</q-card-section>
				<q-card-actions class="absolute-bottom">
					<q-btn
					 color="warning"
					 flat
					 push
					 label="返回"
					 v-close-dialog
					/>
					<q-space />
					<q-btn
					 color="primary"
					 label="确定"
					 @click="emitSelectedUser()"
					/>
				</q-card-actions>
			</q-card>
		</q-dialog>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
	name: "UserSelection",
	data() {
		return {
			baseUrl: process.env.STATIC_URL,
			tickedUser: this.value,
			userSelecting: false
		};
	},
	methods: {
		removeUser(member) {
			this.tickedUser = this.tickedUser.filter(function(t) {
				return t !== member.id;
			});
		},
		emitSelectedUser() {
			this.$emit("input", this.tickedUser);
			this.userSelecting = false;
		}
	},
	computed: {
		...mapGetters(["involvedGroups", "allSelectableMembers"]),
		groupedUsers() {
			let treedUsers = [];
			let root = {
				label: "全部",
				children: []
			};
			if (this.involvedGroups.length == 0) {
				let member = this.$store.state.user;
				root.children.push({
					label: member.name,
					id: member.id,
					avatar:
						member.avatar && member.avatar.name
							? this.baseUrl + "/static/" + member.avatar.name
							: "/statics/DefaultHead.png"
				});
			} else {
				this.involvedGroups.forEach(group => {
					let groupNode = {
						label: group.name,
						id: group.identifyCode,
						icon: "mdi-account-group-outline",
						children: []
					};
					group.members.forEach(member => {
						groupNode.children.push({
							label: member.name,
							id: member.id,
							avatar:
								member.avatar && member.avatar.name
									? this.baseUrl +
									  "/static/" +
									  member.avatar.name
									: "/statics/DefaultHead.png"
						});
					});
					root.children.push(groupNode);
				});
			}
			treedUsers.push(root);
			return treedUsers;
		},
		selectedUsers() {
			return this.allSelectableMembers.filter(u => {
				return this.tickedUser.indexOf(u.id) >= 0;
			});
		}
	},
	props: {
		value: {
			type: Array
		},
		readOnly: {
			type: Boolean,
			default: false
		}
	}
};
</script>

<style>
.tag-input-area {
	border-bottom: 1px solid rgba(0, 0, 0, 0.27);
	margin-left: 0.25rem;
	min-height: 2.2rem;
}

.tag-input-icon {
	font-size: 24px;
	color: rgba(0, 0, 0, 0.54);
}
</style>
