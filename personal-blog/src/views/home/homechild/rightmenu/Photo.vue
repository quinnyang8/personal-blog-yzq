<template>
  <div class="photo" ref="photo">
    <FloatBall ref="FloatBall"></FloatBall>
    <vue-preview :slides="thumbsList" class="imgPrev"></vue-preview>
  </div>
</template>
<script>
import FloatBall from "../../../../components/content/FloatBall.vue";
import {getPhotoList} from "../../../../network/photo"
import {photoShow} from "../../../../tools/showheadline"

export default {
  data() {
    return {
      thumbsList: [],
    };
  },
  components: {
    FloatBall,
  },
  created() {
    // 将位置定位到顶部
    if (document.body.scrollTop) {
      document.body.scrollTop = 0;
    } else {
      document.documentElement.scrollTop = 0;
    }

    this.getPhotoList()



  },

  methods:{

    //获取相册列表数据
    getPhotoList(){
      getPhotoList().then((data) => {
        if(data.status == 200){
          this.thumbsList = data.list
        }
      })
    }


  },

  mounted() {
           // 载入标题
    photoShow.call(this);
    let setFloatBall = () => {
      let photoWidth = this.$refs.photo.offsetWidth;
      this.$refs.FloatBall.setposition(photoWidth);
    };
    setFloatBall();
    window.addEventListener("resize", () => {
      setFloatBall();
    });
  },
};
</script>
<style lang='less' scoped>
.photo {
  max-width: 1024px;
  padding: 20px;
  box-sizing: border-box;
  margin: 0px auto;
  background-color: white;
}

// 设置相册排列方式
/deep/ .my-gallery {
  //deep深层作用选择器
  column-count: 3;
  column-gap: 0;
  figure {
    padding: 2px;

    img {
      display: block;
      height: auto;
      width: 100%;
    }
  }
}

@media (max-width: 768px) {
  .photo {
    padding: 10px;
  }
   /deep/ .my-gallery {
      //deep深层作用选择器
      column-count: 2;
      column-gap: 0;
      figure {
        padding:2px;
     
        img {
            display: block;
            height: auto;
          width: 100%;
        }
      }
    }
}
</style>