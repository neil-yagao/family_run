<template>
	<div class="task-overall">
		<div
		 class="task-brief"
		 v-if="!isEmpty"
		 @click="bounceOut"
		 :class="taskDetailAnimated"
		>
			<div class="row">
				<span class="col-8  q-pl-sm q-pr-sm text-subtitle1 text-primary text-italic">{{task.title}}</span>
				<span class="col-4 text-subtitle1 text-black text-italic q-pl-sm">{{task.dueDate.split('-').slice(1).join('-')}}</span>
			</div>
		</div>
		<div
		 v-else
		 class="q-mt-xl"
		>
		</div>
		<div class="task-bag">
			<q-menu
			 cover
			 auto-close
			>
				<q-list v-if="!isEmpty">
					<q-item
					 clickable
					 @click="delayTask"
					>
						<q-item-section>移至明天</q-item-section>
					</q-item>
					<q-item clickable>
						<q-item-section>移至下周</q-item-section>
					</q-item>
					<q-item clickable>
						<q-item-section>删除</q-item-section>
					</q-item>
				</q-list>
				<q-list v-if="isEmpty">
					<q-item
					 clickable
					 @click="$router.replace('/new-task')"
					>
						<q-item-section>新建任务</q-item-section>
					</q-item>
				</q-list>
			</q-menu>
		</div>
	</div>
</template>
<script>
export default {
	name: "TaskBag",
	data() {
		return {
			taskDetailStatus: 0
		};
	},
	props: {
		isEmpty: {
			type: Boolean,
			default: true
		},
		task: {
			type: Object
		}
	},
	methods: {
		bounceOut() {
			this.taskDetailStatus = 1;
			setTimeout(() => {
				this.$router.push("/task-detail/" + this.task.id);
			}, 500);
		},
		delayTask() {
			this.taskDetailStatus = 1;
		}
	},
	computed: {
		taskDetailAnimated() {
			if (this.taskDetailStatus === 0) {
				return "";
			} else if (this.taskDetailStatus === 1) {
				setTimeout(() => {
					this.taskDetailStatus = 2;
				}, 3000);
				return "animated slideOutUp";
			}
		}
	}
};
</script>
<style>
.task-bag {
	position: relative;
	width: 98%;
	height: 5rem;
	border-radius: 50% / 10%;
	color: white;
	text-align: center;
	text-indent: 0.1em;
	border: 1px solid #b3e5fc;
	opacity: 0.8;
	background: linear-gradient(var(--q-color-primary), #b3e5fc);
	/* background-image: url("/statics/icons/bag.svg"); */
	/* background-repeat:no-repeat; */
	/* background-size: 60%; */
	/* background-position: center center; */
}

.task-bag:before {
	content: "";
	position: absolute;
	top: 10%;
	right: -5%;
	left: -5%;
	background: inherit;
	border-radius: 5% / 50%;
}

.task-brief {
	height: 3rem;
	border: 1px solid var(--q-color-primary);
	border-bottom: 0px;
	border-radius: 4px;
	margin-bottom: -0.6rem;
	width: 90%;
	z-index: 10;
	margin-left: 5%;
}
</style>
