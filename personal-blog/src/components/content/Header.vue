<template>
  <div class="header" ref="header">
    <div class="backColor" :class="{ showbg: $route.path == '/about' }">
      <div class="nav" :class="{ flex: nav_show }">
        <div class="logo" @click="skip(66)">Yang Ziqing</div>
        <ul class="leftList">
          <li
            v-for="(item, index) in navMenu"
            @click="skip(index)"
            :key="item"
            style="list-style: none"
            :class="{ showline: select == index }"
          >
            {{ item }}
          </li>
          <span class="toCms" @click="skip(6)">后台</span>
        </ul>
        <div class="ico" @click="drawer = true">
          <i class="el-icon-more"></i>
        </div>
      </div>

      <div class="introduce">
        <slot name="mainWord"></slot>
        <slot name="minorWord"></slot>
      </div>
    </div>
    <!-- 弹出框 -->
    <el-drawer :visible.sync="drawer" :direction="direction" :size="size">
      <ul class="menu">
        <li
          v-for="(item, index) in navMenu"
          @click="skip(index)"
          :key="item"
          :class="{ showline: select == index }"
        >
          {{ item }}
        </li>
      </ul>
    </el-drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      drawer: false,
      direction: "rtl",
      size: "60%",
      navMenu: ["首页", "关于", "留言板", "项目介绍"],
      select: 0,
      nav_show: false,
    };
  },
  computed: {},
  watch: {
    // 监听路由变化
    $route(to, from) {
      // eslint-disable-line no-unused-vars
      this.solveRouter();
    },
  },
  mounted() {
    //监听滚动事件
    window.addEventListener("scroll", this.handleScroll);
  },
  created() {},
  methods: {
    skip(index) {
      this.select = index;
      switch (index) {
        case 0:
          this.$router.push("/home");
          break;
        case 1:
          this.$router.push("/about");
          break;
        case 2:
          this.$router.push("/leavemessage");
          break;
        case 3:
          this.$router.push("/introduce");
          break;
        case 6:
          this.$router.push("/cms");
          break;
        case 66:
          if (this.$route.fullPath != "/home") {
            this.$router.push("/home");
          }
      }

      document.querySelector(".el-drawer__close-btn").click();
    },
    handleScroll() {
      // 页面滑动的距离
      let scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop;

      //查看当前header的高度
      let headerHeight = this.$refs.header.offsetHeight;

      // 当页面滑动的距离大于header显示，否则不显示
      if (scrollTop >= headerHeight) {
        this.nav_show = true;
      } else {
        this.nav_show = false;
      }
    },

    // 解决页面刷新后，select重置为0,与当前路由不匹配
    solveRouter() {
      let url = this.$route.path;
      switch (url) {
        case "/about":
          this.select = 1;
          break;
        case "/leavemessage":
          this.select = 2;
          break;
        case "/introduce":
          this.select = 3;
          break;
      }
    },
  },
};
</script>
<style lang='less' scoped>
.header {
  .showbg {
    background: url("../../assets/img/aboutBg.jpg") no-repeat center center;
    background-size: cover;
  }

  .backColor {
    background-color: rgb(225, 162, 221);
    height: 420px;
    position: relative;
    .flex {
      position: fixed;
      background-color: rgb(225, 162, 221);
      // top: 0;
      animation-name: shownav;
      z-index: 99;
      animation-duration: 0.5s;
    }
    @keyframes shownav {
      from {
        top: -60px;
      }
      to {
        top: 0px;
      }
    }
    .nav {
      display: flex;
      justify-content: space-between;
      width: 100%;
      .logo {
        font-size: 16px;
        font-weight: 600;
        padding: 20px;
        height: 20px;
        color: white;
      }
      .logo:hover {
        cursor: help;
      }
      .leftList {
        position: relative;
        display: flex;
        width: 260px;
        justify-content: space-around;
        li {
          padding: 20px 0 0 0;
          color: white;
          font-size: 12px;
          border-bottom: 1px solid rgba(255, 255, 255, 0);
          height: 24px;

          text-align: center;
          transition: 0.3s;
          cursor: pointer;
          &:hover {
            border-bottom: 1px solid white;
          }
        }
        // 显示横线
        .showline {
          border-bottom: 1px solid white;
        }
      }
      .toCms {
        display: inline-block;
        width: 30px;
        position: absolute;
        top: 20px;
        right: 280px;
        color: #fff;
        font-size: 13px;
      }
      .toCms:hover {
        cursor: pointer;
      }
      .ico {
        display: none;
      }
    }

    .introduce {
      width: 80%;
      height: 40%;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;

      h1 {
        color: white;
        font-size: 50px;
        font-weight: 700;
        text-align: center;
        line-height: 80px;
        letter-spacing: 5px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      p {
        color: white;
        font-size: 18px;
        text-align: center;
        line-height: 20px;
        letter-spacing: 2px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}

@media (max-width: 765px) {
  .menu {
    width: 100%;
    li {
      text-align: center;
      padding: 15px;
      color: #303133;
      font-size: 14px;
      cursor: pointer;
      list-style: none;
    }
  }

  .header {
    .showbg {
      background-size: 100% 100%;

      background-position: 0 0;
    }
    .backColor {
      height: 250px;
      .nav {
        .logo {
          font-size: 14px;
          padding: 10px;
        }
        .leftList {
          display: none;
        }
        .ico {
          display: block;
          height: 10px;
          padding: 10px;
          i {
            color: white;
          }
        }
      }

      .introduce {
        //  height: 60px;
        h1 {
          font-size: 30px;

          line-height: 50px;
          letter-spacing: 3px;
        }
        p {
          font-size: 12px;

          line-height: 20px;
          letter-spacing: 2px;
        }
      }
    }
  }
}
</style>