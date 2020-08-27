import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入通用的样式
import './styles/base.less'
import './styles/iconfont.css'
// 导入vant
import Vant from 'vant'

// import { Button } from 'vant'
import 'vant/lib/index.css'

// 全局的把vant所有的组件都导入好了
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
