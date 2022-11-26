<template>
  <div class="cms">
    <div class="header">
      <div class="logo" @click="toHome">Ziqing</div>
      <div class="info">
        <div class="userimg">
          <el-image :src="userinfo.userimg" fit="fill"></el-image>
        </div>

        <span class="userName">{{ userinfo.name }}</span>
        <div>
          <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">个人信息</el-dropdown-item>
              <el-dropdown-item command="b">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <div class="cont">
      <div class="left">
        <el-menu
          default-active="1"
          class="leftMenu"
          background-color="#E1A2DD"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-house"></i>
              <span>首页</span>
            </template>
            <el-submenu index="1-1">
              <template slot="title">文章管理</template>
              <el-menu-item index="1-1-1" @click="PublishArticle"
                >发布文章</el-menu-item
              >
              <el-menu-item index="1-1-2" @click="EditArticle"
                >编辑文章</el-menu-item
              >
            </el-submenu>
            <el-menu-item index="1-2" @click="Recommend">
              <span>推荐阅读</span>
            </el-menu-item>
            <el-menu-item index="1-3" @click="Photo">
              <span>个人图库</span>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-view"></i>
              <span slot="title">关于</span>
            </template>
            <el-menu-item index="2-1" @click="notice"> 公告信息 </el-menu-item>
            <el-menu-item index="2-2" @click="updatelog">
              更新日志
            </el-menu-item>
          </el-submenu>

          <el-menu-item index="3" @click="leaveMessage">
            <i class="el-icon-chat-line-round"></i>
            <span slot="title">留言板</span>
          </el-menu-item>

          <el-menu-item index="4" @click="commentMange">
            <i class="el-icon-reading"></i> <span slot="title">评论管理</span>
          </el-menu-item>

          <el-menu-item index="5" @click="admin">
            <i class="el-icon-user"></i> <span slot="title">管理员</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="main" ref="main">
        <router-view @changeBg="changeBg" @recoverBg="recoverBg"></router-view>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userinfo: {},
    };
  },

  created() {
    this.getuserinfo();
  },

  methods: {
    //返回首页
    toHome() {
      this.$router.push("/home");
    },
    //改变背景颜色
    changeBg() {
      let that = this;
      this.$nextTick(function () {
        that.$refs.main.classList.add("changeBg");
      });
    },
    //还原背景颜色
    recoverBg() {
      this.$refs.main.classList.remove("changeBg");
    },
    // 退出登录，设置个人中心
    handleCommand(command) {
      //  点击个人信息
      if (command == "a") {
      }
      //点击退出登录
      else if (command == "b") {
        //清除当前token，并跳转到登录界面
        sessionStorage.removeItem("token");
        this.$router.replace("/login");
      }
    },

    //从vuex中获取当前登录的用户数据
    getuserinfo() {
      this.userinfo = this.$store.state.loadingUser;
    },
    //发布文章
    PublishArticle() {
      this.$router.replace("/cms/publisharticle");
    },
    //编辑文章
    EditArticle() {
      this.$router.replace("/cms/EditArticle");
    },
    //留言板
    leaveMessage() {
      this.$router.replace("/cms/leaveMessage");
    },

    // 个人图库
    Photo() {
      this.$router.replace("/cms/photo");
    },

    // 推荐阅读
    Recommend() {
      this.$router.replace("/cms/Recommend");
    },

    //更新日志
    updatelog() {
      this.$router.replace("/cms/UpdateLog");
    },

    //公告信息
    notice() {
      this.$router.replace("/cms/Notice");
    },

    //评论管理
    commentMange() {
      this.$router.replace("/cms/commentMange");
    },

    //管理员
    admin() {
      this.$router.replace("/cms/admin");
    },
  },
};
</script>
<style lang='less' scoped>
.header {
  display: flex;

  justify-content: space-between;

  height: 60px;
  background-color: rgb(225, 162, 221);
  border-bottom: 1px solid #dcdfe6;
  line-height: 60px;
  .logo {
    padding-left: 20px;
    font-size: 26px;
    color: #ffffff;
    font-weight: 500;
  }
  .logo:hover {
    cursor: pointer;
  }

  .info {
    display: flex;
    width: 180px;
    line-height: 60px;
    justify-content: space-around;
    color: white;
    .userimg {
      height: 45px;
      width: 45px;
      margin-top: 7px;
      border-radius: 50%;
      overflow: hidden;
    }
  }
}

.el-dropdown-link {
  cursor: pointer;
  color: #ffffff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}

.cont {
  height: calc(100vh - 61px);

  overflow: auto;
  display: flex;
  justify-content: space-between;

  .left {
    width: 15%;
    height: 100%;
    background-color: rgb(225, 162, 221);

    .leftMenu {
      border-right: none;
    }
  }

  .main {
    width: 85%;
    height: 100%;
    box-sizing: border-box;
    padding: 20px;
    background-color: white;
    overflow: auto;
  }

  .changeBg {
    background-color: #f2f6fc;
  }
}
</style>