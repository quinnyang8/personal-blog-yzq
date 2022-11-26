<template>
  <div class="comment">
    <div class="userinfo">
      <div class="userimg">
        <slot name="userimg"></slot>
      </div>
      <div class="rightinfo">
        <div class="top">
          <span class="userName" ref="userName">
            <slot name="userName"></slot>
          </span>

          <div class="btn" @click="reply">回复</div>
        </div>
        <div class="fbTime">
          <p><slot name="fbTime"></slot></p>
        </div>
      </div>
    </div>

    <!-- 回复内容 -->
    <div class="replyContent">
      <p ref="commentCont">
        <slot name="replyContent"></slot>
      </p>
    </div>

    <!-- 其他人的回复 -->
    <div
      class="otherComments animate__animated animate__fadeIn"
      v-if="islookComOrPackup == 1"
    >
      <slot name="otherComments"></slot>
    </div>

    <div v-if='relyNumber>0'>
      <!-- 定义其他人回复的功能 -->
      <div class="allComment" v-if="islookComOrPackup == 0">
        <span>共有</span>
        <span class="commentNumber">
          <slot name="commentNumber"></slot>
        </span>
        <span>条回复，</span>
        <span class="lookcomment" @click="lookcomment">点击查看</span>
      </div>

      <!-- 收起评论 -->
      <div
        class="packup"
        @click="islookComOrPackup = 0"
        v-if="islookComOrPackup == 1"
      >
        收起评论
      </div>
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      // 当前显示的是查看评论还是展开评论,0点击查看 1收起评论
      islookComOrPackup: 0,
    };
  },

  props: {
    ceid: {
      type: String,
    },

    //当前楼层回复的数量
    relyNumber: {
      type: Number,
    },
  },

  methods: {
    reply() {
      //需要回复用户的昵称
      let replyUser = {
        name: this.$refs.userName.innerHTML,
        oldreplyCon:this.$refs.commentCont.innerHTML,
        ceId: this.ceid,
      };
      this.$emit("reply", replyUser);
    },
    lookcomment(){
      this.islookComOrPackup = 1
      this.$emit('lookcomment',this.ceid)
    }
  },
};
</script>
<style lang='less' scoped>
.comment {
  padding: 15px 8px;
  border-bottom: 1px solid #e4e7ed;
  // box-shadow: 0px 0px 8px rgba(0,0,0,.1);
  margin-bottom:20px;
  color: #606266;
  font-size: 12px;

  // 展开所有评论
  .allComment {
    margin-top: 15px;
    .commentNumber {
      font-weight: 600;
    }

    .lookcomment {
      color: rgb(64, 158, 255);
      cursor: pointer;

      &:hover {
        color: rgb(107, 181, 255);
      }
    }
  }

  // 收起评论
  .packup {
    margin-top: 15px;
    color: rgb(64, 158, 255);
    cursor: pointer;

    &:hover {
      color: rgb(107, 181, 255);
    }
  }

//用户昵称
.userName{
    color:#606266;
}


//发布时间
.fbTime{
  p{
    font-size:12px;
    color:#909399;
  }
}


  // 用户信息
  .userinfo {
    display: flex;
    margin-bottom: 10px;
    height: 50px;
    align-items: center;
    .userimg {
      margin-right: 15px;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      overflow: hidden;
      // box-shadow: 2px 2px 4px rgba(0,0,0,.1);

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
          background-color: rgb(64, 158, 255);

          color: white;
          margin-left: 5px;
          border-radius: 2px;
        }
      }
    }
  }
}

.replyContent {
  font-size: 16px;
  color: #606266;
}
</style>