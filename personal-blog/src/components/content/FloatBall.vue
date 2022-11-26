<template>
  <div class="floatBall" ref='floatBall'>
    <div class="hidden" ref="hidden">
      <div class="top" v-if="isopen" @click="top" ref="top">
        <i class="el-icon-arrow-up"></i>
      </div>

      <div class="back" v-if="isopen" ref="back" @click="back">
        <i class="el-icon-back"></i>
      </div>
    </div>

    <div class="open" @click="open" ref="open">
      <i class="el-icon-menu" v-show="!isopen"></i>
      <i class="el-icon-close" v-show="isopen"></i>
    </div>
  </div>
</template>
<script>
// 悬浮球模块
export default {
  data() {
    return {
      //是否展开悬浮球
      isopen: false,
    };
  },

  props:{
 
  },

  mounted() {
   
  },

  methods: {
    // 打开悬浮球
    open() {
      
      this.isopen = !this.isopen;
      if(!this.isopen)return 
      this.$nextTick(() => {
        this.$refs.top.classList.add("showhidden");
        this.$refs.back.classList.add("showhidden");
      });
    },

    back(){

      if(this.$route.path == '/readarticle'){
        this.$router.go(-1);
      }else if(this.$route.path == '/photo'){
        this.$router.replace('/home');
      }

    },

    top() {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    },

    //设置组件的位置  homeContWidth home页面主体宽度
    setposition(homeContWidth) {
      //判断当前视口大小
       let viewWidth = document.body.clientWidth
       if(viewWidth>=768){
          let setLeft = (viewWidth - homeContWidth)/2 + homeContWidth
          this.$refs.floatBall.style.left = setLeft+5+ 'px'
       }else{
          this.$refs.floatBall.style.right = '15px'
       }

       


    },
  },
};
</script>
<style lang='less' scoped>
.floatBall {
   position:fixed;
  bottom:80px;
  z-index: 999;

  .top,
  .open,
  .back {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    background-color: white;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
    text-align: center;
    line-height: 40px;
    color: #606266;
    font-size: 18px;
    margin-bottom: 4px;
    &:hover {
      background-color: #409eff;
      color: white;
    }
  }
}


.open {
  position: relative;
  z-index: 10;
}

.back {
  transform: translateY(44px);
}
.top {
  transform: translateY(88px);
}

.showhidden {
  animation-name: floatball;
  animation-duration: 0.7s;
  animation-fill-mode: forwards;
}

@keyframes floatball {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
}

@media (max-width: 768px){
  .floatBall {
  .top,
  .open,
  .back {
    &:hover {
      background-color: white;
         color: #606266;
    }
  }
}

}


</style>