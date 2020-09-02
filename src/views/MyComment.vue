<template>
  <div class="mycomment">
      <hm-header>我的评论</hm-header>
      <div class="list">
          <div class="item" v-for="item in commentList" :key='item.id'>
              <div class="time">{{item.create_date | time('YYYY-MM-DD HH:mm')}}</div>
              <div class="comment"  v-if="item.parent">
                  <div class="name"> 回复:{{item.parent.user.nickname}}</div>
                  <div class="comment——content">{{item.parent.content}}</div>
              </div>
              <div class="content">{{item.content}}</div>
              <div class="origin">
              <span class="one-txt-cut">原文: {{item.post.title}}</span>
              <span class="iconfont iconjiantou1"></span>
          </div>
      </div>
       </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      commentList: [],
      list: []
    }
  },
  created() {
    this.getCommentList()
  },
  methods: {
    async  getCommentList() {
      const res = await this.$axios.get('/user_comments')
      console.log(res.data)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.commentList = data
        console.log(this.commentList)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.item {
  border-bottom: 1px solid #ccc;
  padding: 10px 20px;
  .time {
    color: #666;
    padding: 10px 0;
  }
  .comment {
    background-color: #ddd;
    padding: 10px;
    .name {
      color: #666;
      font-size: 14px;
      padding-bottom:0% 5px;
    }
    .comment_content {
      color: #999;
      line-height: 30px;
      margin-top: 10px;
    }
  }
  .content {
    margin: 10px 0;
  }
  .origin {
    font-size: 14px;
    color: #999;
    display: flex;
    justify-content: space-between;
  }
}
</style>
