<template>
  <div class="user-edit">
     <hm-header>编辑资料</hm-header>
     <div class="avatar">
       <img :src="$axios.defaults.baseURL + user.head_img" alt="">
       <van-uploader :after-read="afterRead" />
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
      <van-field  v-model="nickname" ref="nickname" placeholder="输入用户名"></van-field>
     </van-dialog>
     <!-- 修改密码 -->
     <!-- ref可以给一个dom对象或者一个组件添加一个引用|
          在组件中 ,可以通过this.$refs可以获取得到所有当前组件的引用
      -->
     <van-dialog v-model="isShowPassword" title="修改密码" show-cancel-button @confirm="updatePassword">
      <van-field v-model="password" ref="password" placeholder="请输入密码" />
     </van-dialog>
     <!-- 修改性别 -->
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
     <!-- 裁剪的模态框 -->
    <div class="mask" v-show="isShowMask">
      <van-button type="primary" class="crop" @click="crop">裁剪</van-button>
      <van-button type="danger" class="cancel" @click="isShowMask = false">取消</van-button>
      <VueCropper
        ref="aa"
        :img="img"
        autoCrop
        autoCropWidth="100"
        autoCropHeight="100"
        fixed
      ></VueCropper>
    </div>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
export default {
  components: {
    VueCropper
  },
  data() {
    return {
      user: '',
      isShow: false,
      nickname: '',
      isShowPassword: false,
      password: '',
      isShowGender: false,
      gender: 1,
      // 是否显示裁剪框
      isShowMask: false,
      img: ''
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
    async ShowNickname() {
      // 点击事件
      // console.log(11)
      this.isShow = true
      this.nickname = this.user.nickname
      await this.$nextTick()
      this.$refs.nickname.focus()
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
    async showPassword() {
      // 点击事件
      this.isShowPassword = true
      this.password = this.user.password
      await this.$nextTick()
      this.$refs.password.focus()
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
    // 性别
    showGender() {
      this.isShowGender = true
      this.gender = this.user.gender
    },
    updateGender() {
      this.updateUser({
        gender: this.gender
      })
    },
    // 上传图片
    isImg(name) {
      if (name.endsWith('.git') || name.endsWith('.jpeg') || name.endsWith('.jpg') || name.endsWith('.png')) {
        return true
      } else {
        return false
      }
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      // 在实际上传之前需要校验上传文件的格式和大小.同时可以提前设置一个判断 isImg(){}
      // console.log('文件读取完毕', file)
      if (!this.isImg(file.file.name)) {
        return this.$toast.fail('请注意文件格式')
      }
      if (file.file.size >= 200 * 1024) {
        return this.$toast.fail('文件过大')
      }
      // 显示裁剪框
      this.isShowMask = true
      // 设置裁剪的图片
      this.img = file.content
    },
    // 现在只能简单的读取文件,需要上传到服务器 属性是 file.file
    // 如果是通过ajax上传,请求体不能是一个简单的普通对象,需要是一个fromData对象/
    // 所以说需要提前创建一个fromData对象
    crop() {
      this.$refs.aa.getCropBlob(async blob => {
        const fd = new FormData()
        fd.append('file', blob)
        const res = await this.$axios.post('/upload', fd)
        console.log(res.data)
        const { statusCode, data } = res.data
        if (statusCode === 200) {
          console.log(data.url)
          // 重新调用上面封装的函数,获得个人信息,修改个人头像
          this.updateUser({
            head_img: data.url
          })
        }
        // 隐藏裁剪框
        this.isShowMask = false
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
         position: relative;
     img{
       width: 90px;
       height:90px;
       border-radius: 50%;
     }
    //  这是上传头像的覆盖罩.定位覆盖在头像上,使透明度为0
     .van-uploader{
       position: absolute;
       left: 52%;
       top: 43px;
       transform: translate(-50%);
       width: 100px;
       height: 100px;
      opacity: 0;
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
      .mask {
    width: 100%;
    height: 100%;
    z-index: 999;
    position: fixed;
    top: 0;
    left: 0;
    .crop,
    .cancel {
      position: fixed;
      top: 0;
      z-index: 1;
    }

    .cancel {
      right: 0;
    }
  }
</style>
