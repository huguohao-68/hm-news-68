<template>
  <div class="index">
     <div class="header">
        <div class="logo">
            <span class="iconfont iconnew"></span>
        </div>
        <div class="search">
            <div class="search_box" @click="$router.push('/search')">
                 <span class="iconfont iconsearch"></span>
                 <span>搜索新闻</span>
            </div>
        </div>
        <div class="user" @click="$router.push('/user')" >
            <span class="iconfont iconwode" ></span>
        </div>
      </div>
      <!-- 右边箭头 -->
      <van-sticky  class="more-sticky">
           <div class="more"  @click="$router.push('/manage')">
             <span class="iconfont iconjiantou"></span>
           </div>
     </van-sticky>
      <van-tabs  v-model="active"  sticky animated swipeable >
         <van-tab :title=tab.name  v-for="tab in tabList" :key='tab.id'>
           <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
              <van-list
               v-model="loading"
               :finished="finished"
               finished-text="真的一滴都没有了..."
               @load="onLoad"
               :immediate-check="false"
                >
                <!-- 滚动到底部才开始加载 -->
                    <hm-post :post='item'  v-for="item in newsList" :key="item.id"></hm-post>
             </van-list>
           </van-pull-refresh>
         </van-tab>
       </van-tabs>
  </div>

</template>

<script>
// iconjiantou8
export default {
  name: 'index',
  data() {
    return {
      active: 0,
      tabList: [],
      newsList: [],
      pageIndex: 1,
      pageSize: 5,
      // 代表着是否结束,false表示还有数据,finished:代表没有更多数据
      loading: false,
      // finished默认是为false,但是如果后台表示没有数据了,就应该把finished改为true
      finished: false,
      refreshing: false
    }
  },
  created() {
    console.log('index创建')
    this.getTabList()
  },
  destroyed() {
    console.log('index销毁')
  },
  methods: {
    async getTabList() {
      const activeList = JSON.parse(localStorage.getItem('activeList'))
      if (activeList) {
        // 渲染主页面,优先缓存本地的执行
        // 同时需要执行第一个需要的页面
        this.tabList = activeList
        this.getNewsList(this.tabList[0].id)
        return
      }
      const res = await this.$axios.get('/category')
      //   console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.tabList = data
        // console.log(this.tabList)
        // 发送请求获取第一个tab栏的数据
        this.getNewsList(this.tabList[0].id)
      }
    },
    async getNewsList(id) {
      // 发送请求获取新闻数据
      const res = await this.$axios.get('/post', {
        params: {
          category: id,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        // 防止暴力点击
        if (this.pageIndex === 1) {
          this.newsList = []
        }
        this.newsList = [...this.newsList, ...data]
        console.log(this.newsList)
        this.loading = false
        this.refreshing = false
        if (data.length < this.pageSize) {
          this.finished = true
        }
      }
    },
    onLoad() {
      setTimeout(() => {
        console.log('现在需要加载更多')
        this.pageIndex++
        this.getNewsList(this.tabList[this.active].id)
      }, 500)
    },
    onRefresh() {
      // 下拉刷新和页面刷新类似,需要清除之前获取的资源,回复初始
      this.newsList = []
      this.pageIndex = 1
      this.loading = true
      this.finished = false
      // 重新获取所需要的的初始值/
      setTimeout(() => {
        this.getNewsList(this.tabList[this.active].id)
      }, 500)
    }
  },
  watch: {
    active(value) {
    // 1. 监听到active的变化，如果变化了，说明栏目就切换了
    // 2. 需要清空之前栏目的数据，重新加载当前栏目的第一页数据
      this.newsList = []
      this.pageIndex = 1
      this.finished = false
      this.loading = true
      setTimeout(() => {
        // 给所需要的的tab获取资料
        this.getNewsList(this.tabList[value].id)
      }, 500)
    }
  }
}
</script>

<style lang='less' scoped>
 .header{
      display:flex;
      height:50px;
      line-height: 50px;
      background-color: red;
      text-align: center;
      color: #ffffff;
      .logo span{
         font-size: 75px;
      }
      .user span{
         font-size: 24px;

      }
       .logo,
       .user{
           width: 70px;
       }
       .search{
           flex:1;
           .search_box{
             height: 34px;
             line-height: 34px;
             font-size: 14px;
             background-color: rgba(255,255,255,.5);
             margin-top: 8px;
             border-radius: 14px;
          }
          span:first-child{
              margin-right:8px;
          }
       }
 }
 /deep/.van-tabs__wrap{
    width: 85%;
 }
 .more{
     width: 15%;
     height: 44px;
     position: absolute;
     right: 0;
     z-index: 999;
     background-color: #fff;
     text-align: center;
     line-height: 44px;
 }
// ：页面滚动到下面，会导致点击不了 ,样式冲突,需要修改层级
.more-sticky {
    /deep/.van-sticky--fixed {
            z-index: 100;
             }
}
</style>
