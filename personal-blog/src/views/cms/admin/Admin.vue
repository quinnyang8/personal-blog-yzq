<template>
  <div class="admin">
    <div class="topTool">
      <div class="item">
        <span class="setfont">是否开启评论</span>
        <el-switch
          v-model="isOpenCom"
          active-color="#13ce66"
          inactive-color="#ff4949"
        >
        </el-switch>
      </div>
      <div class="item">
        <span class="setfont">是否开启留言</span>
        <el-switch
          v-model="isOpenMess"
          active-color="#13ce66"
          inactive-color="#ff4949"
        >
        </el-switch>
      </div>
      <div class="item">
        <span class="setfont">是否开启点赞</span>
        <el-switch
          v-model="isOpenGiveLike"
          active-color="#13ce66"
          inactive-color="#ff4949"
        >
        </el-switch>
      </div>
      <div class="item">
        <span class="setfont">是否开启网站访问</span>
        <el-switch
          v-model="isOpenBlog"
          active-color="#13ce66"
          inactive-color="#ff4949"
        >
        </el-switch>
      </div>
    </div>

    <div class="mainSetting">
      <div class="adminInfo">信息设置</div>
      <div class="maininfo">
        <div class="userName">
          当前用户名：<span class="name">admin</span>
          <el-button type="primary" size="mini">修改</el-button>
        </div>

        <div class="sensitive">
          <span class="sensitiveFot">敏感词设置：</span>
          <el-button type="primary" @click="openSensitive" size="mini"
            >设置</el-button
          >
          <el-dialog title="敏感词设置" :visible.sync="sensitiveVisible">
            <div class="sensitiveInput">
              <el-input
                placeholder="请输入内容，多个可以用*隔开"
                v-model="sensitiveTxt"
              >
                <template slot="append">
                  <el-button type="primary" @click="addSensitive" size="mini"
                    >添加</el-button
                  ></template
                >
              </el-input>
            </div>

            <div class="list">
              <el-tag
                v-for="tag in tags"
                :key="tag"
                style="margin-right: 10px; margin-bottom: 10px"
                closable
                :disable-transitions="false"
                @close="removeSensitive(tag)"
              >
                {{ tag }}
              </el-tag>
            </div>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getList, add } from "../../../network/sensitive";
export default {
  data() {
    return {
      // 是否开启评论
      isOpenCom: true,
      //开启留言
      isOpenMess: true,
      //开启点赞
      isOpenGiveLike: true,
      //开启网站访问
      isOpenBlog: true,

      //铭感词是否展开
      sensitiveVisible: false,

      //输入的敏感词
      sensitiveTxt: "",

      //敏感词列表
      tags: [],
    };
  },
  methods: {
    //修改敏感词
    changeSensitive(){
      add(this.tags).then((data) => {
          if (data.status == 200) {
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

    //添加敏感词
    addSensitive() {
      if (this.sensitiveTxt != "") {
        let newArr = this.sensitiveTxt.split("*");
        this.tags = this.tags.concat(newArr);
        this.changeSensitive()
      }
    },

    // 打开敏感词
    openSensitive() {
      this.sensitiveVisible = true;
      this.getList();
    },

    //获取敏感词列表
    getList() {
      getList().then((data) => {
        if (data.status == 200) {
          this.tags = data.data.data;
        } else {
          this.$message({
            message: data.msg,
            type: "error",
          });
        }
      });
    },

    removeSensitive(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
       this.changeSensitive();

    },
  },
  created() {
    //发送事件改变背景颜色
    this.$emit("changeBg");
  },
  destroyed() {
    //组件销毁时还原颜色
    this.$emit("recoverBg");
  },
};
</script>
<style lang='less' scoped>
.topTool {
  background-color: white;
  height: 60px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  padding: 10px;
  box-sizing: border-box;
  overflow: hidden;
  border-radius: 5px;
  margin-bottom: 20px;
  .item {
    display: inline-block;
    margin-right: 35px;
    .setfont {
      font-size: 18px;
      line-height: 40px;
      letter-spacing: 1px;
      color: #606266;
      margin-right: 15px;
    }
  }
}

.mainSetting {
  height: calc(100vh - 181px);
  background-color: white;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  padding: 10px;
  box-sizing: border-box;
  overflow: auto;
  border-radius: 5px;

  .adminInfo {
    font-size: 16px;
    color: #606266;
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid #e4e7ed;
    margin-bottom: 20px;
  }

  .sensitiveInput {
    width: 400px;
    margin-bottom: 15px;
  }

  .maininfo {
    .userName {
      color: #606266;
      margin-bottom: 20px;
      .name {
        margin-right: 15px;
      }
    }

    .sensitive {
      color: #606266;
      .sensitiveFot {
        margin-right: 15px;
      }
    }
  }
}
</style>