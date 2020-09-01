<template>
  <div>
    <hm-header>注册</hm-header>
    <hm-logo></hm-logo>

    <van-form @submit="register">
      <van-field v-model="user.username" label="账号" placeholder="请输入你的账号" :rules="rules.username" />
      <van-field v-model="user.nickname" label="昵称" placeholder="请输入你的昵称" :rules="rules.nickname" />
      <van-field
        v-model="user.password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        :rules="rules.password"
      />
      <div style="margin: 16px;">
        <van-button  round block type="info" native-type="submit">注册</van-button>
      </div>

      <p class="tips">
        已有账号？去
        <router-link to="/login">登录</router-link>
      </p>
    </van-form>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  data() {
    return {
      user: {
        username: '',
        nickname: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请填写用户名', trigger: 'onChange' },
          {
            pattern: /^\d{5,11}$/,
            message: '用户名长度是5-11位数字',
            trigger: 'onChange'
          }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'onChange' },
          {
            pattern: /^\d{3,9}$/,
            message: '密码长度是3-9位数字',
            trigger: 'onChange'
          }
        ],
        nickname: [
          // 不能为空  必须是2-6位的中文
          { required: true, message: '昵称不能为空', trigger: 'onChange' },
          {
            pattern: /^[\u4e00-\u9fa5]{2,6}$/,
            message: '昵称必须是2-6位的中文',
            trigger: 'onChange'
          }
        ]
      }
    }
  },
  methods: {
    async register() {
      // console.log('注册')
      const res = await this.$axios.post('/register', this.user)
      // console.log(res)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        // this.$router.push(`/login?username=${this.user.username}&password=${this.user.password}`)
        this.$router.push({
          name: 'login',
          params: {
            username: this.user.username,
            password: this.user.password
            // this.user
          }
        })
      } else {
        this.$toast.fail(message)
      }
    }
  }
}
</script>

<style lang="less" scoped>
// scoped的原理:
//1.给当前的模板里所有的元素添加一个特殊的属性:data-v-xxx
//2.给当前的模板里所有的选择器早增加一个属性选择器
//  div[data-v-xxxx] .tips[data-v-xxxx]
.tips {
  padding: 15px;
  font-size: 16px;
  text-align: right;
  a {
    color: orange;
  }
}
</style>
