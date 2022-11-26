<template>
  <div id="app">
    <!-- 头部 -->
    <Header v-if="controlNav()">
      <template v-slot:mainWord>
        <h1>{{headline[0]}}</h1>
      </template>
      <template v-slot:minorWord>
        <p>{{headline[1]}}</p>
      </template>
    </Header>
    <!-- 主体 -->
          <keep-alive  include="Home">
                  <router-view @componentIsLoad="showheadline"></router-view>
          </keep-alive>
    
 

 
  </div>
</template>
<script>
import Header from "./components/content/Header";
export default {
  // created() {  document.body.removeChild(document.querySelector('#Loading')) },
  data() {
    return {
      headline:[],
      isshowNav:true
    };
  },
  components: {
    Header,
  },
  watch:{
    // $route:function(){
    //   this.controlNav()
    // }

  },
  methods: {
    showheadline(headline){
      this.headline = headline
    },
    //控制header的显示和隐藏
    controlNav(){
      this.isshowNav = this.$route.path!='/login' 
      && this.$route.path!='/cms' 
      && this.$route.path!='/cms/publisharticle'
      && this.$route.path!='/cms/EditArticle'
      && this.$route.path!='/cms/leaveMessage'
      && this.$route.path!='/cms/photo'
      && this.$route.path!='/cms/Recommend'
      && this.$route.path!='/cms/UpdateLog'
      && this.$route.path!='/cms/Notice'
      && this.$route.path!='/cms/commentMange'
      && this.$route.path!='/cms/admin'



      return this.isshowNav
     
    }
  },
};
</script>
<style>
*{
  margin:0;
  padding:0;
}
body {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif !important;
  background-color: rgb(247, 247, 247);
} 


/*定义滚动条宽高及背景，宽高分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    background-color: rgba(245, 245, 245, 0.47);
}
 
/*定义滚动条的轨道，内阴影及圆角*/
::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: #ffffff;
}


/*定义滑块，内阴影及圆角*/
::-webkit-scrollbar-thumb {
    /*width: 10px;*/
    height: 20px;
    border-radius: 10px;
    background: linear-gradient(to bottom, #23252656, #41434552);
}

#fp-nav ul li a span, .fp-slidesNav ul li a span{
  background-color: rgba(255, 255, 255, 0.3) !important;
}

</style>