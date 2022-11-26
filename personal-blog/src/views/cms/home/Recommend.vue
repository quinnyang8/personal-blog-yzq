<template>
  <div class="recommend">
    <div class="topSumit">
      <div class="title">
        <el-input placeholder="请输入标题" v-model="title">
          <template slot="prepend">标题</template>
        </el-input>
      </div>
      <div class="sumbit">
        <el-input placeholder="请输入地址" v-model="url">
          <template slot="append">
            <el-button :icon="iconAdd" type="primary" @click="addRecomment"
              >添加</el-button
            ></template
          >
        </el-input>
      </div>
    </div>

    <div class="list">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          width="300"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="url" label="地址" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="small" @click="look(scope.row['url'])"
              >查看</el-button
            >
            <el-button
              type="danger"
              size="small"
              icon=""
              ref="delItem"
              @click="delItem(scope.row['_id'])"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="btn">
      <el-button
        type="primary"
        ref="chooseAllBtn"
        :icon="chooseAllIcon[chooseAllBtn.choose]"
        @click="chooseAll"
        >{{ chooseAllBtn.font[chooseAllBtn.choose] }}</el-button
      >
      <el-button type="danger" :icon="iconDel" @click="delMore">删除</el-button>
    </div>
  </div>
</template>
<script>
import { addRecommend, getList, del } from "../../../network/recommend";
export default {
  data() {
    return {
      //添加按钮图标
      iconAdd: "el-icon-plus",
      //删除单个按钮图标
      iconDel: "el-icon-delete",
      title: "",
      url: "",
      tableData: [],
      multipleSelection: [],

      //全选按钮选择
      chooseAllIcon: ["el-icon-check", "el-icon-close"],
      chooseAllBtn: { font: ["全选", "取消"], choose: 0 },
    };
  },

  created() {
    this.getList();
  },

  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
    },

    //查看链接
    look(url) {
      window.open(url);
    },

    // 获取推荐信息列表
    getList() {
      getList().then((data) => {
        data.status == 200
          ? (this.tableData = data.list)
          : this.$message({
              message: data.msg,
              type: "error",
            });
      });
    },

    // 添加推荐信息
    addRecomment() {
      if (this.title != "" && this.url != "") {
        this.iconAdd = "el-icon-loading";
        addRecommend(this.title, this.url).then((data) => {
          data.status == 200
            ? (this.$message({
                message: data.msg,
                type: "success",
              }),
              (this.title = ""),
              (this.url = ""),
              this.getList())
            : this.$message({
                message: data.msg,
                type: "error",
              });

          this.iconAdd = "el-icon-plus";
        });
      } else {
        this.$message({
          message: "内容为空，发送失败",
          type: "error",
        });
      }
    },

    // 删除文章数据
    delItem(list) {
      //判断传入值的类型，区分是删除单个还是多个
      typeof list == "string" ? (list = [list]) : list;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          del(list).then((data) => {
            data.status == 200
              ? (this.$message({
                  message: data.msg,
                  type: "success",
                }),
                this.getList())
              : this.$message({
                  message: data.msg,
                  type: "error",
                });

            this.iconDel = "el-icon-delete";
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
          this.iconDel = "el-icon-delete";
        });
    },

    //删除多个文章数据
    delMore() {
      this.iconDel = "el-icon-loading";
      if (this.multipleSelection.length == 0) {
        this.iconDel = "el-icon-delete";
        return this.$message({
          type: "error",
          message: "您未选择任何项",
        });
      }

      let list = this.multipleSelection.map((value) => {
        return value["_id"];
      });
      this.delItem(list);
    },

    chooseAll() {
      document.querySelector(".el-checkbox__input").click();
      this.chooseAllBtn.choose == 0
        ? (this.chooseAllBtn.choose = 1)
        : (this.chooseAllBtn.choose = 0);
    },
  },
};
</script>
<style lang='less' scoped>
.topSumit {
  display: flex;
  margin-bottom: 20px;
  .title {
    flex-grow: 1;
    margin-right: 20px;
  }
  .sumbit {
    flex-grow: 2;
  }
}

.list {
  height: calc(100vh - 250px);
  margin-bottom: 20px;
  overflow: auto;
}
</style>