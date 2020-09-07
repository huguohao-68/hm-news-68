<template>
  <div class="hm-comment">
    <div class="title">
        <div class="left">
          <img :src="$base +comment.user.head_img" alt="">
        </div>
        <div class="center">
          <p>1.{{comment.user.nickname}}</p>
          <p>{{comment.create_date | now  }}</p>
        </div>
        <div class="right">回复</div>
    </div>
    <hm-floor :count='count' :comment='comment.parent' v-if="comment.parent"></hm-floor>
    <div class="content">{{comment.content}}</div>
  </div>

</template>

<script>
export default {
  props: {
    comment: Object
  },
  data() {
    return {
      count: this.getCount(0, this.comment)
    }
  },
  methods: {
    getCount(num, data) {
      if (data.parent) {
        return this.getCount(num + 1, data.parent)
      } else {
        return num
      }
    }
  }
}
</script>

<style lang='less' scoped>
 .hm-comment{
   padding: 10px;
   border-bottom: 1px solid #cccccc;
    .title{
        display: flex;
        .left{
           img{
             width: 40px;
             height: 40px;
             border-radius: 50%;
           }
        }
        .center{
          padding-left: 10px;
          flex: 1 ;
          font-size: 14px;
           p {
              line-height: 24px;
           }
        }
        .right{
          font-size: 14px;
          color: #666;
        }
    }
    .content{
      font-size: 18px;
    }
 }
</style>
