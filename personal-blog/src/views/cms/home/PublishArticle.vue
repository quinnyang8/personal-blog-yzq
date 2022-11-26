<template>
  <div class="publishArticle">
    <div class="topmenu">
      <div class="bt">
        <!-- <h1 class="title">文章标题</h1> -->
        <div>
          <!-- <el-input v-model="wzTitle" placeholder="请输入标题"></el-input> -->
          <el-input placeholder="请输入内容" v-model="wzTitle">
            <template slot="prepend">标题</template>
          </el-input>
        </div>
      </div>

      <div class="fl">
        <!-- <h1 class="title">文章类别</h1> -->
        <div class="block">
          <el-cascader
            v-model="choose"
            :options="options"
            @change="handleChange"
          ></el-cascader>
        </div>
      </div>
    </div>

    <div class="decripe">
      <!-- <h1 class="title">文章描述</h1> -->
      <el-input
        type="textarea"
        :rows="3"
        style="margin-bottom: 20px"
        placeholder="请输入文章描述"
        maxlength="50"
        show-word-limit
        v-model="decripeTxt"
      >
      </el-input>
    </div>

    <div class="content">
      <!-- <h1 class="title">正文</h1> -->
      <mavon-editor
        ref="md"
        :boxShadow="false"
        style="margin-bottom: 15px; height: 500px"
        @save="save"
        @imgAdd="$imgAdd"
        v-model="mdStr"
        @imgDel="$imgDel"
        :toolbars="markdownOption"
      />
    </div>
    <el-button type="primary" @click="fb">发布</el-button>
  </div>
</template>
<script>
import { uploadimg, fb, delimg } from "../../../network/fb";

import { editor } from "../../../tools/editor";

export default {
  data() {
    return {
      mdStr: "",
      // 文章标题
      wzTitle: "",
      //存放图片路径的数组
      picurl: [],
      // 文章描述
      decripeTxt: "",

      //配置编辑器
      markdownOption: editor,

      options: [
        { value: "yc", label: "原创" },
        { value: "zz", label: "转载" },
        { value: "rj", label: "日记" },
        { value: "project", label: "项目" },
      ],
      //   选择的文章类别
      choose: "yc",
      editor: Object,
    };
  },
  computed: {
    isshowZz() {
      return this.choose != "zz";
    },
  },
  mounted() {},
  methods: {
    handleChange(value) {
      this.choose = value[0];
      // console.log(this.choose);
    },

    //编辑框按下保存后,将数据保存到草稿箱
    save() {},

    // 绑定@imgAdd event
    $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      formdata.append("file", $file);
      uploadimg(formdata).then((data) => {
        this.$refs.md.$img2Url(pos, data.data[0].url);

        //将图片添加到图片数组里
        this.picurl.push(data.data[0].url);
      });
    },

    $imgDel(delimgarr) {
      //需要删除的图片路径
      let needDelUrl = delimgarr[0];

      //将图片数组中该图片删除
      this.picurl = this.picurl.filter((item) => {
        return item != needDelUrl;
      });

      //将服务器中的图片删除
      delimg(needDelUrl).then((data) => {
        if (data.status == 200) {
          return this.$message({
            message: data.msg,
            type: "success",
          });
        }

        this.$message({
          message: data.msg,
          type: "error",
        });
      });
    },
    //下面是html @click="fn" 函数名
    fb() {
      //参数：标题   类型    内容   内容里的图片url   纯文本

      let isfb =
        this.wzTitle != "" && this.decripeTxt != "" && this.mdStr != "";
      if (!isfb) {
        return this.$message({
          message: "存在未填写的内容，请检查！",
          type: "error",
        });
      }

      // console.log(this.mdStr);  获取markdown文本，用于编辑文章
      //下面是从network里面导入的发请求的fb函数
      fb(
        this.wzTitle,
        this.choose,
        this.$refs.md.d_render,
        this.picurl,
        this.decripeTxt,
        this.mdStr
      ).then((data) => {
        if (data.status == 200) {
          //  将编辑器里保存的图片路径数组删除
          this.picurl = [];
          //清楚编辑器所有内容
          document.getElementsByClassName("fa-mavon-trash-o")[0].click();
          //清楚标题
          this.wzTitle = "";
          // 清楚描述内容
          this.decripeTxt = "";
          this.$message({
            message: data.msg,
            type: "success",
          });
        } else if (data.status == 400) {
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
.topmenu {
  display: flex;
  margin-bottom: 25px;
  // flex-direction: column;
}

.bt {
  width: 40%;
  // margin-bottom: 20px;
}

.fl {
  width: 30%;
  margin-left: 20px;
}

.title {
  color: #606266;
  font-size: 18px;
  font-weight: 600;
  line-height: 2.5;
}

#editor {
  margin-bottom: 8px;
}
</style>
