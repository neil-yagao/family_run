<template>
	<q-card
	 class="my-card q-ma-sm"
	>
		<q-card-section>
			<q-input
			 v-model="task.title"
			 label="任务标题"
			 counter
			 dense
			 placeholder="建议不超过8个字"
			 :class="validateClass && !task.title?'animated pulse':''"
			>
				<template v-slot:before>
					<q-icon name="mdi-subtitles-outline" />
				</template>
				<template v-slot:append>
					<q-icon
					 v-if="task.title !== ''"
					 name="close"
					 @click="task.title = ''"
					 class="cursor-pointer"
					/>
				</template>
			</q-input>
		</q-card-section>
		<q-card-section>
			<date-picker v-model="task.dueDate" />
		</q-card-section>
		<q-separator inset />
		<q-card-section>
			<q-editor
			 v-model="task.description"
			 toolbar-text-color="white"
			 toolbar-toggle-color="yellow-8"
			 toolbar-flat
			 toolbar-bg="primary"
			 :toolbar="[
				['bold', 'italic', 'underline','strike'],
				[{
				label: $q.lang.editor.formatting,
				icon: $q.iconSet.editor.formatting,
				list: 'no-icons',
				options: ['p', 'h5', 'h6']
				}]
			]"
			 :class="validateClass && !task.description?'animated pulse':''"
			/>
		</q-card-section>
		<q-separator />

		<q-card-actions>
			<q-btn
			 flat
			 color="warning"
			 @click="backToHome()"
			>返回</q-btn>
			<q-space />
			<q-btn
			 flat
			 color="primary"
			 @click="saveEditingInformation()"
			>保存</q-btn>
		</q-card-actions>
	</q-card>
</template>
<script>
import gql from "graphql-tag";
import DatePicker from "./general/GeneralDatePicker.vue";
import taskTemplate from "./general/task-template";
import GraphQLService from "../services/graphQL";

export default {
	name: "TaskDetailEdit",
	data() {
		return {
			task: taskTemplate(),
			validateClass: false
		};
	},
	methods: {
		saveEditingInformation() {
			this.validateClass = !this.task.title || !this.task.description;
			if (this.validateClass) {
				setTimeout(() => {
					this.validateClass = false;
				}, 500);
				return;
			}
			let detail = {
				...this.task
			};
			detail.dueDate = detail.dueDate.replace(/\//g, "-");
			GraphQLService.mutateTask(detail.id,{
				title:detail.title,
				description:detail.description,
				dueDate:detail.dueDate
			}).then(()=>{
				this.$store
				.dispatch("delayTask", {
					days: 0,
					task: detail
				})
				.then(() => {
					this.$router.replace("/task-detail/" + this.taskId);
				});
			})
		},
		triggerDatePicker() {
			this.$refs.datePicker.show();
		},
		backToHome() {
			this.$router.replace("/");
		}
	},
	components: {
		DatePicker
	},
	computed: {
		taskId() {
			return this.$route.params.id;
		}
	},
	mounted() {;
		this.task = this.$store.state.tasks.onGoingTasks.find((t)=> {
			return t.id == this.taskId;
		});
	}
};
</script>

<style>
.q-date__today {
	-webkit-box-shadow: 0 0 1px 0 currentColor;
	background: teal;
	box-shadow: 0 0 1px 0 currentColor;
}
</style>
