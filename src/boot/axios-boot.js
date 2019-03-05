import axiosClient from './apollo-client'

export default ({ app }) => {
	app.axios = axiosClient;
};