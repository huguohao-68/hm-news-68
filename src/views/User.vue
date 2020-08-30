<template>
  <div class='user'>
    <div class="header">
      <div class="avater">
          <img src="../assets/24.jpg" alt="">
      </div>
      <div class="info">
          <div class="name">
              <span class="iconfont iconxingbienan"></span>
              <span>有关部门</span>
          </div>
          <div class="time">
              2021-02-33
          </div>
      </div>
      <div class="allow">
          <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
    <hm-navitem>
      <template>我的关注</template>
      <template #content>关注的内容</template>
    </hm-navitem>
    <hm-navitem>
      <template>我的跟帖</template>
      <template #content>跟帖/回复</template>
    </hm-navitem>
    <hm-navitem>
      <template>我的收藏</template>
      <template #content>文章/视频</template>
    </hm-navitem>
    <hm-navitem>设置</hm-navitem>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
.user{
  .header{
    display: flex;
    align-items: center;
    padding: 20px 10px;
    border-bottom: 3px solid #ddd;
    .avater{
            width: 70px;
            height: 70px;
        img{
            border-radius: 50%;
            height: 100%;
            width: 100%;
        }
      }
    .info{
            flex:1;
            padding-left:10px;
            font-size: 14px;
      }
      .time{
          margin-top: 10px;
          color:#666;
      }
      .iconxingbienan {
         color: #7bbcec;
       }

    }
}
</style>
