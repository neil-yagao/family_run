<template>
	<div id="q-app">
		<router-view />
	</div>
</template>

<script>
export default {
	name: "App",
	mounted() {
		/**
		 * clear all services work
		 */
		caches.keys().then((names)=> {
			for (let name of names) caches.delete(name);
			this.$router.replace('/')
		});	

	}
};
</script>

<style>
</style>
