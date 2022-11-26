<template>
  <transition name="my">
    <div class="leavemessage">
      <div class="email">
        <el-input
          placeholder="请输入邮箱 **选填**"
          prefix-icon="el-icon-message"
          @input="checkEmail"
          type="email"
          v-model="email"
        >
        </el-input>
      </div>
      <el-alert
        title="邮箱格式有误"
        v-if="email != '' && !emailIsOk"
        style="margin-bottom: 10px"
        type="error"
      >
      </el-alert>

      <div class="message">
        <el-input
          type="textarea"
          :rows="10"
          placeholder="请输入留言信息"
          v-model="textarea"
        >
        </el-input>
      </div>

      <div class="btn" @click="sendMessage">发送</div>
    </div>
  </transition>
</template>
<script>
import { leavemessageShow } from "../../tools/showheadline";
import setLocalStorage from "../../tools/localStorage";
import { addLeaveMessage } from "../../network/leaveMessage";
export default {
  data() {
    return {
      email: "",
      textarea: "",

      // 邮箱格式是否正确
      emailIsOk: true,
    };
  },
  mounted() {
    // 载入标题
    leavemessageShow.call(this);
  },
  methods: {
    // 验证邮箱的正确
    checkEmail() {
      if (this.email == "") return (this.emailIsOk = true);
      let checkEmailReg =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (checkEmailReg.test(this.email)) {
        this.emailIsOk = true;
      } else {
        this.emailIsOk = false;
      }
    },

    //发送留言
    sendMessage() {
      if (this.emailIsOk && this.textarea != "") {
        let local = new setLocalStorage("message", 1000 * 60 * 60 * 24);
        let result = local.judge();
        if (result.status == 100) {
          this.$message.error("每天只可以发送一条留言");
        } else if (result.status == 101 || result.status == 102) {
          // 失效或不存在，则创建，并向服务器发送数据
          addLeaveMessage(this.email, this.textarea).then((data) => {
            if (data.status == 200) {
              this.$message.success(data.msg);
              this.email = "";
              this.textarea = "";
              local.create();
            } else {
              this.$message.error(data.msg);
            }
          });
        }
      } else {
        this.$message.error("邮箱格式有误或提交内容为空");
      }
    },
  },
};
</script>
<style lang='less' scoped>
.leavemessage {
  max-width: 1024px;
  padding: 20px;
  box-sizing: border-box;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
  margin: 15px auto;
  background-color: white;
}

.email {
  margin: 10px 0;
}

.message {
  margin-bottom: 10px;
}

.btn {
  width: 70px;
  height: 35px;
  background-color: #34495e;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 14px;
  text-align: center;
  line-height: 35px;
  border-radius: 4px;
  color: #e0e0e0;
  cursor: pointer;
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