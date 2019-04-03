<template>
	<q-page>
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
										<img :src="member.avatar&&member.avatar.name?baseUrl + '/static/' + member.avatar.name:'/statics/DefaultHead.png'">
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
import GroupDialog from "../../components/profile/GroupDialog.vue";

export default {
	components:{
		GroupDialog
	}
};
</script>

<style>
</style>
