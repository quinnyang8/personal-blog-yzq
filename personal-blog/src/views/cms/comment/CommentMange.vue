<template>
  <div class="comment">
    <!-- 左侧的文章列表 -->
    <div class="articleList">
      <el-empty
        description="暂无其他回复"
        v-if="leftList.length == 0"
      ></el-empty>
      <ArticleListItem
        v-for="(item, index) in leftList"
        @click.native="getDetil(item._id, index)"
        :key="item._id"
        :isshowStyle="clickArr[index]"
      >
        <template v-slot:title>
          <span>{{ item.title }}</span>
        </template>

        <template v-slot:commentNumber>
          <span>{{ item.comments }}</span>
        </template>

        <template v-slot:readNumber>
          <span>{{ item.pageview }}</span>
        </template>

        <template v-slot:likeNumber>
          <span>{{ item.likenum }}</span>
        </template>
        <template v-slot:noReadNumber>
          <span>{{ item.adminNoCommentNumber }}</span>
        </template>
      </ArticleListItem>
    </div>

    <!-- 右侧评论详情 -->
    <div class="commentDetil">
      <ReplyDetil
        :needRelyInfo="item"
        :articleId="articleId"
        :replyObj="item.replyObj"
        @finshSend="finshSend"
        v-for="item in rightList"
        :key="item._id"
      >
        <template v-slot:img>
          <el-image
            style="width: 100%; height: 100%"
            :src="item.userImg"
            fit="fill"
          ></el-image>
        </template>

        <template v-slot:name>
          {{ item.userName }}
        </template>
        <template v-slot:cont>
          {{ item.commentCont }}
        </template>

        <template v-slot:commentPoint>
          {{ item.commentPoint }}
        </template>

        <template v-slot:otherCom>
          {{ item.oldreplyCon }}
        </template>

        <template v-slot:time>
          {{ item.commentTime }}
        </template>
      </ReplyDetil>
    </div>
  </div>
</template>

<script>
import ArticleListItem from "./children/ArticleListItem.vue";
import ReplyDetil from "./children/ReplyDetil.vue";
import { getAdminIsNoComList, getNoComList } from "../../../network/comment";
export default {
  data() {
    return {
      leftList: [],
      rightList: [],
      articleId: "",

      // 定义一个数组用来保存左侧的点选情况
      clickArr: [],
    };
  },

  created() {
    this.getAdminIsNoComList();
    //发送事件改变背景颜色
    this.$emit("changeBg");
  },
  destroyed() {
    //组件销毁时还原颜色
    this.$emit("recoverBg");
  },

  methods: {
    //如果回复完成则重新请求数据来刷新列表
    finshSend() {
      this.getAdminIsNoComList();
      this.getDetil(this.articleId);
    },

    //初始化判断数组
    arrInit() {
      this.clickArr = [];
      for (let item of this.leftList) {
        if (item._id == this.articleId) {
          this.clickArr.push(true);
        } else {
          this.clickArr.push(false);
        }
      }
    },

    //获取左侧列表
    getAdminIsNoComList() {
      getAdminIsNoComList().then((data) => {
        if (data.status == 200) {
          this.leftList = data.list;
          // console.log(this.leftList);
          this.arrInit();
        } else {
        
    
        }
      });
    },

    //点击左侧后展示相关评论信息
    getDetil(id, index) {
      this.articleId = ""
      this.arrInit();
      this.clickArr[index] = true;
      this.articleId = id;
      getNoComList(id).then((data) => {
        if (data.status == 200) {
          let result = data.list[0].concat(data.list[1]);
          let list = result.map(function (item) {
            //如果当前的元素里有ceID这个属性，则判定当前元素为其他用户回复管理员
            item.replyObj = "fbpl";
            if (item.ceID) {
              item.replyObj = "hfpl";
            }
            return item;
          });
          this.rightList = list;
          // console.log(list);
        } else {
          this.$message({
            message: data.msg,
            type: "error",
          });
        }
      });
    },
  },
  components: {
    ArticleListItem,
    ReplyDetil,
  },
};
</script>
<style lang='less' scoped>
.comment {
  height: calc(100vh - 101px);
  overflow: auto;
  padding: 30px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.articleList {
  border-radius: 10px;
  width: 18%;
  height: 100%;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
  background: #ffffff;
  // border: 1px solid rgb(219, 219, 219);
  box-sizing: border-box;
  overflow: auto;
  padding: 20px;
  &::-webkit-scrollbar {
    display: none;
  }
}
.commentDetil {
  width: 80%;
  height: 100%;
  background: white;
  overflow: auto;
  // border: 1px solid rgb(219, 219, 219);
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  border-left: none;
  box-sizing: border-box;
  padding: 10px;
}
</style>