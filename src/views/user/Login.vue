<template>
  <div>
    <hm-header>登录</hm-header>
    <hm-logo></hm-logo>
    <van-form @submit="login">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="请输入您的用户名"
        :rules="rules.username"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="请输入您的密码"
        :rules="rules.password"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
      <p class="tips">
        没有账号？去
        <router-link to="/register">注册</router-link>
      </p>
    </van-form>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  created() {
    // console.log(this.$route)
    this.username = this.$route.params.username
    this.password = this.$route.params.password
  },
  methods: {
    async login() {
      const res = await this.$axios.post('/login', {
        username: this.username,
        password: this.password
      })
      // console.log(res.data)
      const { statusCode, message, data } = res.data
      if (statusCode === 200) {
        // 先要保存token
        // 在跳转至个人中心
        localStorage.setItem('token', data.token)
        localStorage.setItem('userId', data.user.id)
        this.$toast.success(message)
        // 跳转到个人中心
        // this.$router.push('/user')
        // this.$router.back()
        if (this.$route.query.back) {
          this.$router.back()
        } else {
          this.$router.push('/user')
        }
      } else {
        this.$toast.fail('登录失败')
      }
    }
  },
  data() {
    return {
      username: '',
      password: '',
      rules: {
        username: [
          { required: true, message: '请填写用户名', trigger: 'onChange' },
          {
            pattern: /^\d{5,11}$/,
            message: '用户长度是5-11位数字',
            trigger: 'onChange'
          }
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'onChange' },
          {
            pattern: /^\d{3,9}$/,
            message: '请输入3到9位数字',
            trigger: 'onChange'
          }
        ]
      }
    }
  }
}
</script>

<style lang="less" scoped>
.tips {
  padding: 15px;
  font-size: 16px;
  text-align: right;
  a {
    color: orange;
  }
}
</style>
