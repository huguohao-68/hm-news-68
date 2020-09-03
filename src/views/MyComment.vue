<template>
  <div class="mycomment">
      <hm-header>我的评论</hm-header>
      <div class="list">
          <!-- refreshing 是否正在下拉 -->
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="真的一滴都没有了..."
            :immediate-check='false'
            offset="15"
            @load="onLoad"
            >
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
         </van-list>
         </van-pull-refresh>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      commentList: [],
      pageIndex: 1, // 当前页数
      pageSize: 5, // 当前每页的条数
      // 代表着一种加载状态 .如果loading为true的时候.代表着list组件正在加载数据,onload就不在触发了
      // 当页面滚动到底部时候,会触发onload,自动会把loading改成true
      loading: false,
      // 代表着是否结束,false表示还有数据,finished:代表没有更多数据
      // finished默认是为false,但是如果后台表示没有数据了,就应该把finished改为true
      finished: false,
      //   是否在下拉
      refreshing: false
    }
  },
  created() {
    this.getCommentList()
  },
  methods: {
    async  getCommentList() {
      const res = await this.$axios.get('/user_comments', {
        params: {
          // get请求的参数需要可以通过params进行传递
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      console.log('当前加载完毕...', res.data)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        // this.commentList = this.commentList.concat(data)
        // 如果直接对于data的话,会导致直接覆盖
        this.commentList = [...this.commentList, ...data]
        console.log(this.commentList)
        this.loading = false
        // 判断后台是否还有数据,可以更改finished的状态
        if (data.length < this.pageSize) {
          this.finished = true
        }
        this.refreshing = false
      }
    },
    onLoad() {
    // 这里加的延时器,主要是为了开发的时候,有一个更加直观的感受
      setTimeout(() => {
        console.log('现在需要加载数据')
        this.pageIndex++
        this.getCommentList()
      }, 700)
    },
    onRefresh() {
      console.log(' 下拉刷新中...')
      // 清空列表数据

      setTimeout(() => {
        /*
        1. 下拉刷新时需要清除原来的数据,和网页刷新类似
        然后重新加载运来的第一页的数据
        */
        this.commentList = []
        this.refreshing = false
        this.loading = true
        this.pageIndex = 1
        this.getCommentList()
      }, 800)
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
