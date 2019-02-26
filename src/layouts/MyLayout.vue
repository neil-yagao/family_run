<template>
	<q-layout
	 view="hHh Lpr fFf"
	 class="no-scroll"
	>
		<q-header
		 elevated
		 class="bg-primary text-white"
		>
			<q-toolbar>
				<h6
				 class="q-ma-none"
				 @click="$router.replace('/')"
				>Family Run</h6>
			</q-toolbar>
		</q-header>
		<q-drawer
		 v-model="menu"
		 side="left"
		 bordered
		>
			<q-list>
				<q-item clickable ripple @click="$router.replace('/')">
					<q-item-section avatar>
						<q-icon name="mdi-file-document-box-multiple-outline" />
					</q-item-section>
					<q-item-section>正在执行</q-item-section>
				</q-item>
				<q-separator />
				<q-item clickable ripple @click="completedTasks">
					<q-item-section avatar>
						<q-icon name="mdi-file-document-box-multiple-outline" />
					</q-item-section>
					<q-item-section>已完成</q-item-section>
				</q-item>
				<q-separator />
				<q-item  clickable ripple @click="deletedTasks">
					<q-item-section avatar>
						<q-icon name="mdi-delete-outline" />
					</q-item-section>
					<q-item-section>回收站</q-item-section>
				</q-item>
			</q-list>
		</q-drawer>
		<q-page-container>
			<transition
			 name="custom-classes-transition"
			 :enter-active-class="enteringAnimation"
			 :leave-active-class="leavingAnimation"
			 mode="out-in"
			>
				<router-view />
			</transition>
		</q-page-container>
		<q-footer class="bg-white">
			<q-tabs
			 dense
			 class="text-grey full-width"
			 active-color="primary"
			 indicator-color="primary"
			 align="justify"
			 narrow-indicator
			>
				<q-tab
				 auto-close
				 stretch
				 flat
				 label="历史"
				 icon="mdi-calendar-check"
				 @click="menu = !menu"
				>
				</q-tab>
				<q-route-tab
				 class="text-accent"
				 icon="add"
				 label="新增"
				 to="/new-task"
				 exact
				/>
				<q-route-tab
				 class="text-secondary"
				 icon="mdi-account-circle-outline"
				 label="我的"
				 to="/profile"
				 exact
				/>
			</q-tabs>
		</q-footer>

	</q-layout>
</template>

<script>
export default {
	data() {
		return {
			menu: false,
			leavingAnimation: "",
			enteringAnimation: ""
		};
	},
	methods: {
		completedTasks() {
			this.$router.push("/completed-tasks");
		},
		deletedTasks() {
			this.animatedClass = "animated fadeOut";
			setTimeout(() => {
				this.animatedClass = "";
				this.$router.push("/deleted-tasks");
			}, 500);
		},
	},
	beforeRouteUpdate(to, from, next) {
		console.log("to", to);
		if (to.meta.enter) {
			this.enteringAnimation = "animated " + to.meta.enter;
		}
		if(from.meta.leave){
			this.leavingAnimation = "animated " + from.meta.leave
		}
		next();
	}
};
</script>