<template>
  <div class="EditArticle">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="原创文章" name="yc">
        <el-table :data="ycData.list[ycData.page]" stripe style="width: 100%">
          <el-table-column prop="time" label="发布时间" width="180">
          </el-table-column>
          <el-table-column prop="title" label="文章标题"> </el-table-column>
          <el-table-column
            prop="pageview"
            label="阅读数"
            align="center"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="className"
            label="类别"
            align="center"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="likenum"
            label="点赞数"
            align="center"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="comments"
            label="评论数"
            align="center"
            width="180"
          >
          </el-table-column>
          <el-table-column label="操作" align="center" width="300">
            <template slot-scope="scope">
              <el-button size="small" @click="edit(scope.row)">编辑</el-button>
              <el-button
                size="small"
                type="danger"
                @click="delArticle(scope.row['_id'])"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <!-- 转载文章 -->
      <el-tab-pane label="转载文章" name="zz">
        <el-table :data="zzData.list[zzData.page]" stripe style="width: 100%">
          <el-table-column prop="time" label="发布时间" width="180">
          </el-table-column>
          <el-table-column prop="title" label="文章标题"> </el-table-column>
          <el-table-column
            prop="pageview"
            label="阅读数"
            align="center"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="className"
            label="类别"
            align="center"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="likenum"
            label="点赞数"
            align="center"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="comments"
            label="评论数"
            align="center"
            width="180"
          >
          </el-table-column>
          <el-table-column label="操作" align="center" width="300">
            <template slot-scope="scope">
              <el-button size="small" @click="edit(scope.row)">编辑</el-button>
              <el-button
                size="small"
                type="danger"
                @click="delArticle(scope.row['_id'])"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <!-- 日记文章数据 -->
      <el-tab-pane label="个人日记" name="rj">
        <el-table :data="rjData.list[rjData.page]" stripe style="width: 100%">
          <el-table-column prop="time" label="发布时间" width="180">
          </el-table-column>
          <el-table-column prop="title" label="文章标题"> </el-table-column>
          <el-table-column
            prop="pageview"
            label="阅读数"
            align="center"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="className"
            label="类别"
            align="center"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="likenum"
            label="点赞数"
            align="center"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="comments"
            label="评论数"
            align="center"
            width="180"
          >
          </el-table-column>
          <el-table-column label="操作" align="center" width="300">
            <template slot-scope="scope">
              <el-button size="small" @click="edit(scope.row)">编辑</el-button>
              <el-button
                size="small"
                type="danger"
                @click="delArticle(scope.row['_id'])"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <!-- 项目介绍数据 -->
      <el-tab-pane label="项目介绍" name="project">
        <el-table
          :data="projectData.list[projectData.page]"
          stripe
          style="width: 100%"
        >
          <el-table-column prop="time" label="发布时间" width="180">
          </el-table-column>
          <el-table-column prop="title" label="文章标题"> </el-table-column>
          <el-table-column
            prop="pageview"
            label="阅读数"
            align="center"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="className"
            label="类别"
            align="center"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="likenum"
            label="点赞数"
            align="center"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="comments"
            label="评论数"
            align="center"
            width="180"
          >
          </el-table-column>
          <el-table-column label="操作" align="center" width="300">
            <template slot-scope="scope">
              <el-button size="small" @click="edit(scope.row)">编辑</el-button>
              <el-button
                size="small"
                type="danger"
                @click="delArticle(scope.row['_id'])"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <el-pagination
      class="pagination"
      background
      layout="prev, pager, next"
      @current-change="currentChange"
      :total="total"
    >
    </el-pagination>

    <!-- 所有弹框都放到此元素中 -->
    <div class="tk">
      <el-dialog title="填写修改内容" :visible.sync="dialogVisible" width="90%">
        <div style="margin-bottom: 20px">
          <el-input placeholder="请输入公告标题" v-model="title" class="title">
            <template slot="prepend">标题</template>
          </el-input>
          <el-select v-model="duration" placeholder="文章类别" class="duration">
            <el-option label="原创文章" value="yc"> </el-option>
            <el-option label="转载文章" value="zz"> </el-option>
            <el-option label="个人日记" value="rj"> </el-option>
            <el-option label="项目介绍" value="project"> </el-option>
          </el-select>
        </div>

        <el-input
          type="textarea"
          placeholder="请输入内容"
          v-model="preview.new"
          style="margin-bottom: 10px"
          maxlength="50"
          show-word-limit
        >
        </el-input>

        <mavon-editor
          ref="md"
          :boxShadow="false"
          style="margin-bottom: 15px; height: 500px"
          @imgAdd="$imgAdd"
          v-model="mdStr"
          @imgDel="$imgDel"
          :toolbars="markdownOption"
        />

        <el-button type="primary" @click="sendChange">提交更新</el-button>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { editor } from "../../../tools/editor";
import { getArticleList } from "../../../network/home";
import { delArticleById } from "../../../network/delArticleById";
import { uploadimg, delimg } from "../../../network/fb";
import { editArticle, getMdStr } from "../../../network/editArticle";
export default {
  data() {
    return {
      //打开的文章数据
      articleData: null,
      mdStr: "",
      //需要修改的数据
      needChange: null,
      duration: "yc",
      //文章预览内容
      preview: { old: "", new: "" },
      title: "",
      //编辑的弹框
      dialogVisible: false,
      //配置编辑器
      markdownOption: editor,
      //存放图片路径的数组
      picurl: [],
      //当前选中的栏
      activeName: "yc",
      //文章总数
      total: 10,
      ycData: {
        list: [],
        page: 0,
        total: 0,
      },
      zzData: {
        list: [],
        page: 0,
        total: 0,
      },
      rjData: {
        list: [],
        page: 0,
        total: 0,
      },
      projectData: {
        list: [],
        page: 0,
        total: 0,
      },
    };
  },

  watch: {
    //监听选项卡的改变
    activeName: {
      handler(newName) {
        this.getArticleList();
      },
      immediate: true,
    },
  },

  methods: {
    //编辑文章
    edit(articleData) {
      //打开弹框
      this.dialogVisible = true;
      //修改文章类别
      this.duration = articleData.sort;
      //修改标题
      this.title = articleData.title;
      //修改预览内容
      this.preview.new = articleData.preview;
      //修改图片数组
      this.picurl = articleData.imgUrl;

      this.articleData = articleData;

      //获取md文档
      getMdStr(articleData.fileMarkdown).then((data) => {
        if (data.status == 200) {
          this.mdStr = data.data;
        } else {
          this.$message({
            message: data.msg,
            type: "error",
          });
        }
      });
    },

    //提交更新
    sendChange() {
      //需要提交的数据
      this.needChange = {
        sort: this.duration,
        title: this.title,
        preview: this.preview.new,
        imgUrl: this.picurl,
        _id: this.articleData._id,
        fileMarkdown: this.articleData.fileMarkdown,
        fileUrl: this.articleData.fileUrl,
        mdStr: this.mdStr,
        htmlStr: this.$refs.md.d_render,
      };

      //提交的类别文字
      let className = "";
      switch (this.duration) {
        case "yc":
          className = "原创";
          break;
        case "zz":
          className = "转载";
          break;
        case "rj":
          className = "日记";
          break;
        case "project":
          className = "项目";
          break;
      }
      this.needChange.className = className;
      editArticle(this.needChange).then((data) => {
        if(data.status == 200){
          this.mdStr = ""
          this.needChange=null
          this.preview.new=""
          this.title=""
          this.picurl=[]
          this.$message({
            message: data.msg,
            type: "success",
          });
        }else{
            this.$message({
            message: data.msg,
            type: "error",
          });
        }
      });
    },
    // 绑定@imgAdd event
    $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      formdata.append("file", $file);
      uploadimg(formdata).then((data) => {
        this.$refs.md.$img2Url(pos, data.data[0].url);
        //将图片添加到图片数组里
        this.picurl.push(data.data[0].url);
      });
    },

    $imgDel(delimgarr) {
      //需要删除的图片路径
      let needDelUrl = delimgarr[0];

      //将图片数组中该图片删除
      this.picurl = this.picurl.filter((item) => {
        return item != needDelUrl;
      });

      //将服务器中的图片删除
      delimg(needDelUrl).then((data) => {
        if (data.status == 200) {
          return this.$message({
            message: data.msg,
            type: "success",
          });
        }

        this.$message({
          message: data.msg,
          type: "error",
        });
      });
    },
    //删除文章
    delArticle(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delArticleById(id).then((data) => {
            if (data.status == 200) {
              this.$message({ message: "操作成功", type: "success" });
              this.getArticleList();
              return;
            } else {
              this.$message({ message: "操作失败", type: "error" });
              // console.log(data);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    //点击分页数字后触发
    currentChange(page) {
      switch (this.activeName) {
        case "yc":
          this.ycData.page = page - 1;
          break;
        case "zz":
          this.zzData.page = page - 1;
          break;
        case "rj":
          this.rjData.page = page - 1;
          break;
        case "project":
          this.projectData.page = page - 1;
          break;
      }
    },

    //获取文章列表数据
    getArticleList() {
      getArticleList(this.activeName, 0, 0).then((data) => {
        if (data.status === 200) {
          // console.log(data);
          this[this.activeName + "Data"].total = data.list.length;
          this.total = data.list.length;

          //创建一个对象用来保存单个文章详情信息
          let articleItem = {
            id: "",
            time: "",
            title: "",
            sort: "",
            pageview: 99,
            likenum: 100,
            comments: 28,
          };

          //创建一个数组用来保存文章列表，每个数组只存10个数据
          let articleArr = [];

          //创建一个保存单维10个数据的数组
          let articleItemTen = [];

          for (let i = 1; i <= data.list.length; i++) {
            articleItemTen.push(data.list[i - 1]);
            if (i % 10 == 0) {
              articleArr.push(articleItemTen);
              articleItemTen = [];
            }

            if (i == data.list.length) {
              articleArr.push(articleItemTen);
            }
          }

          this[this.activeName + "Data"].list = articleArr;
        } else if (data.status === 400) {
          this.$message({
            message: "获取文章列表失败",
            type: "error",
          });
        }
      });
    },
  },
};
</script>
<style lang='less' scoped>
.EditArticle {
  position: relative;
  height: calc(100vh - 101px);
}
.pagination {
  position: absolute;
  bottom: 0;
  left: 0;
}

.title {
  width: 400px;
}
.duration {
  margin: 0 20px;
}
</style>