<template>
 <div class="manage">
      <hm-header>栏目管理</hm-header>
      <div class="content">
            <div class="active">
                  <h4>点击删除以下栏目(提示:最低保留两位)</h4>
                  <div class="list">
                      <div class="item"  v-for="item in activeList" :key="item.id" @click="delitem(item.id)">{{item.name}}</div>

                  </div>
            </div>
            <div class="deactive">
                  <h4>点击添加以下栏目</h4>
                    <div class="list" >
                      <div class="item"  v-for="item in deactiveList" :key="item.id" @click="additem(item.id)">{{item.name}}</div>

                  </div>
            </div>
      </div>
 </div>
</template>

<script>
/*
  思路
    1. 发送ajax请求，获取到所有的栏目，存放activeList √
    2. 渲染这些栏目 √
    3. 点击激活的栏目， 删除该栏目，并且添加未激活的数组 √
    4. 点击未激活的栏目，删除该栏目，添加到激活的栏目中 √
    5. 监听数据的变化，保存到localStorage中
*/
export default {
  data() {
    return {
      activeList: [],
      deactiveList: []
    }
  },
  async created() {
    // 在获取数据之前，可以看一下有没有本地缓存，如果有就优先执行本地缓存
    //   JSON.parse()转为数组
    const activeList = JSON.parse(localStorage.getItem('activeList'))
    const deactiveList = JSON.parse(localStorage.getItem('deactiveList'))
    if (activeList) {
      this.activeList = activeList
      this.deactiveList = deactiveList
      return
    }
    const res = await this.$axios.get('/category')
    console.log(res)
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      this.activeList = data
      console.log(this.activeList)
    }
  },
  methods: {
    delitem(id) {
      if (this.activeList.length <= 4) return
      const index = this.activeList.findIndex(item => item.id === id)
      //   下面的数组添加选定的元素,上面则去删除这个元素
      this.deactiveList.push(this.activeList[index])
      this.activeList.splice(index, 1)
    },
    additem(id) {
      const index = this.deactiveList.findIndex(item => item.id === id)
      //   上面的数组添加选定的元素,下面则去删除这个元素 ，全部和上面反着来
      this.activeList.push(this.deactiveList[index])
      this.deactiveList.splice(index, 1)
    }
  },
  watch: {
    activeList: {
      // 深
      deep: true,
      handler(value) {
        //   将改变的选项保存在浏览器的localStorage里面
        // JSON.stringify()转换为字符串
        localStorage.setItem('activeList', JSON.stringify(this.activeList))
        localStorage.setItem('deactiveList', JSON.stringify(this.deactiveList))
      }
    }
  }
}
//    获取数据

</script>

<style lang='less' scoped>
   .content{
        padding: 10px;
        .active,
        .deactive{
            h4{
                font-size: 14px;
                font-weight: 400;
                margin: 10px;
                color: #cccccc;
            }

            .list{
                overflow: hidden;
                .item{
                    float: left;
                    height:30px ;
                    width: 60px;
                    background-color: #eee;
                    border: 1px solid #cccccc;
                    text-align: center;
                    line-height: 30px;
                    margin: 5px;
                    font-size: 16px;
                }
            }

        }
   }
</style>
