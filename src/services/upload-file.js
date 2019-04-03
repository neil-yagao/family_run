import axios from '../boot/axios-client';


export default function () {
  return {
    upload(file, type, id) {
      let formData = new FormData();
      formData.append('file', file);
      formData.append('name', file.name);
      formData.append('type', type)
      formData.append('relatedId', id);
      formData.append('time', Date.now());
      return axios.post('/image/upload/' + type + '/' + id, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((res) => {
          console.log('SUCCESS!!', res);
          return this.process(res.id);
        })
        .catch(function () {
          console.log('FAILURE!!');
        });
    },
    process(id) {
      if(!id){
        return
      }
      return axios.post('/image/process/' + id, [{
        name: 'head',
        width: 400
      }, {
        name: 'avatar',
        width: 80
      }]).then(res => {
        console.log('process success!!', res);
        return res
      })
    }
  }
}
