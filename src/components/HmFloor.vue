<template>
 <div>
      <hm-floor  :count='count-1' :comment='comment.parent' v-if="comment.parent"></hm-floor>
      <div class="hm-floor">
      <div class="title">
          <div class="left">{{count}}.{{comment.user.nickname}}</div>
          <div class="center">{{comment.create_date | now}}</div>
          <div class="right">回复</div>
      </div>
      <div class="content">{{comment.content}}</div>
</div>
 </div>
</template>

<script>
export default {
  name: 'hm-floor',
  props: {
    comment: Object,
    count: Number
  }
}
</script>

<style lang='less' scoped>
.first>.hm-floor{
    border-bottom: 1px solid red;
}
.hm-floor{
    margin-top: -1px;
    padding: 10px;
    border: 1px solid  red;
    // border-bottom: none;
    .title{
        display: flex  ;
        font-size: 14px;
        .center{
            flex: 1;
            color: #666;
            font-size: 12px;
            padding-left: 10px;
        }
        .right{
          color: #666;
        }
    }
    .content{
            font-size: 14px;
            margin-top: 10px;
    }
}
</style>
