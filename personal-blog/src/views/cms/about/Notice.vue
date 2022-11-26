<template>
  <div class="notice">
    <div class="top">
      <el-button type="primary" @click="whiteNotice">写公告</el-button>
      <el-button type="info" icon="el-icon-s-tools" @click="setting"
        >设置</el-button
      >
      <el-button type="danger" icon="el-icon-delete-solid" @click="dels"
        >删除</el-button
      >
    </div>

    <div class="list">
      <el-table
        :stripe="true"
        ref="multipleTable"
        :data="noticeList.slice(page * 10, page * 10 + 10)"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="100"> </el-table-column>
        <el-table-column label="发布时间" prop="fbTime" width="300">
        </el-table-column>
        <el-table-column prop="title" label="公告标题"> </el-table-column>
        <el-table-column
          prop="startTime"
          align="center"
          label="启用时间"
          width="250"
        >
          <template slot-scope="scope">
            <el-tag>{{ scope.row.startTime }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="expires"
          align="center"
          label="到期时间"
          width="250"
        >
          <template slot-scope="scope">
            <el-tag>{{ scope.row.expires }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="300">
          <template slot-scope="scope">
            <el-button size="small" type="primary">编辑</el-button>
            <el-button
              size="small"
              v-if="!scope.row.show"
              @click="start(scope.row)"
              >启用</el-button
            >
            <el-button
              size="small"
              type="success"
              v-if="scope.row.show"
              @click="stop()"
              >停用</el-button
            >
            <el-button size="small" type="danger" @click="delNotice(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 所有弹框都放到此元素中 -->
    <div class="tk">
      <el-dialog title="填写公告内容" :visible.sync="dialogVisible" width="90%">
        <div style="margin-bottom: 20px">
          <el-input placeholder="请输入公告标题" v-model="title" class="title">
            <template slot="prepend">标题</template>
          </el-input>
          <el-select v-model="duration" placeholder="持续时间" class="duration">
            <el-option label="一天" value="1"> </el-option>
            <el-option label="三天" value="3"> </el-option>
            <el-option label="七天" value="7"> </el-option>
          </el-select>
        </div>

        <mavon-editor
          ref="md"
          :boxShadow="false"
          style="margin-bottom: 15px; height: 500px"
          @imgAdd="$imgAdd"
          v-model="mdStr"
          @imgDel="$imgDel"
          :toolbars="markdownOption"
        />

        <el-button type="primary" @click="summitNotice">发布</el-button>
      </el-dialog>
    </div>

    <el-pagination
      @current-change="currentChange"
      background
      layout="prev, pager, next"
      :total="noticeNumber"
      class="pagination"
    >
    </el-pagination>
  </div>
</template>
<script>
import { editor } from "../../../tools/editor";
import { uploadimg, delimg } from "../../../network/fb";
import {
  addNewNotice,
  getNoticeList,
  delNotice,
  startNotice,
  stopNotice,
} from "../../../network/notice";

export default {
  data() {
    return {
      mdStr: "",
      title: "",
      duration: "1",

      //存放图片路径的数组
      picurl: [],
      //公告的总数
      noticeNumber: 0,

      //当前的页面
      page: 0,

      //写公告的弹框
      dialogVisible: false,

      //配置编辑器
      markdownOption: editor,

      multipleSelection: [],

      editor: Object,
      noticeList: [],
    };
  },
  created() {
    this.getNoticeList();
  },
  methods: {
    //写公告
    whiteNotice() {
      this.dialogVisible = true;
    },

    //启用公告
    start(info) {
      startNotice(info).then((data) => {
        if (data.status == 200) {
          this.getNoticeList();
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
    },

    //停用公告
    stop() {
      stopNotice().then((data) => {
        if (data.status == 200) {
          this.getNoticeList();
          this.$message({
            message: data.msg,
            type: "success",
          });
        } else if (data.status == 201) {
          this.$message({
            message: data.msg,
            type: "info",
          });
        } else {
          this.$message({
            message: data.msg,
            type: "error",
          });
        }
      });
    },

    //获取公告列表
    getNoticeList() {
      getNoticeList().then((data) => {
        if (data.status == 200) {
          if (data.notice == false) {
            this.noticeNumber = data.list.length;
            let arr = data.list.reverse();
            this.noticeList = arr.map((item) => {
              item.expires = "0000-00-00 00:00:00";
              item.startTime = "0000-00-00 00:00:00";
              item.show = false;
              return item;
            });
            console.log(this.noticeList);
          } else {
            this.noticeNumber = data.list.length;
            let arr = data.list.reverse();
            let needId = data.notice.noticeId;
            let newList = arr.map((item) => {
              if (item._id == needId) {
                item.show = true;
                item.expires = data.notice.expires;
                item.startTime = data.notice.startTime;
              } else {
                item.show = false;
                item.expires = "0000-00-00 00:00:00";
                item.startTime = "0000-00-00 00:00:00";
              }
              return item;
            });
            this.noticeList = newList;
          }
        } else {
          this.$message({
            message: data.msg,
            type: "error",
          });
        }
      });
    },

    //提交公告
    summitNotice() {
      if (this.title == "" || this.mdStr == "") {
        return this.$message({
          message: "提交的标题或内容为空，请检查！",
          type: "error",
        });
      }

      addNewNotice(
        this.title,
        this.duration,
        this.$refs.md.d_render,
        this.mdStr,
        this.picurl
      ).then((data) => {
        if (data.status == 200) {
          this.title = "";
          this.mdStr = "";
          this.picurl.length = 0;
          this.getNoticeList();
          return this.$message({
            message: data.msg,
            type: "success",
          });
        } else {
          return this.$message({
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

    //批量删除
    dels() {
      this.multipleSelection.length == 0
        ? (() => {
            return this.$message({
              message: "您未选择任何需要删除的文件！",
              type: "error",
            });
          })()
        : console.log("hello");
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delNotice(this.multipleSelection).then((data) => {
            if (data.status == 200) {
              this.getNoticeList();
              return this.$message({
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
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    //设置
    setting() {},

    delNotice(needDel) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          if (needDel.show) {
            this.$confirm(
              "您删除的这个任务目前正在启用中，是否确认删除?",
              "提示",
              {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
              }
            )
              .then(() => {
                this.stop() 
                delNotice([needDel]).then((data) => {
                  if (data.status == 200) {
                    this.getNoticeList();
                    return this.$message({
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
              })
              .catch(() => {
                this.$message({
                  type: "info",
                  message: "已取消删除",
                });
              });
          } else {
            delNotice([needDel]).then((data) => {
              if (data.status == 200) {
                this.getNoticeList();
                return this.$message({
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
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    //页面发生改变
    currentChange(page) {
      this.page = page - 1;
    },
  },
};
</script>
<style lang='less' scoped>
.notice {
  position: relative;
  height: 100%;
  .top {
    margin-bottom: 20px;
  }

  .title {
    width: 400px;
  }
  .duration {
    margin: 0 20px;
  }
  .pagination {
    position: absolute;
    bottom: 0;
    left: 0;
  }
}
</style>