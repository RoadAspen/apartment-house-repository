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
request.interceptors.response.use(
  (res) => {
    if (res.status === 200) {
      return res.data;
    } else if (res.status === 401) {
      console.log('无权限');
    } else {
      return Promise.reject(res.data);
    }
  },
  (error) => {
    return Promise.reject(error.response);
  }
);
// // 响应拦截器
// request.interceptors.response.use(
//   (res) => {
//     if (res.status === 200 && res.data?.code === 'A001') {
//       return res.data.data;
//     } else if (res.status === 401) {
//       console.log('无权限');
//     } else {
//       return Promise.reject(res.data);
//     }
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
/** 拼接url */
export const getUrlByParams = (
  url: string,
  params: { [key: string]: string | number | boolean }
) => {
  console.log('getUrlByParams getUrlByParams', params);
  const keys = Object.keys(params);
  if (!keys.length) return url;
  const searchParams = keys.reduce(
    (prevParam, key) =>
      `${prevParam}${prevParam ? '&' : ''}${key}=${params[key]}`,
    ''
  );
  console.log(searchParams);

  return `${url}?${searchParams}`;
};

export default request;
