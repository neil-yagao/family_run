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
							avatar {
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
@font-face {
    font-family: 'oswald';
    src: url('/statics/scf.ttf') format('truetype');
}

html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video {
    margin:0;
    padding:0;
    border:0;
    font-size:100%;
    font:inherit;
    font-family: oswald;
    vertical-align:baseline
} 
</style>
