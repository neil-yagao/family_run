export default {
    state:{
		width:'',
		height:''
	},
	mutations:{
		windowResize(state, newSize){
			state.width = newSize.width;
			state.height = newSize.height;
		}
	},
	getters:{
		windowWidth(state){
			return state.width;
		},
		windowHeight(state){
			return state.height;
		}
	}
}
