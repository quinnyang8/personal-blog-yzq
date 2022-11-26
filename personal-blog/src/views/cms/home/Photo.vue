<template>
  <div class="photo">
    <div class="photoUpload">
      <el-upload
        class="upload-demo upload-sc"
        name="photo"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :headers="headers"
        :before-remove="beforeRemove"
        :on-success="finish"
        :action="baseip + '/getPhoto/uploadphoto'"
      >
        <el-button type="primary" icon="el-icon-upload" @click="upload"
          >上传图片</el-button
        >
      </el-upload>
    </div>
    <div class="photolist">
      <div class="photoItem" v-for="item in thumbsList" :key="item.msrc">
        <el-card :body-style="{ padding: '0px' }">
          <el-image lazy class="image" :src="item.msrc" fit="fill"></el-image>
          <div style="padding: 14px">
            <div class="bottom clearfix">
              <time class="time">{{ item.time }}</time>
              <el-dropdown class="button" @command="delPhoto">
                <span class="el-dropdown-link">
                  <i class="el-icon-more button"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    :command="{
                      id: item['_id'],
                      msrc: item.msrc,
                      src: item.src,
                    }"
                    >删除图片</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>
<script>
import { baseIp } from "../../../allBase";
import { getPhotoList, delPhoto } from "../../../network/photo";

export default {
  data() {
    return {
      baseip: baseIp,
      thumbsList: [],
      headers: null,
    };
  },
  created() {
    this.getPhotoList();
  },
  methods: {
    upload() {
      console.log(11);
      let token = sessionStorage.getItem("token");
      if (token) {
        this.headers = {};
        this.headers.authorization = token;
      }
    },
    //获取相册列表数据
    getPhotoList() {
      getPhotoList().then((data) => {
        if (data.status == 200) {
          this.thumbsList = data.list;
        }
      });
    },

    //删除图片
    delPhoto(data) {
      delPhoto(data).then((data) => {
        data.status == 200
          ? (this.$message({
              message: data.msg,
              type: "success",
            }),
            this.getPhotoList())
          : this.$message({
              message: data.msg,
              type: "error",
            });
      });
    },

    upPhoto() {
      let list = document.querySelector(".el-upload-list");
      list.style.height = "60px";
      list.style.overflow = "auto";
    },

    // 成功上传
    finish() {
      this.upPhoto();
      this.getPhotoList();
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
  },
};
</script>
<style lang='less' scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  color: #909399;
  float: right;
}

.image {
  width: 100%;
  height: 200px;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.photo {
  .photoUpload {
    height: 100px;
    background: white;
    .uploadBtn {
      border-radius: 12px;
      .icon {
        line-height: 200px;
        font-size: 88px;
        color: white;
      }
    }
  }

  .photolist {
    padding-top: 20px;
    border: 1px solid white;
    margin-top: 10px;
    width: 100%;
    height: calc(100vh - 250px);
    box-sizing: border-box;
    overflow: auto;
    display: flex;

    flex-wrap: wrap;

    .photoItem {
      width: 15%;
      margin: 10px;
    }
  }
}
</style>