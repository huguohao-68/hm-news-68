<template>
  <div class="nav-item" @click="clickFn">
    <div class="title"><slot></slot></div>
    <div class="content"><slot name='content'></slot></div>
    <div class="arrow">
      <span class="iconfont iconjiantou1"></span>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    clickFn() {
      // console.log(this.to)
      this.$router.push(this.to)
      // 这句话是为了可以注册组件的点击事件
      this.$emit('click')
    }

  },
  props: {
    to: String
  }
}
</script>

<style lang='less' scoped>
.nav-item{
   display: flex;
   border-bottom:1px solid #ddd ;
   height: 50px;
   align-items: center;
   margin-left: 10px;
   padding-right: 10px;
   font-size: 16px;
   .content{
       flex: 1;
       text-align: right;
       color: #666;
   }
   .arrow{
       padding-left: 10px;
   }
}
</style>
