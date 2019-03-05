<template>
	<q-page class="flex">
		<div
		 class="row full-width q-pa-sm q-mt-sm "
		 v-if="currentWindowsWidth < 720"
		>
			<div class="col">
				<q-tab-panels
				 v-model="currentPanel"
				 animated
				 swipeable
				 class="text-white shadow-2 rounded-borders task-bags-list full-width q-pb-sm"
				>
					<q-tab-panel
					 v-for="p in panels"
					 :name="p"
					 :key="p"
					>
						<task-shelf :period="p" />
					</q-tab-panel>
				</q-tab-panels>
			</div>
		</div>
		<div
		 class="row full-width q-pa-sm q-mt-sm q-gutter-sm "
		 v-if="currentWindowsWidth >=720"
		>

			<q-card
			 class="col rounded-borders"
			 v-for="p in panels"
			 :name="p"
			 :key="p"
			>
				<q-card-section>
					<task-shelf
					 :period="p"
					 class="task-bags-list"
					/>
				</q-card-section>
			</q-card>
		</div>

	</q-page>
</template>
<script>
import TaskShelf from "../../components/TaskShelf.vue";
import gql from "graphql-tag";

export default {
	name: "PageIndex",
	data() {
		return {
			currentPanel: "Day",
			panels: ["Day", "Week", "Month"]
		};
	},
	methods: {
		initTasks() {
			this.$apollo
				.query({
					query: gql`
						query visibleTasks($condition: TaskInput) {
							tasks(task: $condition) {
								id
								title
								description
								dueDate
								status
								visible
								createdBy {
									id
								}
							}
						}
					`,
					variables: {
						condition: {
							visible: 1,
							assignTo: [this.$store.state.user.id]
						}
					},
					fetchPolicy: "network-only"
				})
				.then(({ data }) => {
					if (!data.tasks) {
						return;
					}
					let onGoingTasks = data.tasks.filter(function(t) {
						return t.status === "onGoing";
					});
					let deletedTasks = data.tasks.filter(function(t) {
						return t.status === "deleted";
					});
					let completedTasks = data.tasks.filter(function(t) {
						return t.status === "finished";
					});
					this.$store.commit("setOnGoingTasks", onGoingTasks);
					this.$store.commit("setDeletedTasks", deletedTasks);
					this.$store.commit("setFinishedTasks", completedTasks);
				});
		}
	},
	components: {
		TaskShelf
	},
	computed: {
		currentWindowsWidth() {
			return this.$store.getters.windowWidth;
		}
	},
	mounted() {
		this.initTasks();
	},
	watch: {
		"$store.state.user.id": function(newVal) {
			if (newVal) {
				this.initTasks();
			}
		}
	}
};
</script>
<style>
.task-bags-list {
	height: 80vh;
	overflow-y: auto;
}
.stick-bottom {
	position: fixed;
	bottom: 1rem;
}
</style>
