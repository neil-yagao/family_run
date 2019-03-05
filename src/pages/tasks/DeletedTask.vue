<template>
	<q-page
	 class="flex"
	 padding
	>
		<q-card
		 class="my-card q-ma-sm full-width"
		 style="min-height:80vh"
		>
			<q-card-section>
				<div class="text-h6">被删除的任务</div>
			</q-card-section>
			<q-card-section>
				<q-list class="scroll">
					<template v-for="(tasks,date) in deletedTasks">
						<q-item-label
						 header
						 :key="date"
						>
							<span class="text-subtitle2">{{date}}</span>
						</q-item-label>

						<q-item
						 v-for="task in tasks"
						 :key="task.id"
						>
							<q-item-section>{{task.title}}</q-item-section>
							<q-item-section side>
								<q-btn
								 size="12px"
								 flat
								 dense
								 round
								 icon="more_vert"
								>
									<q-menu
									 cover
									 auto-close
									>
										<q-list>
											<q-item
											 clickable
											 @click="putTaskBack(task)"
											>
												<q-item-section>重新打开</q-item-section>
											</q-item>
											<q-item
											 clickable
											 @click="perminentDeleted(task)"
											>
												<q-item-section>彻底删除</q-item-section>
											</q-item>
										</q-list>
									</q-menu>
								</q-btn>
							</q-item-section>
						</q-item>
						<q-separator :key="date" />
					</template>
				</q-list>
			</q-card-section>
		</q-card>
		<date-picker
		 ref="datePicker"
		 v-model="reopenDueDate"
		 @selected-date="selectedNewDueDate()"
		 :showInput="false"
		/>
	</q-page>
</template>
<script>
import { groupBy, forOwn, sortBy } from "lodash";
import gql from "graphql-tag";
import DatePicker from "../../components/general/GeneralDatePicker.vue";
import GraphQLService from "../../services/graphQL";
export default {
	name: "DeletedTasks",
	data() {
		return {
			deletedTasks: {},
			reopenDueDate: "",
			reopenTask: {}
		};
	},
	mounted() {
		this.loadDeletedTask();
	},
	methods: {
		loadDeletedTask() {
			let groupedTasks = groupBy(
				this.$store.state.tasks.deletedTasks,
				"dueDate"
			);
			this.deletedTasks = groupedTasks;
		},
		putTaskBack(task) {
			this.reopenTask = task;
			this.reopenDueDate = task.dueDate;
			this.$refs.datePicker.showDatePicker();
		},
		perminentDeleted(task) {
			this.$apollo
				.mutate({
					mutation: gql`
						mutation UpdateTask(
							$taskId: String!
							$task: TaskInput
						) {
							updateTask(taskId: $taskId, task: $task) {
								id
							}
						}
					`,
					variables: {
						taskId: task.id,
						task: {
							visible: 0
						}
					}
				})
				.then(() => {
					this.$store.commit("removeFromDeletedTasks", task);
					this.loadDeletedTask();
				});
		},
		slideBack() {
			this.$router.replace("/");
		},
		selectedNewDueDate() {
			this.reopenTask.dueDate = this.reopenDueDate;
			let newTask = {
				...this.reopenTask
			};
			delete newTask.__typename;
			newTask.status = "onGoing";
			newTask.visible = 1;
			GraphQLService.mutateTask(newTask.id, {
				status: "onGoing",
				visible: 1
			}).then(() => {
				this.$store.dispatch("reopenDeletedTask", newTask).then(() => {
					this.$router.replace("/");
				});
			});
		}
	},
	components: {
		DatePicker
	}
};
</script>

