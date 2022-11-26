<template>
  <div class="othercomment">
    <div class="userinfo">
      <div class="userimg">
        <slot name="userimg"></slot>
      </div>
      <div class="rightinfo">
        <div class="top">
          <span ref="userName" :class="{userName:true,changeStyle:isadmin}">
            <slot name="userName"></slot>
          </span>
          <div :class="{btn:true,btnChangeStyle:isadmin}" @click="reply">回复</div>
        </div>
        <div class="fbTime">
          <p><slot name="fbTime"></slot></p>
        </div>
      </div>
    </div>

    <!-- 回复的对象 -->
    <div class="commentPoint">
      <span style="color: rgb(64, 158, 255)">回复：</span>
      <span><slot name="commentPoint"></slot></span>
    </div>

    <!-- 回复内容 -->
    <div class="replyContent">
      <p  ref="commentCont">
        <slot name="replyContent"></slot>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    ceid: {
      type: String,
    },
    isadmin: {
      type: Boolean,
    },
  },

  methods: {
    reply() {
      //需要回复用户的昵称
      let replyUser = {
        name: this.$refs.userName.innerHTML,
        ceId: this.ceid,
        isadmin: this.isadmin,
        oldreplyCon:this.$refs.commentCont.innerHTML
      };
      this.$emit("replyOther", replyUser);
    },
  },
};
</script>
<style lang='less' scoped>

.othercomment {
  padding: 15px 0px 0px 20px;
  color: #606266;
  font-size: 12px;

  // 用户信息
  .userinfo {
    display: flex;
    margin-bottom: 0px;
    height: 50px;
    align-items: center;
    .userimg {
      margin-right: 15px;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      overflow: hidden;
      // box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
    }
    .rightinfo {
      .top {
        display: flex;
        margin-bottom: 5px;
        .btn {
          cursor: pointer;
          height: 16px;
          width: 45px;
          text-align: center;
          line-height: 16px;
          font-size: 12px;
          // background-color: #F56C6C;
          background-color: rgb(64, 158, 255);

          color: white;
          margin-left: 5px;
          border-radius: 2px;
        }

        .btnChangeStyle{
          background-color:rgb(251, 114, 153) ;
        }
      }
    }
  }
}

//用户昵称
.userName {
  color: #606266;
}

.changeStyle{
  color:rgb(251, 114, 153);
}

//发布时间
.fbTime {
  p {
    font-size: 12px;
    color: #909399;
  }
}

.replyContent {
  font-size: 16px;
  color: #606266;
}
.commentPoint {
  margin-bottom: 10px;
}
</style>