import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './styles/base.less'
import './styles/iconfont.css'
import Vant from 'vant'
import 'vant/lib/index.css'
// 全局的把vant所有的组件都导入好了
// 导入amfe-flexible库
import 'amfe-flexible'
import HmHeader from './components/HmHeader.vue'
import HmLogo from './components/HmLogo.vue'
import axios from 'axios'

// 把axios挂载到vue的原型
Vue.prototype.$axios = axios
// 给axios配置默认的baseURL ,基准地址
axios.defaults.baseURL = 'http://localhost:3000'

Vue.component('hm-logo', HmLogo)
Vue.component('hm-header', HmHeader)
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
