export default function taskTemplate(defaultAssignment) {
	return {
		title: "",
		dueDate: "",
		description: "",
		status: "onGoing",
		visible:1,
		assignTo:defaultAssignment?defaultAssignment:[]
	};
}