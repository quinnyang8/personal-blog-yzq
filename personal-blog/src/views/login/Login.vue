<template>
  <div class="login">
    <div class="left">
      <el-image :src="imgsrc" style="height: 100%"></el-image>
    </div>
    <div class="right">
      <h1 class="name">admin</h1>
      <div class="user">
        <el-input v-model="name" placeholder="请输入用户名"></el-input>
      </div>
      <div class="password">
        <el-input
          v-model="password"
          placeholder="请输入密码"
          show-password
        ></el-input>
      </div>

      <div class="btn" @click="login">登 录</div>
    </div>
  </div>
</template>
<script>
import { getLogin } from "../../network/login";

export default {
  data() {
    return {
      name: "",
      password: "",
      imgsrc: require("../../assets/img/login.jpg"),
    };
  },

  methods: {
    login() {
      getLogin(this.name, this.password).then((data) => {
        this.$store.commit('getloadingUserInfo', data)
        if (data.status == 200) {
          sessionStorage.setItem("token", data.token);
          this.$message({
            message: "欢迎回来," + data.name,
            type: "success",
          });
          this.$router.replace("/cms");
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
.login {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  box-shadow: 5px 5px 18px rgba(0, 0, 0, 0.1);

  display: flex;
  width: 700px;
  height: 400px;
  .left {
    width: 300px;
    height: 400px;
  }

  .right {
    padding: 30px;

    width: 340px;
    height: 340px;
    background: rgb(255, 255, 255);
    .name {
      text-align: center;
      margin-top: 35px;
      font-size: 30px;
      font-weight: 600;
      color: rgb(100, 100, 100);
    }
    .user {
      margin-top: 35px;
    }
    .password {
      margin: 15px 0;
    }
    .btn {
      height: 40px;
      margin-top: 25px;
      background-color: rgb(100, 100, 100);
      color: white;
      font-size: 18px;
      text-align: center;
      line-height: 40px;
      cursor: pointer;
      &:hover {
        background-color: rgb(77, 77, 77);
      }
    }
  }
}
</style>