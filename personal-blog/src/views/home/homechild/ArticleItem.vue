  <template>
  <div class="article noshow" v-view="viewHandler" ref="article">
    <h1
      class="title"
      @click="
        openArticle(
          articleitemData.fileUrl,
          articleitemData.title,
          articleitemData['_id']
        )
      "
    >
      {{ articleitemData.title }}
    </h1>
    <p class="content">{{ articleitemData.preview }}</p>
    <div class="class">
      <span class="issueTime"
        ><i class="el-icon-time"></i>发布时间：{{ articleitemData.time }}</span
      >
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    articleitemData: {
      type: Object,
    },
  },

  mounted() {},

  methods: {
    viewHandler(e) {
      if (e.type == "enter") {
        this.$refs.article.classList.add(
          "animate__animated",
          "animate__slideInUp",
          "show"
        );
      }
    },
    openArticle(fileUrl, title, articleId) {
      //将文章的文件名和标题发送到vuex中
      let newArticle = {
        Title: title,
        FileName: fileUrl,
        ArticleId: articleId,
      };

      //存储文章信息在sessionStorage中，解决刷新文章消失问题
      sessionStorage.setItem("Title", title);
      sessionStorage.setItem("FileName", fileUrl);
      sessionStorage.setItem("ArticleId", articleId);

      this.$store.commit("changeArticle", newArticle);
      this.$router.push({
        path: "/readarticle",
      });
    },
  },
};
</script>
<style lang='less' scoped>
.noshow {
  opacity: 0;
}
.show {
  opacity: 1;
}
.article {
  border-bottom: 1px solid #d4d4d483;
  padding-top: 10px;
  .title {
    font-size: 22px;
    font-weight: 800;
    color: #606266;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    line-height: 2.5;
    cursor: pointer;
    &:hover {
      color: #747474;
    }
  }

  .content {
    font-size: 14px;
    color: #909399;
    line-height: 1.5;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: justify;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .class {
    margin: 15px 0;
    font-size: 12px;
    color: #909399;
    .issueTime {
      .el-icon-time {
        margin: 0 5px 0 5px;
      }
    }
  }
}
</style>