import axios from 'axios';
const request = axios.create({
  timeout: 5000
});
// 请求拦截器
request.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// 响应拦截器
request.interceptors.response.use(
  (res) => {
    if (res.status === 200 && res.data?.code === 'A001') {
      return res.data.data;
    } else if (res.status === 401) {
      console.log('无权限');
    } else {
      return Promise.reject(res.data);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default request;
