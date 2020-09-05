<template>
  <div class="myfollow">
   <hm-header>我的关注</hm-header>
   <div class="list">
       <div class="item"  v-for="item in list" :key="item.id">
           <div class="left">
               <img :src="$base + item.head_img" alt="">
           </div>
           <div class="center">
               <p>{{item.nickname}}</p>
               <p>{{item.create_date |time}}</p>
           </div>
           <div class="right">
               <van-button type="primary" round size="small" @click="unfollow(item.id)">取消关注</van-button>
           </div>
       </div>
   </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    }
  },
  created() {
    this.getFollowList()
  },
  //   async created() {
  //     const res = await this.$axios.get('/user_follows')
  //     console.log(res.data)
  //     const { statusCode, data } = res.data
  //     if (statusCode === 200) {
  //       this.list = data
  //     }
  //   },
  methods: {
    async getFollowList() {
      const res = await this.$axios.get('/user_follows')
      console.log(res.data)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
      }
    },
    async unfollow(id) {
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '取不取关啊?给个准信!'
        })
      } catch {
        return this.$toast('取消操作')
      }
      const res = await this.$axios.get(`/user_unfollow/${id}`)
      console.log(res.data)
      if (res.data.statusCode === 200) {
        this.$toast.success('取关成功')
        this.getFollowList()
      }
    }
  }
}
</script>

<style lang='less' scoped>
  .item{
      display:flex;
      height: 85px;
      border-bottom:1px solid #ccc;
      align-items:center;
      padding: 0 20px;
      img{
          width: 50px;
          height: 50px;
          border-radius: 50%;
      }
      .center{
          flex:1;
          padding: left 10px;
          font-size: 16px;
      }
  }
</style>
