<template>
  <div>
    <hm-header>注册</hm-header>
    <hm-logo></hm-logo>

    <van-form @submit="register">
      <van-field
        v-model="user.username"
        label="账号"
        placeholder="请输入你的账号"
        :rules="rules.username"
      />
      <van-field
        v-model="user.nickname"
        label="昵称"
        placeholder="请输入你的昵称"
        :rules="rules.nickname"
      />
      <van-field
        v-model="user.password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        :rules="rules.password"
      />
      <div style="margin: 16px;">
        <van-button block type="info" native-type="submit">
          注册
        </van-button>
      </div>

      <p class="tips">
        已有账号？去<router-link to="/login">登录</router-link>
      </p>
    </van-form>
  </div>
</template>

<script>
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
    register() {
      console.log(1)
    }
  }
}
</script>

<style></style>
