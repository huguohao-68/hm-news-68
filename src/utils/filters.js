import Vue from 'vue'
import moment from 'moment'

Vue.filter('time', input => {
  return moment(input).format('YYYY-MM-DD')
})
// Vue.filter('time', (input, str = 'YYYY-MM-DD') => {
//   return moment(input).format(str)
// })

// 给moment设定全局的语言
moment.locale('zh-CN')
// monent.js 时间格式化
// fromNow是指操作的时间距离现在有多久
Vue.filter('now', input => {
  return moment(input).fromNow()
})
