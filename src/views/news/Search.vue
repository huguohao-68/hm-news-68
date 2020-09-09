<template>
  <div class="search">
    <div class="header">
      <div class="left" @click="goBack">
        <span class="iconfont iconjiantou2"></span>
      </div>
      <div class="center">
        <input
        type="search"
        placeholder="请输入搜索关键字"
        v-model="key"
        @keyup.enter="search"
        @input="recommend">
        <span class="iconfont iconsearch"></span>
      </div>
      <div class="right" @click="search" >搜索</div>
    </div>
      <div class="recomend-list" v-if="recommendList.length">
        <!-- 这是推荐 -->
      <div
        class="item one-txt-cut"
        v-for="item in recommendList"
        :key="item.id"
        @click="goSearch(item.title)"
      >
        {{ item.title }}
      </div>
    </div>
    <div class="list" v-else-if="list.length">
      <hm-post v-for='item in list' :key='item.id' :post='item'></hm-post>
    </div>
    <div class="content" v-else>
      <div class="history" >
        <h3>历史记录</h3>
        <div class="list">
          <div
          class="item one-txt-cut"
          v-for="item in history"
          :key="item"
          @click="goSearch(item)"
          >{{item}}
          </div>
        </div>
      </div>
      <hr>
      <div class="hot">
        <h3>热门搜索</h3>
        <div class="list">
          <div class="item" v-for="item in hot " :key="item.id"    @click="goSearch(item)">{{item}}</div>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { debounce } from '../../utils/tool'
export default {
  data() {
    return {
      key: '',
      list: [],
      history: [],
      hot: [],
      recommendList: []
    }
  },
  created() {
    // 如果没有历史纪录，保证是一个空数组 JSON.parse转化为数组
    this.history = JSON.parse(localStorage.getItem('history')) || []
    this.hot = ['老八', '关晓彤', '华为', '情火', '姑娘']
  },
  methods: {
    async search() {
      console.log('搜索')
      if (!this.key) return this.$toast('请输入关键词')
      const res = await this.$axios.get('/post_search', {
        params: {
          keyword: this.key
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
        console.log(this.list)
      }
      // 把key添加到缓存中
      // 1. 如果原来有这个历史纪录，删除即可
      // 2. 添加到数组的前面
      this.history = this.history.filter(item => item !== this.key)
      // 添加缓存
      this.history.unshift(this.key)
      // 转化为字符串
      localStorage.setItem('history', JSON.stringify(this.history))
      // 清空推荐
      this.recommendList = []
    },
    goBack() {
      // 点击按钮,如果key没有值,直接返回首页,有值就返回初始搜索页
      if (this.key) {
        this.key = ''
      } else {
        this.$router.back()
      }
    },
    goSearch(item) {
      // 获得关键词,重新调用search方法进行搜索
      this.key = item
      this.search()
    },
    recommend: debounce(async function() {
      if (this.key === '') return
      const res = await this.$axios.get('/post_search_recommend', {
        params: {
          keyword: this.key
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.recommendList = data
        console.log(this.recommendList)
      }
    }, 1000)

  },
  watch: {
    // 监听key值的变化.一旦key值为空.搜索结果也为空
    key(value) {
      if (value === '') {
        this.list = ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  height: 50px;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  padding: 0 10px;
  .center {
    flex: 1;
    padding: 0 10px;
    position: relative;
    input {
      width: 100%;
      height: 34px;
      border-radius: 17px;
      border: 1px solid #ccc;
      font-size: 14px;
      padding-left: 30px;
    }
    .iconfont {
      position: absolute;
      left: 22px;
      top: 10px;
    }
  }
  .right {
    font-size: 14px;
  }
}
.content {
  padding: 10px;
  .history {
    margin-bottom: 10px;
  }
  h3 {
    font-size: 14px;
    margin: 10px 0;
  }
  .list {
    overflow: hidden;
  }
  .item {
    float: left;
    width: 60px;
    height: 30px;
    border: 1px solid #ccc;
    background-color: #ddd;
    font-size: 12px;
    line-height: 30px;
    text-align: center;
    margin: 5px;
  }
}
.recomend-list {
  padding: 0 10px;
  .item {
    border-bottom: 1px solid #ccc;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
  }
}
</style>
