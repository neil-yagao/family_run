<template>
	<q-page class="no-scroll">
		<div class="row justify-center items-center q-mt-md q-mx-sm">
			<head-avator class="col-4" />
			<div class="col justify-center items-center q-mt-md ">
				<p
				 v-if="!edit"
				 class="text-h5"
				>{{$store.state.user.name}}</p>
				<q-input
				 v-model="username"
				 label="新名字"
				 counter
				 v-if="edit"
				 autofocus
				 dense
				>
					<template v-slot:append>
						<q-icon
						 v-if="username !== ''"
						 name="close"
						 @click="username = ''"
						 class="cursor-pointer"
						/>
					</template>
				</q-input>
			</div>
			<div class="col-2">
				<q-btn
				 flat
				 fab
				 icon="edit"
				 v-if="!edit"
				 class="float-right text-grey"
				 @click="editUsername"
				/>
				<q-btn
				 flat
				 fab
				 icon="check"
				 v-else
				 class="float-right text-positive"
				 @click="updateUsername"
				/>
			</div>
		</div>
		<q-list
		 bordered
		 padding
		 class="q-mt-md"
		>
			<q-item-label header>加入的小组</q-item-label>
			<q-expansion-item
			 v-for="group in involvedGroups"
			 expand-separator
			 group="createdGroup"
			 :key="group.identifyCode"
			>
				<template v-slot:header>
					<q-item-section avatar>
						<q-icon
						 :color="$store.state.user.id === group.createdBy.id?'purple':''"
						 name="mdi-account-group-outline"
						/>
					</q-item-section>

					<q-item-section>
						<div class="q-item__label">
							{{group.name}}
						</div>
						<div class="q-item__label q-item__label--caption text-caption">
							创建者:{{group.createdBy.name}}
						</div>
					</q-item-section>
				</template>

				<q-card>
					<q-card-section class="row items-center">
						<span class="text-title2 col-3">小组代码:</span>
						<input
						 class="col"
						 v-model="group.identifyCode"
						 readonly
						 id="copyFrom"
						>
						<q-btn
						 id="copyBtn"
						 class="col-3"
						 flat
						 color="primary"
						 @click="copyToClips()"
						 data-clipboard-target="#copyFrom"
						>复制</q-btn>
					</q-card-section>
					<q-card-section>
						<div class="row items-cente">
							<q-icon
							 name="mdi-account-check"
							 class="col-1"
							/>
							<div class="col-9">
								<q-chip
								 dense
								 v-for="member in group.members.slice(0,2)"
								 :key="member.id"
								>
									<q-avatar>
										<img :src="baseUrl + '/static/' + member.headPic.name">
									</q-avatar>
									{{member.name}}
								</q-chip>
							</div>
							<q-icon
							 v-if="group.members.length > 2"
							 class="col-2"
							 name="mdi-dots-horizontal"
							/>
						</div>
					</q-card-section>
				</q-card>
			</q-expansion-item>
			<q-btn
			 icon="mdi-plus"
			 dense
			 push
			 flat
			 class="full-width q-mt-md text-primary"
			 @click="addNewGroup()"
			>
			</q-btn>
		</q-list>
		<group-dialog ref="groupDialog" />
	</q-page>
</template>
<script>
import HeadAvator from "../../components/profile/HeadAvatar.vue";
import GroupDialog from "../../components/profile/GroupDialog.vue";
import { mapGetters } from "vuex";
import gql from "graphql-tag";
import ClipboardJS from "clipboard";

export default {
	name: "ProfilePage",
	data() {
		return {
			edit: false,
			baseUrl: process.env.BASE_URL,
			username: this.$store.state.user.name
		};
	},
	methods: {
		addNewGroup() {
			this.$refs.groupDialog.show();
		},
		editUsername() {
			this.edit = true;
		},
		updateUsername() {
			this.edit = false;
			this.$apollo
				.mutate({
					mutation: gql`
						mutation updateUser(
							$userId: String
							$userInfo: UserInput
						) {
							updateUser(userId: $userId, userInfo: $userInfo) {
								id
								name
							}
						}
					`,
					variables: {
						userInfo: {
							name: this.username
						},
						userId: this.$store.state.user.id
					}
				})
				.then(_ => {
					this.loadUserInfo().then(() => {
						let currentUser = {
							...this.$store.state.user
						};
						currentUser.name = this.username;
						this.$store.commit("login", currentUser);
					});
				});
		},
		loadUserInfo() {
			return this.$store.dispatch('loadUserGroupInfo',this.$store.state.user.id);
		},
		copyToClips() {
			let clipboard = new ClipboardJS("#copyBtn");
			clipboard.on("success", function(e) {
				console.log(e);
			});
			clipboard.on("error", function(e) {
				console.log(e);
			});
		}
	},
	components: {
		HeadAvator,
		GroupDialog
	},
	computed: {
		...mapGetters(["involvedGroups"])
	},
	mounted() {
		this.loadUserInfo();
	}
};
</script>
