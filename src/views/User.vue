<template>
  <div class='user'>
    <div class="header" @click="$router.push('/user-edit')">
      <div class="avater">
          <img :src="base + user.head_img" alt="">
            <!-- <img src="../assets/24.jpg" alt=""> -->
      </div>
      <div class="info">
          <div class="name">
            <span v-if="user.gender===1" class="iconfont iconxingbienan"></span>
            <span  v-else class="iconfont iconxingbienv"></span>
             <span>{{user.nickname}}</span>
          </div>
          <div class="time">
              {{user.create_date | time}}
          </div>
      </div>
      <div class="allow">
          <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
    <hm-navitem to="/myfollow">
      <template>我的关注</template>
      <template #content>关注的内容</template>
    </hm-navitem>
    <hm-navitem to='/mycomment'>
      <template>我的跟帖</template>
      <template #content>跟帖/回复</template>
    </hm-navitem>
    <hm-navitem to='/mystar'>
      <template >我的收藏</template>
      <template #content>文章/视频</template>
    </hm-navitem>
    <hm-navitem to='/user-edit'>设置</hm-navitem>
    <div style="margin:15px">
      <van-button  type="primary" block @click="logout">退出</van-button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    base() { return this.$axios.defaults.baseURL }

  },

  data() {
    return {
      user: ''
    }
  },
  async created() {
    // token必须放到请求头中  请求头 Authorization
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const res = await this.$axios.get(`/user/${userId}`, {
      headers: {
        Authorization: token
      }
    })
    // console.log(res)
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      this.user = data
    }
  },
  methods: {
    async logout() {
      // 弹框提示
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '滚不滚?'
        })
      } catch {
        return this.$toast({
          message: '取消退出',
          position: 'bottom'
        })
        // Toast({
        //   message: '底部展示',
        //   position: 'bottom'
        // })
      }
      // 说明点了确定
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      this.$router.push('/login')
      this.$toast({
        message: '退出成功',
        position: 'bottom'
      })
    }
  }
}
</script>

<style lang='less' scoped>
.user{
  .header{
    display: flex;
    align-items: center;
    padding: 20px 10px;
    border-bottom: 3px solid #ddd;
    .avater{
            width: 70px;
            height: 70px;
        img{
            border-radius: 50%;
            height: 100%;
            width: 100%;
        }
      }
    .info{
            flex:1;
            padding-left:10px;
            font-size: 14px;
      }
      .time{
          margin-top: 10px;
          color:#666;
      }
      .iconxingbienan {
         color: #7bbcec;
       }
       .iconxingbienv {
         color: pink;
       }
    }
}
</style>
