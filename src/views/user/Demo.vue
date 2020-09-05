<template>
  <div class="demo">
     <!--
      img: 指定裁剪图片
      autoCrop:是否默认生成裁剪框
      autoCropWidth="150"
      autoCropHeight="150" 指定裁剪框宽高
      fixed： 固定裁剪框的宽高比
      :fixedNumber="[2,1]"
      fixedBox : 不能调整大小
     -->
      <van-button type="primary" @click="crop">裁剪</van-button>
       <vue-cropper
       ref="cropper"
       autoCrop
       autoCropWidth="150"
       autoCropHeight="150"
        fixed
       img="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3344988799,3949158950&fm=26&gp=0.jpg"></vue-cropper>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
export default {
  components: {
    VueCropper
  },
  methods: {
    // 获取裁剪后的图片的base64数据， 一般用于直接显示
    crop() {
      this.$refs.cropper.getCropData(data => {
        console.log(data)
      })
      this.$refs.cropper.getCropBlob((data) => {
        console.log(data)
      })
    }
  }
}
</script>

<style lang="less">
.demo {
  width: 100%;
  height: 100%;
  position: fixed;
}
</style>
