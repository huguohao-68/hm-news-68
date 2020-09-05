<template>
  <div class="mystar">
      <hm-header>我的收藏</hm-header>
      <div class="list">
         <div class="item" v-for="item in list" :key='item.id'>
           <div class="info">
               <div class="title">{{item.title}}</div>
               <div class="user">
                   <span>{{item.user.nickname}}</span>
                   <span>{{item.comments.length}}跟帖</span>
               </div>
           </div>
           <div class="img">
               <img :src="$url(item.cover[0].url)" alt="">
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
  methods: {
    async getStarList() {
      const res = await this.$axios.get('/user_star')
      console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
        console.log(this.list)
      }
    }
  },
  created() {
    this.getStarList()
  }
}

</script>

<style lang='less' scoped>
 .item{
     border-bottom: 1px solid #ccc;
     padding: 10px;
     display:flex ;
     .info{
        flex: 1;
        font-size: 16px;
        display: flex;
        flex-direction: column;
        //设置flex布局. 转轴 贴边
        justify-content: space-between;
        .user{
            color: #666;
            font-size: 14px;
            span:first-child {
               margin-right: 10px;
      }
        }
     }
     img{
        // 单纯的设置宽高会导致图片失真
         width: 120px ;
         height:74px ;
         object-fit:contain;
          // 作用和background-size类似，，设置图片的大小
          // cover的缺点：保证图片覆盖完整的大小， 缺点：会有一部分被截取掉
          // contain: 保证图片被完整的显示，会有留白
     }
 }
</style>
