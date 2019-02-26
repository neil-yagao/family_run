<template>
	<div>
		<span class="text-h5 text-primary inline-block">{{currentPanelShow}}</span>
		<task-bag
		 v-for="t in tasks"
		 :key="t.id"
		 class="q-mt-sm"
		 :is-empty="false"
		 :task="t"
		/>
		<task-bag
		 v-for="j in emptyTasks"
		 :key="j"
		 class="q-mt-sm"
		 :is-empty="true"
		/>
	</div>
</template>
<script>
import TaskBag from "./TaskBag.vue";
export default {
	name: "TaskShelf",
	data() {
		return {};
	},
	props: {
		period: {
			type: String,
			required: true
		}
	},
	computed: {
		tasks() {
			return this.$store.getters["taskFor" + this.period];
		},
		emptyTasks() {
			let emptyTask = [];
			for (
				let i = this.$store.getters["taskFor" + this.period].length;
				i < 4;
				i++
			) {
				emptyTask.push(i);
			}
			return emptyTask;
		},
		currentPanelShow() {
			if (this.period === "Day") {
				return "今天";
			} else if (this.period === "Week") {
				return "本周";
			} else if (this.period === "Month") {
				return "本月";
			}
		}
	},
	components: {
		TaskBag
	}
};
</script>
