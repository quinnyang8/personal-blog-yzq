<template>
    <div class="about">
      <div class="introduce">
        <h1 class="title">个人介绍</h1>
        <p class="personal">
          {{ personalInfo }}
        </p>
      </div>
      <div class="updata">
        <h1 class="title">更新日志</h1>
        <ul class="updatalist">
          <li v-for="item in loglist" :key="item.cont">
            <span class="time"
              ><i class="el-icon-timer"></i>{{ item.time }}</span
            ><span class="type">{{ item.type }}</span
            >{{ item.cont }}
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
import { aboutShow } from "../../tools/showheadline";
import { getLogList, getIntroduction } from "./../../network/log";
export default {
  data() {
    return {
      // 个人信息
      personalInfo: "",
      // 日志数组
      loglist: [],
    };
  },
  created() {
    aboutShow.call(this);
    this.getLogList();
    this.getIntroduction();
  },

  components: {},

  methods: {
    //获取个人信息
    getIntroduction() {
      getIntroduction().then((data) => {
        if (data.status == 200) {
          this.personalInfo = data.data.cont;
        } else {
          this.$message({
            message: data.msg,
            type: "error",
          });
        }
      });
    },

    // 获取日志列表
    getLogList() {
      getLogList().then((data) => {
        if (data.status == 200) {
          this.loglist = data.list.reverse();
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
<style lang="less" scoped>
.about {
  max-width: 1024px;
  padding: 20px;
  box-sizing: border-box;
  margin: 0px auto;
    // box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: white;
  // min-height: 100px;
}
.title {
  color: #303133;
  font-size: 20px;
  margin-bottom: 15px;
}

.introduce {
  margin-top: 50px;
  margin-bottom: 35px;
  .personal {
    color: #606266;
    font-size: 14px;
    line-height: 1.5rem;
    text-align: justify;
  }
}

.updata {
  .updatalist {
    list-style: none;
    color: #606266;
    letter-spacing: 1px;
    li {
      margin-bottom: 20px;
      text-align: justify;
      line-height: 1.5rem;
      font-size: 14px;
      .time {
        color: #606266;
        font-size: 14px;
        margin-right: 5px;
      }

      .type {
        color: white;
        font-size: 14px;
        margin-right: 5px;
        background: #339c5b;
      }
    }
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