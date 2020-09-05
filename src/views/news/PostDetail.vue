<template>
  <div class="post-detail">
        <div class="header">
            <div class="left" @click="$router.back()">
                <span class="iconfont iconjiantou"></span>
            </div>
            <div class="center">
                <span class="iconfont iconnew"></span>
            </div>
            <div class="right">
                <div class="folowed" v-if="false">已关注</div>
                <div class="follow">关注</div>
            </div>
        </div>
         <div class="content">
           <div class="title">{{post.title}}</div>
           <div class="name">
             <span>{{post.user.nickname}}</span>
             <span>{{post.create_date | time}}</span>
           </div>
           <div v-if="post.type === 1" class="info" v-html="post.content"></div>
           <video v-else :src="getUrl(post.content)" controls autoplay muted></video>

           <div class="buttons">
             <div class="good">
               <span class="iconfont icondianzan"></span>
               <span>112</span>
             </div>
             <div class="share">
               <span class="iconfont iconweixin"></span>
               <span>微信</span>
             </div>
           </div>
       </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: {
        user: {}
      }
    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    async getInfo() {
      const { id } = this.$route.params
      const res = await this.$axios.get(`post/${id}`)
      console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.post = data
        console.log(this.post)
      }
    },
    // 转换为可以直接识别的文件,不带标签
    getUrl(url) {
      const div = document.createElement('div')
      div.innerHTML = url
      return div.innerText
    }
  }
}
</script>

<style lang='less' scoped>
 .header{
      display:flex;
      padding: 0 10px;
      border-bottom: 1px solid #ccc;
      height: 50px;
      align-items: center;

       .left{
           span{
           line-height: 50px;
           }
       }
       .center{
          flex: 1;
           span{
                font-size: 50px;
                }
       }
       .right{
            font-size: 14px;
           div{
               width: 60px;
               height: 30px;
               line-height: 30px;
               text-align: center;
               border-radius: 15px;
           }
           .folowed{
               border: 1px solid #ccc;
           }
           .follow{
                color: #fff;
                background-color: #f00;

           }
       }
 }
 .content {
  padding: 10px;
  .title {
    font-weight: 700;
    font-size: 18px;
  }
  .name {
    font-size: 14px;
    color: #666;
    margin: 10px 0;
    span:first-child {
      margin-right: 20px;
    }
  }

  .info {
    font-size: 14px;
    /deep/ img {
      width: 100%;
    }
  }
  video {
    width: 100%;
  }
  .buttons {
    padding: 20px 0;
    display: flex;
    justify-content: space-around;
    > div {
      width: 120px;
      height: 40px;
      line-height: 40px;
      border-radius: 20px;
      border: 1px solid #ccc;
      text-align: center;
      font-size: 16px;
      .iconfont {
        font-size: 18px;
        margin-right: 5px;
      }
      .iconweixin {
        color: lime;
      }
    }
  }

}
</style>
