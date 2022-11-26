<template>
  <div class="rightmenu">
    <div class="pic">
      <div class="contbox">
        <div class="title">
          <div>我的相册<span id="photoMore" @click="goPhoto">more +</span></div>
        </div>
        <div class="photo">
          <div class="imgs" v-for="item in imgs" :key="item.msrc">
            <el-image
              class="imgItem"
              :src="item.msrc"
              lazy
              fit="cover"
            ></el-image>
          </div>
        </div>
      </div>
    </div>
    <div class="recommend">
      <h1 class="recTitle">
        推荐阅读<span id="photoMore" @click="goRecommend">more +</span>
      </h1>
      <div class="list" v-for="item in list" :key="item.url">
        <a :href="item.url" class="listItem"
          ><i class="el-icon-reading"></i> {{ item.title }}</a
        >
      </div>
    </div>
  </div>
</template>
<script>
import { getPhotoList } from "../../../network/photo";
import { getList } from "../../../network/recommend";

export default {
  data() {
    return {
      imgs: [],

      list: [],
    };
  },

  created() {
    this.getPhotoList();
    this.getList();
  },

  methods: {
    //获取相册列表数据
    getPhotoList() {
      getPhotoList().then((data) => {
        if (data.status == 200) {
          if (data.list.length > 6) {
            return (this.imgs = data.list.slice(0, 6));
          }
          this.imgs = data.list;
        }
      });
    },
    //进入相册模块
    goPhoto() {
      this.$router.push("/photo");
    },
    // 进入推荐模块
    goRecommend() {},

    // 获取推荐信息列表
    getList() {
      getList().then((data) => {
        data.status == 200
          ? (this.list = data.list)
          : this.$message({
              message: data.msg,
              type: "error",
            });
      });
    },
  },
};
</script>
<style lang='less' scoped>
.pic {
  width: 100%;
  padding-bottom: 85%;
  // background-color: red;
  overflow: hidden;
  position: relative;
  .contbox {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    // background-color: brown;

    .title {
      width: 100%;
      height: 15%;
      // background-color: rgb(104, 87, 87);
      display: flex;
      align-items: center;
      margin-bottom: 15px;

      font-size: 18px;
      color: #606266;
      font-weight: 600;
      line-height: 2.5;
    }

    .photo {
      width: 100%;
      // height:80%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .imgs {
        margin: 0 5px 5px 0;
        width: 31%;
        padding-bottom: 31%;
        position: relative;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
        .imgItem {
          position: absolute;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}

#photoMore {
  font-size: 12px;
  margin-left: 6px;
  font-weight: 100;
  color: #909399;
  cursor: pointer;
  &:hover {
    color: rgb(77, 77, 77);
  }
}

.recommend {
  margin-top: 45px;
  // border-top: 1px solid #d4d4d483;
  padding-top: 15px;
  .recTitle {
    font-size: 18px;
    color: #606266;
    font-weight: 600;
    line-height: 2.5;
  }
  .list {
    .listItem {
      display: block;
      padding: 8px 0;
      color: #909399;
      font-size: 14px;
      text-decoration: none;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}

@media (max-width: 768px) {
  .pic {
    .contbox {
      .photo {
        .imgs {
          margin: 0 0 8px 0;
        }
      }
    }
  }

  .recommend {
    margin-top: 20px;
  }
}
</style>