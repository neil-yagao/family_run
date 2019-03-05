<template>
	<q-layout
	 view="hHh Lpr fFf"
	 class="no-scroll"
	 :animatedClass="animatedClass"
	>
		<q-header
		 elevated
		 class="bg-white text-primary"
		>
			<q-toolbar>
				<h6 class="q-ma-none absolute-center">注册</h6>
			</q-toolbar>
		</q-header>
		<q-page-container>
			<q-page class="full-width q-pa-md q-mt-lg">
				<q-card>
					<q-card-section>
						<div class="row">
							<q-input
							 class="col"
							 v-model="username"
							 label="注册手机号"
							/>
						</div>
						<div class="row q-mt-md">
							<q-input
							 class="col"
							 v-model="password"
							 label="密码"
							 :type="isPwd ? 'password' : 'text'"
							>
								<template v-slot:append>
									<q-icon
									 :name="isPwd ? 'visibility_off' : 'visibility'"
									 class="cursor-pointer"
									 @click="isPwd = !isPwd"
									/>
								</template>
							</q-input>
						</div>
						<div class="row q-mt-md">
							<q-input
							 class="col"
							 v-model="passwordConfirm"
							 label="确认密码"
							 :type="isPwdCfm ? 'password' : 'text'"
							>
								<template v-slot:append>
									<q-icon
									 :name="isPwdCfm ? 'visibility_off' : 'visibility'"
									 class="cursor-pointer"
									 @click="isPwdCfm = !isPwdCfm"
									/>
								</template>
							</q-input>
						</div>
					</q-card-section>
					<q-card-actions>
						<q-space />
						<q-btn
						 push
						 color="white"
						 text-color="primary"
						 @click="register"
						><span class="q-px-md">注册</span></q-btn>
					</q-card-actions>
				</q-card>
				<q-banner
				 inline-actions
				 rounded
				 class="text-red bg-white"
				>
					<transition
					 name="custom-classes-transition"
					 enter-active-class="animated fadeIn"
					 leave-active-class="animated fadeOut"
					>
						<span v-if="error">{{error}}
						</span>
					</transition>
				</q-banner>
			</q-page>
		</q-page-container>
	</q-layout>
</template>
<script>
import gql from "graphql-tag";
import sha256 from "crypto-js/sha256";
export default {
	name: "RegisterPage",
	data() {
		return {
			username: "",
			password: "",
			passwordConfirm: "",
			isPwd: true,
			isPwdCfm: true,
			error: "",
			animatedClass: ""
		};
	},
	methods: {
		register() {
			if (this.password === this.passwordConfirm) {
				this.$apollo
					.mutate({
						mutation: gql`
							mutation register($register: AccountInput) {
								register(account: $register) {
									id
									name
									headPic {
										loc
									}
								}
							}
						`,
						variables: {
							register: {
								username: this.username,
								password: sha256(this.password) + ""
							}
						}
					})
					.then(res => {
						console.log(res);
						this.animatedClass = "animated flipOutY";
						let user = res.data.register;
						this.$store.commit("login", user);
						setTimeout(() => {
							this.$router.replace("/");
						}, 500);
					})
					.catch(err => {
						this.error = true;
						setTimeout(() => {
							this.error = false;
						}, 5000);
					});
			} else {
				this.error = "两次密码输入不相等";
				setTimeout(_=>{
					this.error = '';
				})
			}
		}
	}
};
</script>

