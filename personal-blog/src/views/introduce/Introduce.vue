<template>
    <div class="introduce">
      <div class="cont markdown-body" v-html="projectData"></div>
      <el-empty description="暂无文章数据" v-if="isShowNo"></el-empty>
    </div>
</template>
<script>
import { introduceShow } from "../../tools/showheadline";
import { getArticleList, getArticleData } from "../../network/home";

import "mavon-editor/dist/markdown/github-markdown.min.css";
import "mavon-editor/dist/highlightjs/styles/github.min.css";

export default {
  data() {
    return {
      projectData: "",
      // 如果无数据则显示
      isShowNo: false,
    };
  },
  mounted() {
    // 载入标题
    introduceShow.call(this);
  },
  created() {
    this.getArticleList();
  },

  methods: {
    getArticleList() {
      getArticleList("project", 0, 0)
        .then((data) => {
          if (data.status == 200) {
            if (data.list.length == 0) {
              this.isShowNo = true;
              return Promise.reject();
            }
            return getArticleData(data.list[0].fileUrl);
          } else {
            return Promise.reject();
          }
        })
        .then((data) => {
          console.log(data);
          if (data.status == 200) {
            this.projectData = data.data;
          } else {
            return Promise.reject();
          }
        })
        .catch(() => {
          this.$message({
            message: "获取数据失败",
            type: "error",
          });
        });
    },
  },
};
</script>
<style lang='less' scoped>
.introduce {
  max-width: 1024px;
  padding: 20px;
  box-sizing: border-box;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
  margin: 15px auto;
  background-color: white;

  .cont {
    width: 100%;
    overflow: hidden;
  }
}

.my-enter {
  transform: scale(0);
  opacity: 0;
}
.my-enter-active {
  transition: all 0.5s;
}
.my-enter-to {
  transform: scale(1);
  opacity: 1;
}
</style>