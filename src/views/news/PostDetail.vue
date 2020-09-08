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
                <div class="folowed" v-if="post.has_follow" @click="unfollow">已关注</div>
                <div class="follow" v-else @click="follow">关注</div>
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

           <div class="buttons" >
             <div class="good">
               <span class="iconfont icondianzan"></span>
               <span :class="{active: post.has_like}"  @click="like">{{post.like_length}}</span>
             </div>
             <div class="share">
               <span class="iconfont iconweixin"></span>
               <span>微信</span>
             </div>
           </div>
       </div>
      <div class="comment-list">
           <h3>精彩跟帖</h3>
           <!-- :comment='comment' 将具体的评论内容渲染给comment -->
           <hm-comment
           :comment='comment'
            v-for="comment in
            commentList"
            :key="comment.id"
            @reply='onreply'
            >组件</hm-comment>
       </div>
        <div class="footer-textarea" v-if="isShowTextArea">
         <textarea  @blur="onBlur" name="" id="" ref="textarea"   :placeholder="'回复:@'+nickname" v-model="content"></textarea>
         <van-button type="primary" @click="publish">发送</van-button>
       </div>
       <div class="footer-input" v-else>
         <div class="search">
           <input type="text" placeholder='回复'  @focus="onFocus">
         </div>
         <div class="iconfont iconpinglun-"><i>{{post.comment_length}}</i></div>
         <div class="iconfont iconshoucang" @click="star" :class="{now: post.has_star}" ></div>
         <div class="iconfont iconfenxiang "></div>
       </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      post: {
        user: {}
      },
      commentList: [],
      isShowTextArea: false,
      content: '',
      nickname: '',
      replyId: ''
    }
  },
  created() {
    // 获取页面
    this.getInfo()
    // 获取评论列表
    this.getCommentList()
    // this.$bus.$on('reply', this.onreply)
    this.$bus.$on('reply', async(id, nickname) => {
      console.log('bus', id, nickname)
      this.isShowTextArea = true
      await this.$nextTick()
      // 焦点
      this.$refs.textarea.focus()
      // 下面显示@+昵称
      this.nickname = nickname
      this.replyId = id
      console.log(nickname, id)
    })
  },
  // destroyed() {
  //   console.log('detail销毁')
  //   // 移除$bus的自定义事件off
  //   // this.$bus.$off() 移除bus上所有的事件
  //   // this.$bus.$off('reply') 移除bus上所有的reply事件
  //   // this.$bus.$off('reply', this.onReply) 移除bus上 一个reply事件，，，对应的这个函数就是需要移除的
  //   this.$bus.$off('reply', this.onReply)
  // },
  methods: {
    noLogin() {
      // 判断是否登陆
      const token = localStorage.getItem('token')
      if (!token) {
        // 没有登录
        this.$router.push({
          path: '/login',
          query: {
            back: true
          }
        })
        // 代表没有登录
        return true
      } else {
        // 代表登录
        return false
      }
    },
    async getInfo() {
      const { id } = this.$route.params
      const res = await this.$axios.get(`post/${id}`)
      // console.log(res)
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
    },
    async follow() {
      if (this.noLogin()) return
      // const token = localStorage.getItem('token')
      // if (!token) {
      //   this.$router.push({
      //     path: '/login',
      //     query: {
      //       back: true
      //     }
      //   })
      //   return true
      // }
      console.log('发送请求进行关注')
      const res = await this.$axios.get(`/user_follows/${this.post.user.id}`)
      console.log(res.data)
      if (res.data.statusCode === 200) {
        this.$toast.success('关注成功')
        setTimeout(() => {
          this.getInfo()
        }, 200)
      }
    },
    async unfollow() {
      console.log('发送请求取消关注')
      const res = await this.$axios.get(`/user_unfollow/${this.post.user.id}`)
      console.log(res)
      if (res.data.statusCode === 200) {
        this.$toast.success('取消成功')
        setTimeout(() => {
          this.getInfo()
        }, 200)
      }
    },
    async like() {
      /*
        1. 判断是否登录
        2. 如果没有登录，也需要跳转到登录页
        3. 如果登录了，发送请求进行点赞
      */
      if (this.noLogin()) return
      // 说明登录了
      const res = await this.$axios.get(`/post_like/${this.post.id}`)
      console.log(res.data)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getInfo()
      }
    },
    async star() {
      if (this.noLogin()) return
      const res = await this.$axios.get(`/post_star/${this.post.id}`)
      console.log(res)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getInfo()
      }
    },
    async getCommentList() {
      const id = this.$route.params.id
      const res = await this.$axios.get(`/post_comment/${id}`)
      console.log(res.data)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.commentList = data
        console.log(this.commentList)
      }
    },
    async onFocus() {
      this.isShowTextArea = true
      await this.$nextTick()
      // 让textarea自动获取焦点
      console.log(this.$refs.textarea)
      this.$refs.textarea.focus()
    },
    async publish() {
      const res = await this.$axios.post(`/post_comment/${this.post.id}`, {
        content: this.content,
        parent_id: this.replyId
      })
      console.log(res)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getCommentList()
        this.content = ''
        this.nickname = ''
        this.replyId = ''
        this.isShowTextArea = false
      }
    },
    async onreply(id, nickname) {
      console.log('父组件', id, nickname)
      this.isShowTextArea = true
      await this.$nextTick()
      // 焦点
      this.$refs.textarea.focus()
      // 下面显示@+昵称

      this.nickname = nickname
      this.replyId = id
      console.log(nickname, id)
    },
    onBlur() {
      // 失去焦点取消文本域输入框
      console.log('触发了blur事件')
      if (!this.content) {
        this.isShowTextArea = false
        this.nickname = ''
        this.replyId = ''
      }
    }
  }
}
</script>

<style lang='less' scoped>
.post-detail{
  padding-bottom: 50px;
}
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
 .comment-list{
     h3{
       text-align: center;
       padding: 10px 0;
     }
 }
 .content {
  padding: 10px;
   border-bottom: 3px solid #ccc;
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
     .active{

        color: red;
     }
  }

}
.footer-input{
  background-color: #fff;
  width: 100%;
  height: 50px;
  display: flex;
  border-top: 1px solid #ccc;
  position: fixed;
  bottom: 0;
  align-items: center;
  justify-content: space-around;
  padding: 0 10px;
  .iconfont {
    font-size: 24px;
  }
  .now {
    color: red;
  }
  .iconpinglun- {
    position: relative;
    i {
      position: absolute;
      right: 0;
      top: 0;
      background-color: red;
      font-size: 10px;
      color: #fff;
      padding: 0 3px;
      right: -5px;
      border-radius: 5px;
      font-style: normal;
    }
  }
  .search {
    width: 180px;
    padding-right: 10px;
    input {
      height: 30px;
      background-color: #ddd;
      border-radius: 15px;
      width: 100%;
      border: none;
      font-size: 14px;
      padding-left: 20px;
    }
  }
}
.footer-textarea {
  width: 100%;
  height: 100px;
  display: flex;
  position: fixed;
  z-index: 999;
  bottom: 0;
  padding: 10px;
  align-items: flex-end;
  background-color: #fff;
  border-top: 1px solid #ccc;
  justify-content: space-around;
  textarea {
    width: 260px;
    height: 80px;
    background-color: #ccc;
    border-radius: 5px;
    border: none;
    padding: 10px;
    font-size: 14px;
  }
}
</style>
