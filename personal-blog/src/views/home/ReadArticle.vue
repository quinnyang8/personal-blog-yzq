<template>
  <div class="readArtile" ref="readArtile">
    <FloatBall ref="FloatBall"></FloatBall>

    <div class="cont">
      <!-- 骨架屏 -->
      <el-skeleton v-show="!isArticleLoading" :rows="6" animated />

      <!-- 如果获取文章失败，则展示该描述 -->
      <el-empty v-show="isLoadingOk" :description="errdecripe"></el-empty>
      <!-- 文章内容 -->
      <div
        class="content markdown-body"
        v-show="isArticleLoading"
        v-html="articleData"
      ></div>

      <!-- 点赞与切换上下文 -->
      <div class="feedback">
        <!-- <div class="previous">
          <div class="ico">上一篇</div>
        </div> -->
        <div class="giveLike" @click="giveLike">点赞</div>
        <!-- <div class="next">
          <div class="ico">下一篇</div>
        </div> -->
      </div>

      <!-- 评论 -->
      <div class="comment_pl">
        <h1 class="title">评论</h1>

        <el-input
          type="textarea"
          :rows="4"
          :placeholder="hint"
          style="margin-bottom: 10px"
          v-model="uerInput"
          ref="uerInput"
          maxlength="150"
          show-word-limit
        >
        </el-input>

        <div class="fbBtn">
          <el-button
            size="small"
            v-show="hint != '请输入评论'"
            plain
            @click="cancelComment"
            >取消</el-button
          >
          <el-button size="small" type="primary" @click="showReply = true"
            >回复</el-button
          >
        </div>

        <!-- 文章回复时的弹出框 -->
        <el-dialog
          title="个人信息"
          :visible.sync="showReply"
          :width="iswidth"
          top="20vh"
        >
          <ReplyTk @finish="getinput"></ReplyTk>
        </el-dialog>

        <el-skeleton v-show="!isCommentLoading" :rows="6" animated />

        <Comment
          v-for="item in usercomment"
          @lookcomment="lookcomment"
          :key="item.id"
          @reply="reply"
          :relyNumber="item.commentNumber"
          :ceid="item['_id']"
        >
          <!-- 头像 -->
          <template v-slot:userimg>
            <el-image
              style="width: 100%; height: 100%"
              :src="item.userImg"
              fit="cover"
            ></el-image>
          </template>
          <!-- 昵称 -->
          <template v-slot:userName>
            {{ item.userName }}
          </template>
          <!-- 发布时间 -->
          <template v-slot:fbTime>
            {{ item.commentTime }}
          </template>
          <!-- 评论内容 -->
          <template v-slot:replyContent>
            {{ item.commentCont }}
          </template>
          <!-- 共有多少回复 -->
          <template v-slot:commentNumber>
            {{ item.commentNumber }}
          </template>

          <!-- 其他人的回复 -->
          <template v-slot:otherComments>
            <!-- 点击查看更多后有一个加载动画 -->
            <div
              class="loading"
              style="height: 150px"
              v-loading="true"
              v-if="!isOtherCommentLoading"
            ></div>

            <Othercomment
              v-show="isOtherCommentLoading"
              v-for="otheritem in item.othercomment"
              :key="otheritem.commentTime + Math.floor(Math.random() * 1000)"
              :ceid="item['_id']"
              :isadmin="otheritem['isadmin']"
              @replyOther="replyOther"
            >
              <!-- 头像 -->
              <template v-slot:userimg>
                <el-image
                  style="width: 100%; height: 100%"
                  :src="otheritem.userImg"
                  fit="cover"
                ></el-image>
              </template>
              <!-- 昵称 -->
              <template v-slot:userName> {{ otheritem.userName }}</template>
              <!-- 发布时间 -->
              <template v-slot:fbTime> {{ otheritem.commentTime }} </template>
              <!-- 评论内容 -->
              <template v-slot:replyContent>
                {{ otheritem.commentCont }}
              </template>
              <!-- 回复对象 -->
              <template v-slot:commentPoint
                >{{ otheritem.commentPoint }}
              </template>
            </Othercomment>
          </template>
        </Comment>

        <el-empty v-if="iscomment" description="该文章暂无评论"></el-empty>
      </div>
    </div>
  </div>
</template>
<script>
import { getArticleData } from "../../network/home";

import Comment from "../../components/common/Comment";
import Othercomment from "../../components/common/Othercomment";
import ReplyTk from "./homechild/ReplyTk.vue";
import FloatBall from "../../components/content/FloatBall.vue";

// 载入评论模块对象
import { uerComments } from "../../class/userComments";

import setLocalStorage from "../../tools/localStorage";

import "mavon-editor/dist/markdown/github-markdown.min.css";
import "mavon-editor/dist/highlightjs/styles/github.min.css";

export default {
  data() {
    return {
      //输入框的提示文字
      hint: "请输入评论",
      articleData: "",

      uerInput: "",

      // 当前文章的id
      articleId: "",

      //是否打开回复文章的弹框
      showReply: false,

      //当前回复的对象，0代表层主，1代表其他用户
      commentpoin: 0,

      //层主评论对应的数组
      usercomment: [],

      // 当前回复的楼层id
      replyceid: "",

      //文章是否有评论
      iscomment: false,

      //文章内容是否已经加载完
      isArticleLoading: false,

      // 文章的评论是否已经加载完
      isCommentLoading: false,

      //楼层中其他评论是否已经加载完
      isOtherCommentLoading: false,

      // 获取文章数据失败展示
      errdecripe: "",

      //是否展示文章读取失败的提示
      isLoadingOk: false,

      //回复的用户头像，昵称
      userImg: "",
      userName: "",

      //回复对话框的款窄
      iswidth: "50%",

      //同层其他回复是否为管理员回复
      isadmin: false,

      //同层回复的对象是否为管理员
      replayObjIsadmin: false,

      //当前评论对象之前的评论内容
      oldreplyCon: "",
    };
  },

  mounted() {
    let setFloatBall = () => {
      let readArtileWidth = this.$refs.readArtile.offsetWidth;
      this.$refs.FloatBall.setposition(readArtileWidth);
    };
    setFloatBall();
    window.addEventListener("resize", () => {
      setFloatBall();
    });
  },
  watch: {},

  components: {
    Comment,
    Othercomment,
    ReplyTk,
    FloatBall,
  },

  created() {
    //文章标题
    let titeTem = "";
    if (this.$store.state.articleTitle != "") {
      titeTem = this.$store.state.articleTitle;
    } else {
      titeTem = sessionStorage.getItem("Title");
    }

    //修改顶部标题
    let header = [titeTem, "家道贫寒，努力搬砖"];
    this.$emit("componentIsLoad", header);
    this.getArticleData();

    // 将位置定位到顶部
    if (document.body.scrollTop) {
      document.body.scrollTop = 0;
    } else {
      document.documentElement.scrollTop = 0;
    }

    //根据视口的大小调整回复框的比例
    if (window.innerWidth <= 768) {
      this.iswidth = "85%";
    }
    //查看一下属性 console.log(this.$route, "11111");
  },

  methods: {
    // 获取文章数据
    getArticleData() {
      //先从vuex中查找文章id信息，没有则在session中寻找
      let fileUrl = "";
      if (this.$store.state.articleId != "") {
        fileUrl = this.$store.state.articleFileName;
        this.articleId = this.$store.state.articleId;
      } else {
        fileUrl = sessionStorage.getItem("FileName");
        this.articleId = sessionStorage.getItem("ArticleId");
      }

      getArticleData(fileUrl).then((data) => {
        if (data.status == 200) {
          this.articleData = data.data;
          //文章已经加载完成
          this.isArticleLoading = true;
          //获取评论信息
          this.getCommentList();
          return;
        }

        this.errdecripe = data.msg;
        this.isLoadingOk = true;
        this.isArticleLoading = true;
      });
    },

    getinput(inputData) {
      this.userImg = inputData.userImg;
      this.userName = inputData.userName;
      this.sendComment();
    },

    //获取层主评论列表
    getCommentList() {
      let comment = new uerComments();
      comment.getCommentList(this.articleId).then((data) => {
        if (data.status == 200) {
          // 评论列表已经加载完
          this.isCommentLoading = true;
          this.usercomment = data.list;
          console.log(data.list);
        } else if (data.status == 201) {
          // 评论列表已经加载完
          this.isCommentLoading = true;
          this.iscomment = true;
        }
      });
    },

    //根据ceid获取当前楼层的其他评论
    lookcomment(ceId) {
      let comment = new uerComments();
      comment.getOtherCommentList(ceId).then((data) => {
        //查询成功
        if (data.status == 200) {
          this.isOtherCommentLoading = true;

          //将得到的数据添加到层主数组中othercomment属性中

          //找到当前数据对应的楼层索引
          let ceindex;
          for (let index in this.usercomment) {
            if (this.usercomment[index]["_id"] == ceId) {
              ceindex = index;
              break;
            }
          }

          //vue无法直接通过数组索引来进行数据修改

          //获取需要展示的这一项
          let needshow = this.usercomment[ceindex];
          needshow.othercomment = data.list;
          this.usercomment.splice(ceindex, 1, needshow);
        }
      });
    },

    // 发送评论
    sendComment() {
      if (this.uerInput == "") {
        this.$message({
          message: "发送的内容为空",
          type: "error",
        });
        return;
      }

      if (this.$store.state.SensitiveList.length != 0) {
        //敏感词数组
        let SensitiveArr = this.$store.state.SensitiveList;
        //将数组转为特定格式的字符串
        let newSensitive = SensitiveArr.join("|");
        let reg = new RegExp(newSensitive, "g");
        //用户内容检查
        this.uerInput = this.uerInput.replace(reg, "**");
        //用户昵称检查
        this.userName = this.userName.replace(reg, "**");
      } else {
        let SensitiveArr = sessionStorage.getItem("SensitiveArr");
        if (SensitiveArr) {
          let reg = new RegExp(SensitiveArr, "g");
          //用户内容检查
          this.uerInput = this.uerInput.replace(reg, "**");
          //用户昵称检查
          this.userName = this.userName.replace(reg, "**");
        }
      }

      //当前回复的对象是层主
      if (this.commentpoin == 0) {
        let comment = new uerComments(
          this.articleId,
          this.userImg,
          this.userName,
          this.uerInput,
          "",
          "",
          this.isadmin
        );
        comment.sendComment(comment.sendData).then((data) => {
          if (data.status == 200) {
            this.uerInput = "";
            this.$message({
              message: "回复成功",
              type: "success",
            });
            // 回复成功后可以将数据添加到页面上，提升用户体验
            this.usercomment.push(data.data);
            this.iscomment = false;
          }
        });
      }

      //当前回复的对象是其他（第一次）
      if (this.commentpoin == 1) {
        let comment = new uerComments(
          this.articleId,
          this.userImg,
          this.userName,
          this.uerInput,
          this.hint.replace("回复:", ""),
          this.replyceid,
          this.isadmin
        );

        comment.sendData.replayObjIsadmin = this.replayObjIsadmin;
        comment.sendData.oldreplyCon = this.oldreplyCon;
        comment.sendOtherComment(comment.sendData).then((data) => {
          if (data.status == 200) {
            this.$message({
              message: data.msg,
              type: "success",
            });
            this.hint = "请输入评论";
            this.commentpoin = 0;
            this.uerInput = "";
            // 回复成功后可以将数据添加到页面上，提升用户体验
            //1.该层对应的其他回复数量加一即可
            //找到当前数据对应的楼层索引
            let ceindex;
            for (let index in this.usercomment) {
              if (this.usercomment[index]["_id"] == data.data.ceID) {
                ceindex = index;
                break;
              }
            }
            //获取需要展示的这一项
            let needshow = this.usercomment[ceindex];
            needshow.commentNumber += 1;
            this.usercomment.splice(ceindex, 1, needshow);

            // console.log(data.data);
          } else {
            this.$message({
              message: data.msg,
              type: "error",
            });
          }
        });
      }
    },

    // 回复层主
    reply(replyUser) {
      this.replyceid = replyUser.ceId;
      this.oldreplyCon = replyUser.oldreplyCon;
      this.hint = `回复:${replyUser.name}`;
      this.$refs.uerInput.focus();
      this.commentpoin = 1;
      this.replayObjIsadmin = false;
    },

    //回复其他用户
    replyOther(replyUser) {
      this.replyceid = replyUser.ceId;
      this.oldreplyCon = replyUser.oldreplyCon;
      this.hint = `回复:${replyUser.name}`;
      this.$refs.uerInput.focus();
      this.commentpoin = 1;
      this.replayObjIsadmin = false;
      if (replyUser.isadmin) {
        this.replayObjIsadmin = true;
      }
    },

    // 取消评论
    cancelComment() {
      this.hint = "请输入评论";
      this.uerInput = "";
      this.commentpoin = 0;
      this.replayObjIsadmin = false;
    },

    //点赞
    giveLike() {
      //一天只可以点赞一次
      let local = new setLocalStorage("readed", 1000 * 60 * 60 * 24);
      let result = local.judge();
      if (result.status == 100) {
        this.$message({
          message: "每人每天只可以点赞一次",
          type: "warning",
        });
        return;
      } else if (result.status == 101 || result.status == 102) {
        new uerComments().giveLike(this.articleId).then((data) => {
          if (data.status == 200) {
            local.create();
            this.$message({
              message: data.msg,
              type: "success",
            });
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
.readArtile {
  max-width: 1024px;
  margin: 0px auto;
  // padding: 0px 8px;

  .cont {
    background: white;
    // box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    padding: 20px;
    padding-top: 30px;
  }
}

.feedback {
  height: 150px;
  // border-bottom: 1px solid #e4e7ed;
  margin-top: 50px;
  display: flex;
  // justify-content: space-between;
  justify-content: center;
  align-items: center;
  .previous {
    overflow: hidden;
    .ico {
      cursor: pointer;
      height: 40px;
      color: #909399;

      line-height: 40px;
      &:hover {
        color: rgb(95, 95, 95);
      }
    }
  }
  .next {
    overflow: hidden;
    .ico {
      height: 40px;
      color: #909399;
      cursor: pointer;
      line-height: 40px;
      &:hover {
        color: rgb(95, 95, 95);
      }
    }
  }
  .giveLike {
    height: 40px;
    width: 80px;
    cursor: pointer;
    // background-color: rgb(64, 158, 255);
    border: 1px solid #909399;

    border-radius: 20px;
    color: #909399;
    text-align: center;
    line-height: 40px;

    &:hover {
      background-color: #909399;
      color: white;
    }
  }
}

.comment_pl {
  margin-top: 30px;
  .title {
    font-weight: 600;
    font-size: 26px;
    color: #606266;
    padding: 25px 0;
  }

  .fbBtn {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 50px;
  }
}

@media (max-width: 768px) {
  .readArtile {
    .cont {
      padding: 15px;
      padding-top: 10px;
    }
  }
}
</style>