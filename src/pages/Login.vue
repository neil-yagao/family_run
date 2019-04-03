<template>
	<q-layout
	 view="hHh Lpr fFf"
	 class="no-scroll"
	>
		<q-header
		 elevated
		 class="bg-white text-primary"
		>
			<q-toolbar>
				<h6 class="q-ma-none absolute-center">登录</h6>
				<q-space />
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
							 label="用户名/注册手机号"
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
					</q-card-section>
					<q-card-actions>
						<q-btn
						 push
						 text-color="accent"
						 @click="$router.replace('/register')"
						><span class="q-px-md">注册</span></q-btn>
						<q-space />
						<q-btn
						 push
						 color="white"
						 text-color="primary"
						 @click="login"
						><span class="q-px-md">登录</span></q-btn>
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
						<span v-if="error">用户名/密码错误
						</span>
					</transition>
					<template v-slot:action>
						<q-btn
						 flat
						 color="primary"
						 outline
						 label="忘记密码?"
						/>
					</template>
				</q-banner>
			</q-page>
		</q-page-container>
	</q-layout>
</template>
<script>
import gql from "graphql-tag";
import sha256 from "crypto-js/sha256";
export default {
	name: "LoginPage",
	data() {
		return {
			username: "",
			password: "",
			isPwd: true,
			error: ""
		};
	},
	methods: {
		login() {
			this.$apollo
				.query({
					query: gql`
						query login($username: String!, $password: String!) {
							login(username: $username, password: $password) {
								id
								name
								headPic {
									loc
									name
								}
								avatar {
									name
								}
							}
						}
					`,
					variables: {
						username: this.username,
						password: sha256(this.password) + ""
					},
					fetchPolicy: "network-only"
				})
				.then(res => {
					console.log(res);
					this.$store.commit("login", res.data.login);
					this.$router.replace("/");
				})
				.catch(err => {
					console.log("err", err);
					this.error = true;
					setTimeout(() => {
						this.error = false;
					}, 5000);
				});
		}
	}
};
</script>

