import axios from '../boot/axios-client';


let BaseUrl = process.env.BASE_URL

export default function () {
	return {
		upload(file, type, id) {
			let formData = new FormData();
			formData.append('file', file);
			formData.append('name', file.name);
			formData.append('type', type)
			formData.append('relatedId', id);
			formData.append('time', Date.now());
			return axios
				.post(BaseUrl + '/upload/' + type + '/' + id, formData, {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				})
				.then((res) => {
					console.log('SUCCESS!!', res);
					return res;
				})
				.catch(function () {
					console.log('FAILURE!!');
				});
		}
	}
}