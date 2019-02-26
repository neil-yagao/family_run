<template>
	<div>
		<q-input
		 v-if="showInput"
		 dense
		 :label="title"
		 v-model="selectedDate"
		 mask="date"
		 @click="showDatePicker()"
		>
			<template v-slot:before>
				<q-icon
				 name="event"
				 class="cursor-pointer"
				 @click="showDatePicker()"
				>
				</q-icon>
			</template>
		</q-input>
		<q-dialog
		 v-model="prompt"
		 persistent
		>
			<q-card
			 :flat="true"
			 class="q-pa-none"
			>
				<q-card-section>
					<div class="text-h6">{{title}}</div>
				</q-card-section>

				<q-card-section class="no-shadow">
					<q-date
					 class="no-shadow full-height"
					 v-model="selectedDate"
					 minimal
					/>
				</q-card-section>
				<q-card-actions
				 align="right"
				 class="text-primary"
				>
					<q-btn
					 flat
					 label="取消"
					 v-close-dialog
					/>
					<q-btn
					 flat
					 label="确定"
					 @click="emitValue()"
					 v-close-dialog
					/>
				</q-card-actions>
			</q-card>
		</q-dialog>
	</div>
</template>
<script>
import { date } from "quasar";

export default {
	name: "GeneralDatePicker",
	data() {
		return {
			prompt: false,
			selectedDate: ""
		};
	},
	methods: {
		emitValue() {
			let consistedDate = this.selectedDate.replace(/\//g, "-");
			this.$emit("input", consistedDate);
			this.$emit("selected-date", consistedDate);
			this.prompt = false;
		},
		showDatePicker() {
			this.prompt = true;
		}
	},
	props: {
		value: {
			type: String
		},
		title: {
			type: String,
			default: "完成日期"
		},
		showInput: {
			type: Boolean,
			default: true
		}
	},
	watch: {
		value(newValue) {
			this.selectedDate = newValue.replace(/\-/g, "/");
		}
	},
	mounted() {
		this.selectedDate = this.value
			? this.vaule
			: date.formatDate(Date.now(), "YYYY/MM/DD");
		let consistedDate = this.selectedDate.replace(/\//g, "-");
		this.$emit("input", consistedDate);
	}
};
</script>

