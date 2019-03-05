<template>
	<q-dialog v-model="prompt">
		<transition
		 name="flip-to-create"
		 enter-active-class="animated flipInY"
		 mode="out-in"
		 leave-active-class="animated flipOutY"
		>
			<q-card
			 style="width:80vw"
			 v-if="join"
			 key="joining"
			>
				<q-card-section>
					<div class="text-h6">输入小组代码</div>
				</q-card-section>

				<q-card-section>
					<q-input
					 dense
					 v-model="code"
					 autofocus
					 @keyup.enter="joinGroup()"
					/>
				</q-card-section>

				<q-card-actions align="right">
					<q-btn
					 flat
					 color="secondary"
					 label="创建新小组"
					 @click="createNewGroup()"
					/>
					<q-space />
					<q-btn
					 flat
					 color="primary"
					 @click="joinTheGroup()"
					 label="加入该小组"
					/>
				</q-card-actions>
			</q-card>
			<q-card
			 style="width:80vw"
			 v-else
			 key="creating"
			>
				<q-card-section>
					<div class="text-h6">给小组起个名字吧</div>
				</q-card-section>

				<q-card-section class="flex flex-center">
					<transition
					 name="create-new-group"
					 enter-active-class="animated lightSpeedIn"
					 leave-active-class="animated lightSpeedOut"
					>
						<q-input
						 v-if="!createdSuccess"
						 dense
						 v-model="groupName"
						 autofocus
						 class="full-width"
						 @keyup.enter="doCreateNewGroup()"
						 key="before"
						/>
						<q-icon
						 name="mdi-progress-check"
						 class="text-teal"
						 style="font-size: 4.4em;"
						 v-else
						 key="after"
						>
						</q-icon>
					</transition>
				</q-card-section>

				<q-card-actions align="right">
					<q-btn
					 flat
					 color="warning"
					 label="取消"
					 v-close-dialog
					/>
					<q-space />

					<q-btn
					 v-if="!createdSuccess"
					 flat
					 color="primary"
					 label="确定"
					 @click="doCreateNewGroup()"
					/>
				</q-card-actions>
			</q-card>
		</transition>
	</q-dialog>
</template>

<script>
import gql from "graphql-tag";
export default {
	data() {
		return {
			prompt: false,
			code: "",
			groupName: "",
			join: true,
			createdSuccess: false
		};
	},
	methods: {
		show() {
			this.prompt = true;
			this.join = true;
		},
		joinTheGroup() {
			this.prompt = false;
			this.$store
				.dispatch("joinGroup", {
					groupId: this.code,
					joiner: this.$store.state.user.id
				})
				.then(_ => {
					this.$q.notify({
						message: "加入小组成功",
						textColor: "positive",
						timeout: 5000
					});
				})
				.catch(_ => {
					this.$q.notify({
						message: "未能找到或已加入小组",
						textColor: "negative",
						timeout: 5000
					});
				});
		},
		createNewGroup() {
			this.join = false;
		},
		doCreateNewGroup() {
			let variables = {
				name: this.groupName,
				creator: this.$store.state.user.id
			};
			this.$store.dispatch("createNewGroup", variables).then(() => {
				this.createdSuccess = true;
				setTimeout(() => {
					this.prompt = false;
					this.createdSuccess = false;
				}, 4000);
			});
		}
	}
};
</script>

<style>
</style>
