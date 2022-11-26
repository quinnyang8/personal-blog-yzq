<template>
  <div class="leaveMessage">
    <el-tabs type="border-card" @tab-click="tabClick">
      <el-tab-pane label="未读留言">
        <el-table :data="tableData[page]" stripe style="width: 100%">
          <el-table-column prop="time" label="留言时间" width="300">
          </el-table-column>
          <el-table-column prop="emil" label="邮箱"> </el-table-column>
          <el-table-column label="操作" width="180" align="center">
            <template slot-scope="scope">
              <el-button
                icon="el-icon-more"
                @click="
                  openMessage(
                    scope.row['info'],
                    scope.row['emil'],
                    scope.row['_id']
                  )
                "
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                @click="delMessage(scope.row['_id'])"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="已读留言">
        <el-table :data="tableData2[page]" stripe style="width: 100%">
          <el-table-column prop="time" label="留言时间" width="300">
          </el-table-column>
          <el-table-column prop="emil" label="邮箱"> </el-table-column>
          <el-table-column label="操作" width="180" align="center">
            <template slot-scope="scope">
              <el-button
                icon="el-icon-more"
                @click="
                  openMessage(
                    scope.row['info'],
                    scope.row['emil'],
                    scope.row['_id']
                  )
                "
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                @click="delMessage(scope.row['_id'])"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <!-- 打开留言时的对话框 -->
    <el-dialog title="留言详情" :visible.sync="dialogVisible" width="40%">
      <span class="messageInfo">{{ messageInfo }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="reply">回复</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      style="margin-top: 10px"
      :total="total"
      @current-change="currentChange"
    >
    </el-pagination>
  </div>
</template>
<script>
import {
  getLeaveMessageList,
  changeReaded,
  delMessageById,
} from "../../../network/leaveMessage";
export default {
  data() {
    return {
      dialogVisible: false,

      // 当前所有数据的数量
      total: 0,
      //当前的页码
      page: 0,

      //  当前打开回复留言的详情
      messageInfo: "",
      // 需要回复的邮箱
      replyEmil: "",

      //未读数据
      tableData: [],

      // 已读数据
      tableData2: [],

      // 当前选中的标签页
      chooseTab: "未读留言",
    };
  },

  created() {
    this.getLeaveMessageList();
  },

  methods: {
    // 删除留言
    delMessage(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delMessageById(id).then((data) => {
            if (data.status == 200) {
              this.currentChange(this.page + 1) 
              return this.$message({
                type: "success",
                message: data.msg,
              });
            } else {
              return this.$message({
                type: "error",
                message: data.msg,
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
    // 切换tab
    tabClick(tab) {
      this.page = 0;
      this.chooseTab = tab.label;
      this.currentChange(this.page + 1);
    },
    // 获取评论列表
    getLeaveMessageList() {
      getLeaveMessageList(this.page, 10, this.chooseTab == "已读留言").then(
        (data) => {
          if (data.err) {
            this.$message({
              message: "服务器异常，数据获取失败",
              type: "error",
            });
          } else {
            this.total = data.total;
            this.tableData.splice(this.page, 1, data.list);
          }
        }
      );
    },

    // 分页索引被改变
    currentChange(index) {
      getLeaveMessageList(index - 1, 10, this.chooseTab == "已读留言").then(
        (data) => {
          if (data.err) {
            this.$message({
              message: "服务器异常，数据获取失败",
              type: "error",
            });
          } else {
            this.total = data.total;
            this.page = index - 1;
            if (this.chooseTab == "未读留言") {
              this.tableData.splice(this.page, 1, data.list);
            } else {
              this.tableData2.splice(this.page, 1, data.list);
            }
          }
        }
      );
    },
    //打开留言信息
    openMessage(message, emil, messageId) {
      this.dialogVisible = true;
      this.messageInfo = message;
      this.replyEmil = emil;

      if (this.chooseTab == "已读留言") {
        return;
      }
      // 根据评论id修改评论状态
      changeReaded(messageId).then((data) => {
        if (data.status == 200) {
          this.$message({
            message: data.msg,
            type: "success",
          });
          this.currentChange(this.page + 1);
        } else {
          this.$message({
            message: data.msg,
            type: "error",
          });
        }
      });
    },

    // 回复
    reply() {
      if (this.replyEmil == "") {
        return this.$alert("当前留言无邮箱信息", "提示", {
          confirmButtonText: "确定",
        });
      }
      //   复制邮箱到剪贴板
      let tag = document.createElement("input");
      tag.setAttribute("id", "cp_zdy_input");
      tag.value = this.replyEmil;
      document.getElementsByTagName("body")[0].appendChild(tag);
      document.getElementById("cp_zdy_input").select();
      document.execCommand("copy");
      document.getElementById("cp_zdy_input").remove();
      window.open("https://mail.qq.com");
    },
  },
};
</script>
<style lang='less' scoped>
// .leaveMessage {
//   background-color: rgb(224, 224, 224);
// }

.messageInfo {
  font-size: 16px;
  letter-spacing: 1px;
  line-height: 30px;
}
</style>