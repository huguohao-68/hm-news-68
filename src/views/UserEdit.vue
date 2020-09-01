<template>
  <div class="user-edit">
     <hm-header>编辑资料</hm-header>
     <div class="avatar">
       <img :src="$axios.defaults.baseURL + user.head_img" alt="">
     </div>
     <hm-navitem @click="ShowNickname">
       <template >昵称</template>
       <template #content>{{user.nickname}}</template>
     </hm-navitem>
     <hm-navitem  @click="showPassword">
       <template>密码</template>
       <template #content> ******</template>
     </hm-navitem>
     <hm-navitem @click="showGender">
       <template>性别</template>
       <template #content>{{user.gender===1?'男':'女'}}</template>
     </hm-navitem>
     <!-- 开始渲染dailog组件 -->
     <!-- 修改昵称 -->
     <van-dialog v-model="isShow" title="编辑昵称" show-cancel-button @confirm='updateNickname'>
      <van-field  v-model="nickname" placeholder="输入用户名"></van-field>
     </van-dialog>
     <!-- 修改密码 -->
     <van-dialog v-model="isShowPassword" title="修改密码" show-cancel-button @confirm="updatePassword">
      <van-field v-model="password" placeholder="请输入密码" />
     </van-dialog>
      <van-dialog v-model="isShowGender" title="修改性别" show-cancel-button @confirm="updateGender">
      <van-radio-group v-model="gender">
        <van-cell-group>
          <van-cell title="男" clickable @click="gender = 1">
            <template #right-icon>
              <van-radio :name="1" />
            </template>
          </van-cell>
          <van-cell title="女" clickable @click="gender = 0">
            <template #right-icon>
              <van-radio :name="0" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: '',
      isShow: false,
      nickname: '',
      isShowPassword: false,
      password: '',
      isShowGender: false,
      gender: 1
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      // 个人信息
      const userId = localStorage.getItem('userId')
      const res = await this.$axios.get(`/user/${userId}`)
      // console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.user = data
      }
    },
    ShowNickname() {
      // 点击事件
      // console.log(11)
      this.isShow = true
      this.nickname = this.user.nickname
    },
    async updateUser(data) {
      // 封装
      const userId = localStorage.getItem('userId')
      const res = await this.$axios.post(`/user_update/${userId}`, data)
      // console.log(res.data)
      if (res.data.statusCode === 200) {
        // 重新渲染
        this.getUserInfo()
        this.$toast.success('修改成功')
      }
    },
    async updateNickname() {
      this.updateUser({
        nickname: this.nickname
      })
      // console.log(1)
      // 发送修改请求
      // const userId = localStorage.getItem('userId')
      // const res = await this.$axios.post(`/user_update/${userId}`, { nickname: this.nickname })
      // console.log(res)
      // if (res.data.statusCode === 200) {
      //   this.getUserInfo()
      //   this.$toast.success('修改成功')
      // }
    },
    showPassword() {
      // 点击事件
      this.isShowPassword = true
      this.password = this.user.password
    },
    async updatePassword() {
      // console.log(1)
      // 发送修改请求
      this.updateUser({
        password: this.password
      })
      // const userId = localStorage.getItem('userId')
      // const res = await this.$axios.post(`/user_update/${userId}`, { nickname: this.nickname })
      // console.log(res)
      // if (res.data.statusCode === 200) {
      //   this.getUserInfo()
      //   this.$toast.success('修改成功')
      // }
    },
    showGender() {
      this.isShowGender = true
      this.gender = this.user.gender
    },
    updateGender() {
      this.updateUser({
        gender: this.gender
      })
    }
  }
}
</script>

<style lang='less' scoped>
// 1. 给当前的组件所有样式的选择器添加一个属性选择器.
// .vaatar  .avatar[data-v-xxxx]
//2 .给当前的组件的模板中所有的组件添加一个属性,不包括动态生成的data-v-xxxx
//
  .avatar{
         padding: 40px;
         text-align: center;
     img{
       width: 90px;
       height:90px;
       border-radius: 50%;
     }
  }
  // 深选择器
  // css写法>>>
  // less写法/deep/
  // scss写法 ::v-deep
 /deep/ .van-dialog__content {
      padding: 15px ;
      .van-field {
        border: 1px solid #ccc;
      }
    }
</style>
