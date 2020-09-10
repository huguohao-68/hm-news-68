import Vue from 'vue'
import router from '../router'
import axios from 'axios'
import { Toast } from 'vant'
// 把axios挂载到vue的原型
Vue.prototype.$axios = axios
// 给axios配置默认的baseURL ,基准地址
const URL = 'http://localhost:3000'
axios.defaults.baseURL = '/abc'
Vue.prototype.$base = URL
// 现在给axuos配置拦截器
axios.interceptors.request.use(function(config) {
  // config代表请求信息
  // console.log('拦截到了请求', config)
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})

axios.interceptors.response.use(function(response) {
  // console.log('拦截到了响应', response)
  const { statusCode, message } = response.data
  if (statusCode === 401 && message === '用户信息验证失败') {
    // 需要三个操作
    // 1. 跳转会登录页面
    router.push('/login')
    // 2. 清除失效的信息
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    // 3. 给提示 ,用户验证失败
    Toast.fail('登录信息失效')
  }
  return response
})
Vue.prototype.$url = function(url) {
  if (url.startsWith('http')) {
    return url
  } else {
    return URL + url
  }
}
