<template>
  <div :class="{item:true,showborder:isshowStyle}">
    <!-- 定义标题 -->
    <div class="title">
      <slot name="title"></slot>
    </div>

    <!-- 定义标题下方的状态信息 -->
    <div class="tool">
      <div class="commentNumber">
        <i class="el-icon-chat-line-round"></i>
        <slot name="commentNumber"></slot>
      </div>
      <div class="readNumber">
        <i class="el-icon-view"></i>
        <slot name="readNumber"></slot>
      </div>
      <div class="likeNumber">
        <i class="fa fa-heart-o"></i>
        <slot name="likeNumber"></slot>
      </div>
    </div>

    <!-- 未读消息数目 -->
    <div class="noRead">
       <slot name="noReadNumber"></slot>
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props:{
    isshowStyle:{
      type:Boolean
    }
  }
};
</script>
<style lang='less' scoped>
.item:hover .title{
   color:rgb(64, 158, 255);
}

.showborder{
   .title{
   color:rgb(64, 158, 255);
}

}

.item {
  width: 100%;
  height: 70px;
  // overflow: hidden;
  padding:5px;
  box-sizing: border-box;
  border-radius: 5px;
  position: relative;
  background: white;
  margin-bottom: 15px;
  cursor: pointer;
  box-shadow: 4px 4px 8px rgba(0,0,0,.1);


  .noRead{
    position: absolute;
    width: 30px;
    height: 16px;
    background:rgb(64, 158, 255);
    color:white;
    font-size:12px;
    text-align: center;
    line-height: 16px;
    border-radius: 4px;
    top:-4px;
    right:-10px;

  }
}

.title {
  height: 25px;
  line-height: 25px;
  font-size: 14px;
  color: #606266;
  font-weight: 600;
  padding: 10px 0;
  letter-spacing: 1px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.tool {
  display: flex;
  justify-content: space-around;
  height: 15px;
  align-items: center;
  .commentNumber,
  .readNumber,
  .likeNumber {
    width: 20%;
    line-height: 15px;
    // background: chocolate;
    color: #909399;
    font-size: 14px;
    i {
      margin-right: 3px;
    }
  }
}
</style>