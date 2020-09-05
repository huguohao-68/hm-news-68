<template>
  <div class="hm-post" @click="$router.push(`/post-detail/${post.id}`)">
    <!-- 视频 -->
     <div class="video-post" v-if="post.type===2">
         <div class="title">{{post.title}}</div>
         <div class="video">
             <span class="iconfont iconshipin"></span>
            <img :src="$url(post.cover[0].url)" alt="">
         </div>
         <div class="user">
           <span>{{post.user.nickname}}</span>
           <span>{{post.comment_length}}跟帖</span>
         </div>
       </div>
       <!-- 单张 -->
     <div class="single-img-post"  v-else-if="post.cover.length < 3">
      <div class="info">
        <div class="title">{{post.title}}</div>
        <div class="user">
          <span>{{post.user.nickname}}</span>
          <span>{{post.comment_length}}跟帖</span>
        </div>
      </div>
      <div class="img">
        <img :src='$url(post.cover[0].url)' alt="">
      </div>
    </div>
    <!-- 三张 -->
    <div class="multiple-img-post" v-else>
         <div class="title">{{post.title}}</div>
         <div class="imgs">
           <img :src="$url(post.cover[0].url)" alt="">
           <img :src="$url(post.cover[1].url)" alt="">
           <img :src="$url(post.cover[2].url)" alt="">
         </div>
         <div class="user">
           <span>{{post.user.nickname}}</span>
           <span>{{post.comment_length}}跟帖</span>
         </div>
       </div>

     </div>
</template>

<script>
export default {
  props: {
    post: Object
  }
}
</script>

<style lang="less" scoped>
.user {
      color: #666;
      font-size: 14px;
      span:first-child {
        margin-right: 10px;
      }
    }
.single-img-post {
  border-bottom: 1px solid #ccc;
  padding: 10px;
  display: flex;
  .info {
    flex: 1;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .img {
    img {
      width: 120px;
      height: 74px;
      // 作用和background-size类似，，设置图片的大小
      // cover的缺点：保证图片覆盖完整的大小， 缺点：会有一部分被截取掉
      // contain: 保证图片被完整的显示，会有留白
      object-fit: cover;
    }
  }
}
.multiple-img-post {
  border-bottom: 1px solid #ccc;
  padding: 10px;
  .title {
    font-size: 16px;
  }
  .imgs {
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    img {
      width: 112px;
      height: 74px;
      object-fit: cover;
    }
  }
}
 .video-post{
   border: 1px solid #cccccc;
   padding: 10px;
   .title{
     font-size: 16px;
   }
   .video{
       position: relative;
       padding: 10px 0;
       img{
         width: 100%;
         height: 170px;
         object-fit: cover;
       }
        span{
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50% ,-50%);
          font-size: 40px;
          width: 50px;
          height: 50px;
          background-color: rgba(255,255,255, .5);
         text-align: center;
         border-radius: 50%;
         line-height: 50px;
        }
    }
}

</style>
