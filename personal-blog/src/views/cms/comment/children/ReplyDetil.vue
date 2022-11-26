<template>
  <div class="detil">
    <div class="main">
      <div class="img">
        <slot name="img"></slot>
      </div>

      <div class="info">
        <div class="top">
          <span class="name">
            <slot name="name"></slot>
          </span>
          <span class="decripe" v-if="replyObj == 'fbpl'"
            >对我的文章发表了评论</span
          >
          <span class="decripe" v-if="replyObj == 'hfpl'">回复了我的评论</span>
        </div>

        <div class="comment">
          <p class="cont">
            <span v-if="replyObj == 'hfpl'"
              >回复<span style="color: #409eff"
                >@<slot name="commentPoint"></slot>:</span
              ></span
            >
            <slot name="cont"></slot>
          </p>
          <!-- 用户回复我的评论时 -->
          <p class="otherCom" v-if="replyObj == 'hfpl'">
            <slot name="otherCom"></slot>
          </p>
          <div class="tool">
            <span class="time">
              <slot name="time"></slot>
            </span>
            <span class="reply" @click="reply"
              ><i class="el-icon-chat-square"></i>回复</span
            >
          </div>
        </div>
        <!-- 回复框 -->
        <div
          class="replyInput animate__animated animate__slideInUp"
          v-if="isshowInput"
        >
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="replyTxt"
          >
          </el-input>
          <div class="btn">
            <el-button type="primary" size="mini" @click="sendInfo"
              >发送</el-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { replyByOther } from "../../../../network/comment";
export default {
  data() {
    return {
      // 回复的文字
      replyTxt: "",
      //是否显示输入框
      isshowInput: false,
    };
  },
  props: {
    replyObj: {
      type: String,
    },
    // 需要回复对象的消息
    needRelyInfo: {
      type: Object,
    },
    articleId: {
      type: String,
    },
  },

  methods: {
    // 点击回复按钮
    reply() {
      this.isshowInput = !this.isshowInput;
    },

    //发送消息
    sendInfo() {
      // console.log(this.needRelyInfo);
      if (this.replyTxt != "") {
        let info = {};
        info.articleId = this.articleId;
        info.isadmin = true;
        info.commentCont = this.replyTxt;
        info.commentPoint = this.needRelyInfo.userName;

        if (this.replyObj == "fbpl") {
          info.ceID = this.needRelyInfo._id;
          info.replyOtherByAdmin = false
        } else {
          info.ceID = this.needRelyInfo.ceID;
          //此时发布层级下其他用户回复管理员的情况
          info.replyOtherByAdmin = true
          info.needDelId = this.needRelyInfo._id
        }

        replyByOther(info).then((data) => {
          if (data.status == 200) {
            this.$message({
              message: data.msg,
              type: "success",
            });
            //发送事件重新请求数据
            this.$emit("finshSend");
          } else {
            this.$message({
              message: data.msg,
              type: "error",
            });
          }
        });
      }
    },
  },
};
</script>
<style lang='less' scoped>
.detil {
  width: 100%;
  box-sizing: border-box;
  padding: 45px;
  border-bottom: 1px solid #e4e7ed;
  .main {
    display: flex;
    .img {
      height: 46px;
      width: 46px;
      border-radius: 23px;
      background: brown;
      overflow: hidden;
      margin-right: 14px;
      flex: none;
    }
    .info {
      width: calc(100% - 62px);
      .top {
        margin-bottom: 15px;
        .name {
          font-size: 16px;
          color: #303133;
          margin-right: 14px;
        }
        .decripe {
          font-size: 16px;
          color: #909399;
        }
      }

      .comment {
        .cont {
          font-size: 14px;
          color: #606266;
          line-height: 25px;
        }

        .tool {
          margin-top: 15px;
          .time,
          .reply {
            font-size: 16px;
            color: #909399;
            margin-right: 10px;
          }

          .reply {
            cursor: pointer;
            i {
              margin-right: 4px;
            }
            &:hover {
              color: #409eff;
            }
          }
        }
      }
    }
  }
}

.replyInput {
  margin-top: 15px;
  .btn {
    margin-top: 10px;
    display: flex;
    flex-direction: row-reverse;
  }
}

.otherCom {
  border-left: 4px solid #dcdfe6;
  padding-left: 4px;
  margin-top: 10px;
  line-height: 18px;
  color: #909399;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>