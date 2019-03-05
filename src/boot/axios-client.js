import axios from 'axios';
let instance = axios.create({
  headers: {
    'content-type': 'application/json'
  }
});
instance.defaults.timeout = 2500;
instance.interceptors.request.use(
  function (config) {
    console.log('sending request:', config);
    return config;
  },
  function (error) {
    console.error('request error', error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    console.log('receive response', response);
    let data = response.data;
    return data.msg;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default instance;