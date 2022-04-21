import axios from 'axios';
import { message, Modal, Layout } from 'antd';
import { baseUrl } from '@/config/envconfig';
import { oauth_logout } from '@/api/login.js';
import { Cookie } from '@/utils/storage.js'
import eventBus from '@/utils/eventBus.js'
import { oauth_client } from '@/api/login.js';
axios.defaults.baseURL = baseUrl;
axios.defaults.timeout = 60000;
axios.defaults.withCredentials = true;
//// 
var CancelToken = axios.CancelToken;
//配置取消数组
const urls = ['/manage/community/queryNodeRelationList', '/manage/community/dispatch/station']
let pending = []
let removePending = (ever) => {
  for (let p in pending) {
    if (pending[p].u === ever.url + '&' + ever.method) { //当当前请求在数组中存在时执行函数体
      pending[p].f(); //执行取消操作
      // @ts-ignore
      pending.splice(p, 1); //把这条记录从数组中移除
    }
  }
}
////
/**
 * 如果有多个请求都是 403 就需要这个开关 来控制message的展示个数
 * 展示一个之后  关闭阀门
 */
let messageFlag = false;
/**
 * props是app.js页面传入的 this.props
 * 用于路由跳转  当403的时候 进行路由跳转
 */
let props = "";

/**
 * 当使用这个js的时候 会监听这个自定义事件
 * 改变props的值 
 */
eventBus.$on((propsObj) => {
  props = propsObj
}, 'axiosInterceptorsFun')

const goLoginFun = (value) => {
  if (messageFlag === false) {
    if (value.config.url !== "/manage/users/current") {
      message.error("登录已过期，请重新登录！");
    }
    messageFlag = true;
    setTimeout(() => {
      messageFlag = false
    }, 2000)
    // 401 登录过期，跳转登录
    // if(value.config.url === "/manage/users/current"){
    //     var paramsString = window.location.search;
    //     var searchParams = new URLSearchParams(paramsString);
    //     if (searchParams.get("code")) {
    //         props.loginUser(searchParams.get("code")).then(res => {
    //             props.getUser().then(res=>{

    //             }).catch(err=>{

    //             })
    //         }).catch(err => {
    //             goOauth();
    //         })
    //     }else{
    //         goOauth();
    //     }
    // }else{
    //     goOauth();
    // }
    goOauth();
  }
}
function goOauth () {
  let protocol = document.location.protocol, hostname = document.location.hostname;
  oauth_client().then(res => {
    var params = new URL(window.location.href);
    params.searchParams.delete('code');
    params.searchParams.delete('url');
    params.searchParams.set('url', params.toString());
    // @ts-ignore
    var href = (hostname == 'localhost') ? (protocol + '//' + hostname + ':8001/') : res.oauthUrl + '/';
    window.location.href = href + '?platform=' + 'robot' + '&redirect_uri=' + encodeURIComponent(params.toString())
      // @ts-ignore
      + '&client_id=' + res.clientId + '&response_type=' + res.responseType + '&scope=' + res.scope + '&domain=' + res.domainId;
  }).catch(err => {

  })
}
// http request 拦截器
axios.interceptors.request.use(config => {
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
axios.interceptors.response.use(response => {
  removePending(response.config)
  // @ts-ignore
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
function accessFunction () {
  if (document.getElementsByClassName('ant-modal-root').length === 0) {
    Modal.confirm({
      title: '提示',
      content: '未授权，请先登出，重新登录！',
      okText: '确认',
      cancelText: '取消',
      onOk () {
        // 登出接口
        oauth_logout().then(res => {
          var obj = { currentIndex: null, communityId: null, isMove: false }, obj2 = { robotId: null, communityId: null };
          window.sessionStorage.setItem('stayCommunityObj', JSON.stringify(obj));
          window.sessionStorage.setItem('stayRobotObj', JSON.stringify(obj2));
          Cookie.remove('ycpwd')
          window.localStorage.removeItem('user')
          window.sessionStorage.setItem('sceneEditId', '');
          window.location.reload()
        })
      },
      onCancel () {
      },
    });
  }
}
export default axios