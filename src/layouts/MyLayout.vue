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
				<q-avatar
				 v-if="reload"
				 class="bg-white"
				 @click="$router.replace('/profile')"
				>
					<img
					 :src="userHeadPic"
					 @click="$router.replace('/profile')"
					>
				</q-avatar>
				<h6
				 class="q-ma-none absolute-center"
				 @click="$router.replace('/')"
				>Tasks Bag</h6>
				<q-space />
				<q-btn
				 icon="mdi-logout"
				 label="登出"
				 @click="logout"
				 dense
				 flat
				 color="white"
				></q-btn>
			</q-toolbar>
		</q-header>
		<q-drawer
		 v-model="menu"
		 side="left"
		 bordered
		>
			<q-list>
				<q-item
				 clickable
				 ripple
				 @click="$router.replace('/')"
				>
					<q-item-section avatar>
						<q-icon name="mdi-file-document-box-multiple-outline" />
					</q-item-section>
					<q-item-section>正在执行</q-item-section>
				</q-item>
				<q-separator />
				<q-item
				 clickable
				 ripple
				 @click="completedTasks"
				>
					<q-item-section avatar>
						<q-icon name="mdi-file-document-box-multiple-outline" />
					</q-item-section>
					<q-item-section>已完成</q-item-section>
				</q-item>
				<q-separator />
				<q-item
				 clickable
				 ripple
				 @click="deletedTasks"
				>
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
			<q-separator />
			<q-tabs
			 dense
			 class="text-grey full-width"
			 indicator-color="white"
			 align="justify"
			 narrow-indicator
			>

				<q-tab
				 auto-close
				 stretch
				 flat
				 label="历史"
				 icon="mdi-calendar-check"
				 :class="activeIndicator === 1?'text-primary':'text-accent'"
				 @click="menu = !menu"
				>
				</q-tab>
				<q-route-tab
				 :class="activeIndicator === 2?'text-primary':'text-accent'"
				 icon="mdi-plus-circle-outline"
				 label="新增"
				 to="/new-task"
				 exact
				/>
				<q-route-tab
				 :class="activeIndicator == 3?'text-primary':'text-accent'"
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
			enteringAnimation: "",
			reload: true
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
		logout() {
			this.$store.commit("logout");
			this.$router.replace("/login");
		}
	},
	beforeRouteUpdate(to, from, next) {
		console.log("to", to);
		if (to.meta.enter) {
			this.enteringAnimation = "animated " + to.meta.enter;
		}
		if (from.meta.leave) {
			this.leavingAnimation = "animated " + from.meta.leave;
		}
		next();
	},
	computed: {
		userHeadPic() {
			console.log(
				"current head pic changed",
				this.$store.getters.currentUserHeadPic
			);
			caches.keys().then(names => {
				console.log('names',names)
			})
			if (this.$store.getters.currentUserHeadPic) {
				return this.$store.getters.currentUserHeadPic;
			}

			return "/statics/DefaultHead.png";
		},
		activeIndicator() {
			let indicator = 1;
			if (this.$route.path === "/profile") {
				indicator = 3;
			} else if (this.$route.path === "/new-task") {
				indicator = 2;
			} else if (this.$route.path === "/") {
				indicator = 0;
			}
			return indicator;
		}
	}
};
</script>