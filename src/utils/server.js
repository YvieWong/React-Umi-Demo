import axios from 'axios';
import { message } from 'antd';


const request = axios.create({
  baseURL: '',
  timeout: 60000,
  withCredentials: true
})


var CancelToken = axios.CancelToken;
//配置取消数组
const urls = []
let pending = []
let removePending = (ever) => {
  for (let p in pending) {
    if (pending[p].u === ever.url + '&' + ever.method) { //当当前请求在数组中存在时执行函数体
      pending[p].f(); //执行取消操作
      pending.splice(p, 1); //把这条记录从数组中移除
    }
  }
}

//请求拦截器
request.interceptors.request.use(config => {
  config.responseType = config.responseType ? config.responseType : 'json';
  removePending(config);
  if (urls.includes(config.url)) {
    config.cancelToken = new CancelToken((c) => { // executor 函数接收一个 cancel 函数作为参数
      // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
      pending.push({ u: config.url + '&' + config.method, f: c });
    })
  }
  return config
}, error => {
  Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use(response => {
  console.log(response, 111);
  removePending(response.config)
  if (parseInt(response.status / 100) == 2) {
    return Promise.resolve(response.headers["x-total-count"] ? { data: response.data, total: response.headers["x-total-count"] * 1 } : (response.data ? response.data : response));
  } else {
    message.error(response.data.message)
    return Promise.reject(response.data);
  }
}, error => {
  console.log('error', error.response)
  if (error.response.status == 401) {
    goLoginFun(error.response);
  } else {
    if (error.response.data && error.response.data.error) {
      message.error(error.response.data.error);
    }
    if (error.response.data && error.response.data.message) {
      message.error(error.response.data.message);
    }
  }
  return Promise.reject(error.response);
})


export default request