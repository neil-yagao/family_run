<template>
	<q-dialog
	 v-model="dialog"
	 maximized
	 persistent
	>
		<q-card>
			<q-card-section style="height:80vh">
				<div :style="imageStyle">
					<img
					 :src="imgSrc"
					 id="image"
					>
				</div>
				<div>
					<q-slider
					 v-model="smallStep"
					 :min="0"
					 :max="1"
					 :step="0.05"
					/>
				</div>
			</q-card-section>
			<q-separator />
			<q-card-actions>
				<q-btn
				 color="grey lighten-4"
				 flat
				 v-close-dialog
				>取消</q-btn>
				<q-space />

				<q-btn
				 color="primary"
				 flat
				 @click="crop"
				>
					确定
				</q-btn>
			</q-card-actions>
		</q-card>
	</q-dialog>
</template>
<script>
import "cropperjs/dist/cropper.css";
import { mapGetters } from "vuex";
import Cropper from "cropperjs";
export default {
	name: "header-cropper",
	data() {
		return {
			dialog: false,
			imgSrc: "",
			croper: "",
			smallStep: 0.4,
			cropperReady: false
		};
	},
	methods: {
		open(file) {
			this.dialog = true;
			this.imgSrc = "";
			let fr = new FileReader();
			fr.onload = res => {
				console.log("res", res);
				this.imgSrc = res.target.result;
			};
			let self = this;
			fr.onloadend = () => {
				const image = document.getElementById("image");
				this.cropper = new Cropper(image, {
					aspectRatio: 1,
					viewMode: 2,
					dragMode: "move",
					ready() {
						console.log("crop ready");
						self.cropperReady = true;
						self.cropper.zoomTo(this.smallStep);
					}
				});
			};
			fr.readAsDataURL(file);
		},
		crop() {
			// Here we are getting the result via callback function
			// and set the result to this.cropped which is being
			// used to display the result above.
			let croppedCanvas = this.cropper.getCroppedCanvas();
			this.dialog = false;
			this.$emit('cropped', croppedCanvas.toDataURL());

		}
	},
	computed: {
		imageStyle() {
			let result = [
				`height:${this.$store.getters.windowHeight * 0.7}px`,
				`width:${this.$store.getters.windowWidth * 0.9}px`
			];
			console.log("imageStyle", result.join(";"));
			return result.join(";");
		}
	},
	watch: {
		smallStep(newVal) {
			if (this.cropperReady) {
				console.log("set zoom to", newVal);
				this.cropper.zoomTo(newVal);
			}
		}
	}
};
</script>
