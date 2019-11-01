import axios from 'axios'
import { common } from './common.js'
import { Loading, Message } from 'element-ui'

const loadingOptions = {
  lock: true,
  text: 'Loading',
  spinner: 'el-icon-loading',
  background: 'rgba(255, 255, 255, 0.0)',
  customClass: 'loading-zindex'
};
const URL = process.env.BASE_API;

export default {
  get: async (url, param) => {
    url = URL + url;
    if (param) {
      url += '?' + common.serialize(param)
    }

    let rconfig = {
      headers: {
        'webToken': common.getToken()
      },
    };


    return  await axios.get(url,rconfig);
  },
  post: async (url, data = {}) => {
    let rconfig = {
      headers: {
        'webToken': common.getToken()
      },
    };
    url = URL + url;
    return await axios.post(url, data,rconfig);
  },

}

axios.interceptors.response.use(function (response) {
  return response
}, function (err) {
  const loading = Loading.service(loadingOptions)
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = '请求错误(400)'
        break
      case 401:
        err.message = '登录失效，请重新登录(401)'
        // router.push('/login')
        break
      case 403:
        err.message = '拒绝访问(403)'
        break
      case 404:
        err.message = '请求出错(404)'
        break
      case 408:
        err.message = '请求超时(408)'
        break
      case 500:
        err.message = '服务器错误(500)'
        break
      case 501:
        err.message = '服务未实现(501)'
        break
      case 502:
        err.message = '网络错误(502)'
        break
      case 503:
        err.message = '服务不可用(503)'
        break
      case 504:
        err.message = '网络超时(504)'
        break
      case 505:
        err.message = 'HTTP版本不受支持(505)'
        break
      default:
        err.message = `连接出错(${err.response.status})!`
    }
  } else {
    Message({
      message: '连接服务器失败!',
      type: 'error'
    })
  }
  setTimeout(() => {
    loading.close()
  }, 1000)
  return Promise.reject(err)
})
