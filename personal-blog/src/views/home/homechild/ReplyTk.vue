
<template>
  <div class="reply">
    <el-steps :active="replyBz" finish-status="success" simple>
      <el-step icon="el-icon-user"></el-step>
      <el-step icon="el-icon-edit-outline"></el-step>
      <el-step icon="el-icon-success"></el-step>
    </el-steps>

    <div class="userimg" v-show="replyBz == 0">
      <div
        v-for="item in userimg"
        :class="{ chooseimg: true, activeImg: item == isactive }"
        :key="item"
        @click="choose(item)"
      >
        <el-image class="elimg" :src="baseUrl + item" fit="fill" :lazy="true"></el-image>
        <i class="el-icon-circle-check imgChooseBtn iisactive"></i>
      </div>
    </div>

    <div class="writeUserName" v-show="replyBz == 1">
      <div class="inputBox">
        <el-input
          maxlength="5"
          show-word-limit
          placeholder="请输入昵称"
          prefix-icon="el-icon-user"
          v-model="uerName"
        >
        </el-input>
                <el-alert
                v-show="showAlert"
                style="margin-top:10px"
    title="请输入昵称"
    type="error">
  </el-alert>
      </div>

    </div>

    <div class="finsh" v-show="replyBz == 2">
      <h1>问题说明</h1>

      <el-collapse>
        <el-collapse-item title="1.为什么不采用登录回复的方式" name="1">
          <div clas="questions">
            个人喜好，不喜欢不登录就不给用的方式
          </div>
        </el-collapse-item>
        <!-- <el-collapse-item title="2.文章界面刷新后为何无数据" name="2">
          <div clas="questions">
           因为存储当前文章id的方式是通过vuex的方式存储，刷新后id数据丢失，地址栏存储id个人觉得不美观因此不用
          </div>
        </el-collapse-item> -->
        <el-collapse-item title="2.为何层主回复后如果立刻回复层主则失败" name="3">
          <div clas="questions">无论是层主回复还是同一层下其他用户回复，如果提示回复成功，评论数据列表并非从服务器中获取，而是将本次提交的数据直接添加到相应的数据列表中，然而对应的楼层列表无相应的楼层id，因此再次回复会提示退出后重新回复</div>
        </el-collapse-item>
        <el-collapse-item title="3.是否可以支持自定义头像" name="4">
          <div clas="questions">
            会考虑支持
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>

    <div class="end"  v-show="replyBz == 3">
      <h1><span style="color:#409eff">点击完成 </span>即可</h1>

    </div>

    <div class="replyResult" v-show="replyBz == 4">

    </div>

    <div class="btn">
      <div class="btngrup">
        <button :class="{btnZ:true,showdisable:replyBz==0}" @click="back" :disabled="replyBz==0">上一步</button>
        <button class="btnZ" @click="go" id="go">下一步</button>
      </div>
    </div>
  </div>
</template>
<script>
// 该组件为回复文章时的弹框信息

import { uerComments } from "../../../class/userComments";

export default {
  data() {
    return {
  
      // 回复信息的步骤条
      replyBz: 0,

      //头像图片数据数组
      userimg: [],
      //url
      baseUrl: "",
      //   当前选中的头像
      isactive: "1.jpg",

      //用户昵称
      uerName: "",

      // 用户昵称界面的警告框
      showAlert:false

    };
  },
  watch:{
    //监听步骤条数据的改变
    replyBz:(value) => {

      if(value==3){
        document.querySelector('#go').innerHTML = '完成'
      }else{
         document.querySelector('#go').innerHTML = '下一步'
      }

    }

  },
  props: {

  },
  created() {

    //获取图片列表
    new uerComments().getUserImgList().then((data) => {
      if (data.status == 200) {
        console.log(data);
        this.userimg = data.list;
        this.baseUrl = data.url;
      }
    });

  },
  methods: {
    //   下一步
    go() {
      if(document.querySelector('#go').innerHTML != '完成'){
        if( this.replyBz==1 && this.uerName==''){
          return this.showAlert = true
        }
        this.showAlert = false
        this.replyBz += 1
          return 
      }

      //将填写的数据发送给父组件
      this.$emit('finish',{
         userName:this.uerName,
         userImg:this.isactive
      })

      this.replyBz = 0
      document.querySelector('.el-dialog__headerbtn').click()


    },

    back() {
      this.replyBz--;
    },

    //选择了一个头像
    choose(item) {
      console.log(item);
      this.isactive = item;
    },
  },
};
</script>
<style lang='less' scoped>
.reply {
  height: 50vh;
  position: relative;

  .userimg {
    height: 70%;
    // border: 1px solid #e4e7ed;
    margin-bottom: 10px;
    margin-top: 10px;
    padding: 5px;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: center;
    overflow: auto;
    .chooseimg {
      flex: none;
      width: 15%;
      height: 0;
      padding-bottom: 15%;
      position: relative;
      margin-right: 5px;
      margin-bottom: 5px;
      border: 2px solid white;

      &:hover {
        .iisactive {
          color: #409eff;
        }
      }
    }

    .activeImg {
      .iisactive {
        color: #409eff;
      }
    }
  }

  .btn {
    position: absolute;
    width: 100%;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: flex-end;
  }
}

.elimg {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 99;
}

.finsh {
  margin-top: 10px;
  height: 70%;
  overflow: auto;
  h1{
    font-size:20px;
    margin-bottom:15px;
  }


}
.end{
  height: 70%;
  display: flex;
  align-items: center;
  justify-content: center;
  h1{
    text-align: center;
  }
}


.writeUserName {
  height: 70%;
  display: flex;
  align-items: center;
  justify-content: center;
  .inputBox {
    width: 70%;
  }
}

.imgChooseBtn {
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 100;
  font-size: 20px;
  color: white;
}

.btnZ {
  width: 70px;
  height: 30px;
  border: none;
  color: #409eff;
  margin-right: 5px;
  background-color: white;
  &:hover {
    color: #81c0ff;
  }
}

.showdisable{
  color:#909399;
}

@media (max-width:768px){
.imgChooseBtn{
  font-size:12px;
}


}

</style>