<template>
	<div >
		<div
		 v-if="!headerImg"
		>
			<q-btn
			 round
			 outline
			 color="primary"
			 :size="headPicSize"
			 icon="linked_camera"
			 @click="uploadFile()"
			/>
		</div>
		<div
		 v-if="headerImg"
		>
			<q-avatar
			 size="100px"
			 @click="uploadFile()"
			 class="rounded-borders"
			>
				<img
				 :src="headerImg"
				 ref="croppedHeadImg"
				 @click="uploadFile()"
				/>
			</q-avatar>
		</div>
		<input
		 type='file'
		 hidden
		 id="file-uploader"
		 accept="image/*"
		 @change="selectedPic($event)"
		/>
		<head-pic-dialog
		 ref="cropImg"
		 @cropped="handleCropped($event)"
		/>
	</div>
</template>
<script>
import HeadPicDialog from "./HeadPicDialog.vue";
import FileUpload from "../../services/upload-file";
import { mapGetters } from "vuex";
export default {
	name: "HeaderAvator",
	data() {
		return {
			headerImg: ""
		};
	},
	methods: {
		handleCropped($event) {
			this.headerImg = $event;
			function dataURItoBlob(dataURI) {
				// convert base64/URLEncoded data component to raw binary data held in a string
				var byteString;
				if (dataURI.split(",")[0].indexOf("base64") >= 0)
					byteString = atob(dataURI.split(",")[1]);
				else byteString = unescape(dataURI.split(",")[1]);

				// separate out the mime component
				var mimeString = dataURI
					.split(",")[0]
					.split(":")[1]
					.split(";")[0];

				// write the bytes of the string to a typed array
				var ia = new Uint8Array(byteString.length);
				for (var i = 0; i < byteString.length; i++) {
					ia[i] = byteString.charCodeAt(i);
				}

				return new Blob([ia], { type: mimeString });
			}
			let headerFileName = "user-header.png";
			let file = new File([dataURItoBlob($event)], headerFileName, {
				type: "image/png"
			});
			console.log("file", file);
			this.$store.commit("setHeadPic",{
				name:"",
				id:-1
			})
			FileUpload()
				.upload(file, "user_header", this.$store.state.user.id)
				.then(res => {
					console.log('reseting headPic');
					this.$store.commit("setHeadPic", res);
				});
		},
		uploadFile() {
			document.getElementById("file-uploader").click();
		},
		selectedPic($event) {
			console.log("files", $event.target.files);
			if (!$event.target.files) {
				return;
			}
			this.$refs.cropImg.open($event.target.files[0]);
			document.getElementById("file-uploader").setAttribute("value", "");
		}
	},
	components: {
		HeadPicDialog
	},
	computed: {
		...mapGetters(["windowWidth", "currentUserHeadPic"]),
		currentUser() {
			return this.$store.state.user;
		},
		headPicSize() {
			console.log("size", Math.floor(this.windowWidth * 0.13));
			return Math.round(this.windowWidth * 0.1) + "px";
		}
	},
	mounted() {
		if (this.currentUserHeadPic) {
			this.headerImg = this.currentUserHeadPic;
		}
	}
};
</script>
