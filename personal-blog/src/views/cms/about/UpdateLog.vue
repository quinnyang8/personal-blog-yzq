<template>
  <div class="log">
    <div class="edit">
      <el-tabs type="card">
        <el-tab-pane label="个人介绍">
          <!-- 个人信息 -->
          <div class="info">
            <el-input
              type="textarea"
              :rows="8"
              placeholder="请输入内容"
              v-model="info"
            >
            </el-input>
            <el-button type="primary" class="setBtn" @click="summitInfo"
              >提交</el-button
            >
            <el-button type="info" class="changeBtn" @click="getBegin"
              >原始</el-button
            >
          </div>
        </el-tab-pane>
        <el-tab-pane label="更新日志">
          <!-- 更新日志 -->
          <div class="updatelog">
            <el-radio-group v-model="chooseType" style="margin-bottom: 20px">
              <el-radio-button label="功能更新"></el-radio-button>
              <el-radio-button label="Bug修复"></el-radio-button>
              <el-radio-button label="内容更新"></el-radio-button>
              <el-radio-button label="代码优化"></el-radio-button>
            </el-radio-group>
            <el-input
              type="textarea"
              :rows="5"
              placeholder="请输入内容"
              v-model="updateLog"
            >
            </el-input>
            <el-button type="primary" class="setBtn" @click="summitLog"
              >提交</el-button
            >
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <div class="timeline">
      <el-timeline>
        <el-timeline-item
          v-for="item in timeData"
          :key="item.cont"
          :timestamp="item.time"
          placement="top"
        >
          <el-card>
            <h2 style="color: #606266; line-height: 60px">{{ item.type }}</h2>
            <p style="color: #909399">{{ item.cont }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>
<script>
import {
  addLog,
  getLogList,
  addIntroduce,
  getIntroduction,
} from "../../../network/log";
export default {
  data() {
    return {
      // 个人介绍
      info: "",
      //更新日志
      updateLog: "",

      //时间轴数据
      timeData: [],

      //更新日志的类型
      chooseType: "功能更新",
    };
  },

  created() {
    this.getLogList();
  },
  methods: {
    // 获取日志列表
    getLogList() {
      getLogList().then((data) => {
        if (data.status == 200) {
          this.timeData = data.list.reverse();
        } else {
          this.$message({
            message: data.msg,
            type: "error",
          });
        }
      });
    },
    //提交个人介绍
    summitInfo() {
      if (this.info != "") {
        addIntroduce(this.info).then((data) => {
          if (data.status == 200) {
            this.info = ""
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
      } else {
        this.$message({
          message: "提交的内容为空",
          type: "error",
        });
      }
    },
    //提交更新日志
    summitLog() {
      if (this.updateLog != "") {
        addLog(this.chooseType, this.updateLog).then((data) => {
          if (data.status == 200) {
            this.getLogList();
            this.updateLog = "";
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
      } else {
        this.$message({
          message: "提交内容为空",
          type: "error",
        });
      }
    },

    // 获取原始更个人介绍
    getBegin() {
      getIntroduction().then((data) => {
        if (data.status == 200) {
          this.info = data.data.cont
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
  },
};
</script>
<style lang='less' scoped>
.log {
  height: calc(100vh - 101px);
  overflow: auto;
}

.edit {
  margin-bottom: 50px;
}

.setBtn {
  position: absolute;
  bottom: 0;
  left: 0;
}

.changeBtn {
  position: absolute;
  bottom: 0;
  left: 70px;
}

.timeline {
  width: 98%;
  margin: 0 auto;
  height: calc(100vh - 437px);
  overflow: auto;
}

.info,
.updatelog {
  height: 230px;
  position: relative;
}
</style>