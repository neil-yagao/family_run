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
				<div class="text-h6">已经完成的任务</div>
			</q-card-section>
			<q-card-section>
				<q-list class="scroll">
					<template v-for="(tasks,date) in completedTasks">
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
												<q-item-section>再次执行</q-item-section>
											</q-item>
											<q-item
											 clickable
											 @click="nonVisible(task)"
											>
												<q-item-section>不再显示</q-item-section>
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
import DatePicker from "../../components/general/GeneralDatePicker.vue";
import GraphQLService from "../../services/graphQL";
export default {
	name: "CompletedTasks",
	data() {
		return {
			completedTasks: {},
			reopenDueDate: "",
			reopenTask: {}
		};
	},
	mounted() {
		this.loadFinishedTasks();
	},
	methods: {
		putTaskBack(task) {
			this.reopenTask = task;
			this.reopenDueDate = task.dueDate;
			this.$refs.datePicker.showDatePicker();
		},
		nonVisible(task) {
			GraphQLService.mutateTask(task.id, { visible: 0 }).then(() => {
				this.$store.commit("removeFromFinishedTasks", task);
				this.loadFinishedTasks();
			});
		},
		loadFinishedTasks() {
			this.completedTasks = {};
			let groupedTasks = groupBy(
				this.$store.state.tasks.finishedTasks,
				"dueDate"
			);
			this.completedTasks = groupedTasks;
		},
		selectedNewDueDate() {
			let newTask = {
				...this.reopenTask,
				dueDate: this.reopenDueDate,
				createdBy:this.reopenTask.createdBy.id
			};
			delete newTask.id;
			delete newTask.__typename;
			newTask.assignTo = [this.$store.state.user.id]
			newTask.status = "onGoing";
			newTask.visible = 1;
			this.$store.dispatch("addNewTask", newTask).then(task => {
				this.$router.replace("/");
			});
		},
		slideBack() {
			this.$router.replace("/");
		}
	},
	components: {
		DatePicker
	}
};
</script>

