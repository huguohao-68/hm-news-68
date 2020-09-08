import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/user/Login.vue'
import Register from '../views/user/Register.vue'
import User from '../views/user/User.vue'
import UserEdit from '../views/user/UserEdit.vue'
import Demo from '../views/user/Demo.vue'
import MyFollow from '../views/user/MyFollow.vue'
import MyComment from '../views/user/MyComment.vue'
import MyStar from '../views/user/MyStar.vue'
import Index from '../views/news/Index.vue'
import Manage from '../views/news/Manage.vue'
import PostDetail from '../views/news/PostDetail.vue'
Vue.use(VueRouter)

// 处理全局push异常
const originlPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originlPush.call(this, location).catch(err => err)
}

const routes = [
  { path: '/login', component: Login, name: 'login' },
  { path: '/register', component: Register, name: 'register' },
  { path: '/user', component: User, name: 'user' },
  { path: '/user-edit', component: UserEdit, name: 'user' },
  { path: '/demo', component: Demo, name: 'demo' },
  { path: '/myfollow', component: MyFollow, name: 'myfollow' },
  { path: '/mycomment', component: MyComment, name: 'mycomment' },
  { path: '/mystar', component: MyStar, name: 'mystar' },
  { path: '/', component: Index, name: 'index' },
  { path: '/manage', component: Manage, name: 'manage' },
  { path: '/post-detail/:id', component: PostDetail, name: 'post-detail' }

]
// history:
// 缺点：地址栏带有 # 不美观
// 优点：使用方便，不需要服务器额外的处理
// hash：
// 优点： 地址栏好看，，更像真实的url地址，不带有#
// 缺点：在项目打包上线的时候，需要服务器额外的处理。 apache node nginx      linux
const router = new VueRouter({
  routes,
  mode: 'history'
})
// 配置全局的导航守卫
// to:从哪里来  from: 到哪里去  next: 函数 代表是否放行
// 判断:to的path是否是/user 判断用户是否去个人中心
// 1. 如果不是去个人中心 next()放行
// 2. 如果是去个人中心 则需要查询token
// 如果有token 就放行
// 没有token ,就直接跳转去登录页面
router.beforeEach(function(to, from, next) {
//  这是一个全局的导航守卫 只要发生了跳转,跳转之前这个函数就需要执行
  // console.log('to', to)
  // console.log('from', from)
  // next()
  const token = localStorage.getItem('token')
  // 可能拦截的页面比较多可以放在一个数组里面
  const authUrls = ['/user', '/user-edit', '/myfollow', '/mycomment', '/mystar']
  // 获取token  判断不是去user或者有通行证token都允许执行,不满足条件直接返回登录界面
  if (!authUrls.includes(to.path) || token) {
    next()
  } else {
    router.push('/login')
    // 这里会遇到遇到一个错误.没有token去往user会被拦截,等于login页面往login页面跳转,或者有重复错误: Uncaught (in promise) NavigationDuplicated: Avoided redundant navigation to current location: "/login".(csdn解决方案)
  }
})

export default router
