<template>
  <div>
    <div class="placeholder"></div>
    <div class="hm-header">
    <div class="back" @click="back">
      <span class="iconfont iconjiantou2"></span>
    </div>
    <div class="title"><slot></slot></div>
    <!-- extra额外的事情 -->
    <div class="extra"></div>
  </div>
  </div>
</template>

<script>
export default {
  methods: {
    back() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less">
.placeholder{
  width: 100%;
  height: 50px;
}
.hm-header {
  top: 0 ;
  position: fixed;
  width: 100%;
  z-index: 999;
  height: 50px;
  background-color: #fff;
  border-bottom: 1px solid #ccc;
  display: flex;
  text-align: center;
  line-height: 50px;
  .back,
  .extra {
    width: 50px;
  }
  .iconfont {
    font-size: 16px;
  }
  .title {
    flex: 1;
    font-size: 18px;
    font-weight: 700;
  }
}
</style>
