import Vue from 'vue'
import moment from 'moment'
Vue.filter('time', input => {
  return moment(input).format('YYYY-MM-DD')
})
