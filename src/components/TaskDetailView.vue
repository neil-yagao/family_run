<template>
	<q-page class="q-px-sm q-pt-sm">
		<q-card class="my-card full-width">
			<q-card-section>
				<div class="row items-center no-wrap">
					<div class="col">
						<div class="text-h5">{{task.title}}</div>
						<div class="text-subtitle2">{{task.dueDate}}</div>
					</div>

					<div class="col-auto">
						<q-btn
						 color="grey-7"
						 round
						 flat
						 icon="more_vert"
						>
							<q-menu
							 cover
							 auto-close
							>
								<q-list>
									<q-item
									 clickable
									 @click="delayTask(1)"
									>
										<q-item-section>移至明天</q-item-section>
									</q-item>
									<q-item
									 clickable
									 @click="delayTask(7)"
									>
										<q-item-section>移至下周</q-item-section>
									</q-item>
									<q-separator />
									<q-item
									 clickable
									 @click="goEditingPage()"
									>
										<q-item-section>编辑</q-item-section>
									</q-item>
								</q-list>
							</q-menu>
						</q-btn>
					</div>
				</div>
			</q-card-section>
			<q-separator inset />
			<q-card-section v-html="task.description">
			</q-card-section>
			<q-separator />

			<q-card-actions>
				<q-btn
				 flat
				 color="warning"
				 @click="backToHome()"
				>返回</q-btn>
				<q-btn
				 flat
				 color="negative"
				 @click="removeTask()"
				>删除</q-btn>
				<q-space />
				<q-btn
				 flat
				 color="primary"
				 @click="doneTask"
				>完成</q-btn>
			</q-card-actions>
		</q-card>
	</q-page>
</template>
<script>
import moment from "moment";
export default {
	name: "TaskDetail",
	data() {
		return {
			animatedLeaveStatus: 0,
			task: {}
		};
	},
	methods: {
		removeTask() {
			this.$route.meta.leave = "hinge";
			this.task.status = "deleted";
			this.task.visible = 1;
			this.task.dueDate = moment().format("YYYY-MM-DD");
			this.$store
				.dispatch("deleteTask", {
					...this.task
				})
				.then(() => {
					this.$router.replace("/");
				});
		},
		doneTask() {
			this.$route.meta.leave = "tada";
			this.task.status = "finished";
			this.task.visible = 1;
			this.task.dueDate = moment().format("YYYY-MM-DD");
			this.$store
				.dispatch("completedTask", {
					...this.task
				})
				.then(() => {
					this.$router.replace("/");
				});
		},
		delayTask(delayDate) {
			this.$route.meta.leave = "zoomOutDown";
			this.task.dueDate = moment(this.task.dueDate)
				.add(Number(delayDate), "days")
				.format("YYYY-MM-DD");
			this.$store
				.dispatch("delayTask", {
					days: delayDate,
					task: this.task
				})
				.then(() => {
					this.$router.replace("/");
				});
		},
		backToHome() {
			this.$route.meta.leave = "zoomOutDown";
			this.$router.replace("/");
		},
		goEditingPage() {
			this.$route.meta.leave = "fadeOut";
			this.$router.push("/task-edit/" + this.$route.params.id);
		}
	},
	mounted() {
		let taskId = this.$route.params.id;
		this.task = this.$store.state.tasks.onGoingTasks.find(function(t) {
			return t.id == taskId;
		});
		this.$route.meta.leave = "zoomOutDown";
	}
};
</script>

