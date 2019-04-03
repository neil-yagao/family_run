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
		 separator
		 class="q-pa-sm q-mt-md"
		>
			<q-item>
				<q-item-section avatar>
					<q-icon
					 color="primary"
					 name="bluetooth"
					/>
				</q-item-section>
				<q-item-section>
					任务统计
				</q-item-section>
				 <q-item-section side>
					 <q-icon
					 color="grey"
					 name="right"/>
				 </q-item-section>
			</q-item>
			<q-item>
				<q-item-section>
					使用帮助
				</q-item-section>
			</q-item>
		</q-list>
	</q-page>
</template>
<script>
import HeadAvator from "../../components/profile/HeadAvatar.vue";
import { mapGetters } from "vuex";
import gql from "graphql-tag";
import ClipboardJS from "clipboard";

export default {
	name: "ProfilePage",
	data() {
		return {
			edit: false,
			baseUrl: process.env.STATIC_URL,
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
			return this.$store.dispatch(
				"loadUserGroupInfo",
				this.$store.state.user.id
			);
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
		HeadAvator
	},
	computed: {
		...mapGetters(["involvedGroups"])
	},
	mounted() {
		this.loadUserInfo();
	}
};
</script>
