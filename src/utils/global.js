import Vue from 'vue'

// 导入并且注册全局组件
import HmHeader from '../components/HmHeader.vue'
import HmLogo from '../components/HmLogo.vue'
import HmNavItem from '../components/HmNavItem.vue'
Vue.component('hm-logo', HmLogo)
Vue.component('hm-header', HmHeader)
Vue.component('hm-navitem', HmNavItem)
