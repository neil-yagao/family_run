<template>
	<div id="q-app">
		<router-view />
	</div>
</template>

<script>
import gql from "graphql-tag";

export default {
	name: "App",
	mounted() {

		caches.keys().then(names => {
			for (let name of names) caches.delete(name);
		});
		this.$store.commit("windowResize", {
			width: document.body.clientWidth,
			height: document.body.clientHeight
		});
		window.addEventListener("resize", () => {
			this.$store.commit("windowResize", {
				width: document.body.clientWidth,
				height: document.body.clientHeight
			});
			console.log("windown size");
		});
		if(localStorage.getItem('hasLogin') == 'true'){
			let userId = localStorage.getItem('userId');
			this.$apollo.query({
				query:gql` 
					query findUserById($userId:String!){
						findUserById(userId:$userId){
							id
							name
							headPic {
								name
							}
						}
					}
				`,
				variables:{
					userId:localStorage.getItem('userId')
				}
			}).then(res =>{
				let user = res.data.findUserById;
				this.$router.replace("/");
				this.$store.commit("login", user);
				this.$store.dispatch('loadUserGroupInfo',userId)
			})
		}else{
			this.$router.replace('/login')
		}
	}
};
</script>

<style>
</style>
