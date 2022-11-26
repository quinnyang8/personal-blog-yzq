<template>
  <div class="home" ref="home">
    <FloatBall ref="FloatBall"></FloatBall>
    <div class="contBox">
      <HomeNav class="homenav" @chooseNav="choosenav"></HomeNav>

      <div class="homecontent">
        <div class="leftcont">
          <ArticleItem
            :articleitemData="item"
            v-for="(item, index) in ArticleList"
            :key="item + index"
          ></ArticleItem>
          <div class="loading" @click="loadMore">
            {{ loadingStatus }}
          </div>
        </div>

        <div class="rightcont">
          <RightMenu></RightMenu>
        </div>
      </div>
    </div>

    <div class="tk">
      <el-dialog
        title="最新公告"
        :visible.sync="dialogTableVisible"
        class="dialog"
        :width="noticeW"
      >
        <div class="noticeData markdown-body" v-html="homeNotice"></div>
        <div class="btn">
          <el-button
            type="primary"
            @click="dialogTableVisible = false"
            size="mini"
            >确定</el-button
          >
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { homeShow } from "../../tools/showheadline";
import ArticleItem from "./homechild/ArticleItem";
import FloatBall from "../../components/content/FloatBall.vue";
import HomeNav from "./homechild/HomeNav";
import RightMenu from "./homechild/RightMenu";
import { getArticleList } from "../../network/home";
import { gethomeNotice } from "../../network/notice";
import "mavon-editor/dist/markdown/github-markdown.min.css";
import "mavon-editor/dist/highlightjs/styles/github.min.css";
import { getList, add } from "../../network/sensitive";

export default {
  name: "Home",
  data() {
    return {
      // 公告是否显示
      dialogTableVisible: false,

      //服务端获取公告是否展示
      isshowNotice: false,

      homeNotice: "",

      noticeW: "50%",

      ArticleList: [],
      loadingStatus: "加载更多",
      //当前需要加载的类别
      needLoading: "yc",

      //创建一个对象用来保存当前加载的情况
      loadingState: {
        yc: {
          //已经加载的页数
          page: 0,
          // 是否已经加载完
          isover: false,
        },
        zz: {
          //已经加载的页数
          page: 0,
          // 是否已经加载完
          isover: false,
        },
        rj: {
          //已经加载的页数
          page: 0,
          // 是否已经加载完
          isover: false,
        },
      },
    };
  },
  components: {
    ArticleItem,
    HomeNav,
    RightMenu,
    FloatBall,
  },

  created() {
    this.getArticleList();
    this.cleckViewW();
    this.gethomeNotice();
    this.getList()
  },

  watch: {
    $route: function () {
      // 载入标题
      if (this.$route.path == "/home") {
        homeShow.call(this);
      }
    },
  },

  methods: {
    //请求敏感词列表，并使用vuex保存
      getList() {
      getList().then((data) => {
        if (data.status == 200) {
          let tags = data.data.data;
          this.$store.commit('getSensitive',tags)
          sessionStorage.setItem("SensitiveArr", tags.join("|"));
        } else {
          this.$message({
            message: data.msg,
            type: "error",
          });
        }
      });
    },

    //获取首页公告信息
    gethomeNotice() {
      gethomeNotice().then((data) => {
        if (data.status == 201) {
          //未开启公告
          this.isshowNotice = false;
        } else if (data.status == 200) {
          this.isshowNotice = true;
          this.homeNotice = data.data;
        } else {
          this.isshowNotice = false;
        }
        console.log(data);
      });
    },

    cleckViewW() {
      document.body.clientWidth <= 768
        ? (() => {
            this.noticeW = "90%";
          })()
        : (() => {
            this.noticeW = "50%";
          })();
    },
    choosenav(lb) {
      if (lb === this.needLoading) {
        return;
      } else {
        this.needLoading = lb;
        this.ArticleList = [];
        this.getArticleList();
      }
    },

    getArticleList() {
      getArticleList(
        this.needLoading,
        0,
        (this.loadingState[this.needLoading].page + 1) * 10
      ).then((data) => {
        if (data.status === 200) {
          this.ArticleList.push(...data.list);
          if (data.state === "over" || data.state === "all") {
            this.loadingState[this.needLoading].isover = true;
            this.loadingStatus = "没有更多数据了";
          } else if (data.state === "continue") {
            this.loadingStatus = "加载更多";
          }
        } else if (data.status === 400) {
          this.$message({
            message: "获取文章列表失败",
            type: "error",
          });
        }
      });
    },

    //加载更多数据
    loadMore() {
      if (this.loadingStatus === "加载更多") {
        getArticleList(
          this.needLoading,
          this.loadingState[this.needLoading].page + 1,
          10
        ).then((data) => {
          if (data.status === 200) {
            this.ArticleList.push(...data.list);
            this.loadingState[this.needLoading].page += 1;
            if (data.state === "over" || data.state === "all") {
              this.loadingState[this.needLoading].isover = true;
              this.loadingStatus = "没有更多数据了";
            }
          } else if (data.status === 400) {
            this.$message({
              message: "加载失败",
              type: "error",
            });
          }
        });
      }
    },
  },

  mounted() {
    //延迟1.5s展示公告
    setTimeout(() => {
      this.dialogTableVisible = this.isshowNotice;
    }, 1500);

    homeShow.call(this);
    let setFloatBall = () => {
      let homeWidth = this.$refs.home.offsetWidth;
      this.$refs.FloatBall.setposition(homeWidth);
    };
    setFloatBall();
    window.addEventListener("resize", () => {
      setFloatBall();
    });
  },
};
</script>
<style lang='less' scoped>
.home {
  max-width: 1024px;
  margin: 15px auto;
  // padding: 0px 8px;

  .contBox {
    // width: 100%;
    background: white;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    .homenav {
      margin-top: 15px;
    }

    .homecontent {
      // width: 100%;
      padding: 15px;
      display: flex;
      justify-content: space-between;
      .leftcont {
        width: 65%;
      }

      .rightcont {
        width: 30%;

        box-sizing: border-box;
      }
    }
  }
}

.loading {
  height: 30px;
  margin-top: 25px;
  background-color: #dcdfe6;
  cursor: pointer;
  text-align: center;
  line-height: 30px;
  color: #909399;
}

.tk {
  .dialog {
    .noticeData {
      height: 45vh;
      overflow: auto;
      margin-bottom: 8px;
    }
    .btn {
      display: flex;
      flex-direction: row-reverse;
    }
  }
}

@media (max-width: 768px) {
  .home {
    .contBox {
      box-shadow: 0 0 6px rgba(0, 0, 0, 0);

      .homenav {
        margin-top: 8px;
      }

      .homecontent {
        flex-direction: column;
        .leftcont {
          width: 100%;
        }
        .rightcont {
          width: 100%;
          margin-top: 70px;
        }
      }
    }
  }
}
</style>