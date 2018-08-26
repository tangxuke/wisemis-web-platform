import axios from 'axios'

axios.defaults.baseURL='http://localhost:3000/';
axios.defaults.withCredentials=true;

axios.interceptors.response.use(res => {
  return res.data
}, err => {
  return Promise.reject(err)
})


//Vue.prototype.$axios = axios

export default axios