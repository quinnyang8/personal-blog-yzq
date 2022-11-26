<template>
  <div class="homenav">
      <div class="kb"></div>
    <div class="navItem" v-for="(item, index) in nav" :key="item">
      <span
        @click="choose(index)"
        class="font"
        :class="{ ischoose: index == chooseNav }"
        >{{ item }}</span
      >
    </div>
    <div class="search">
      <input type="text" placeholder="search" />
      <i class="el-icon-search"></i>
    </div>
    <div class="line"></div>
  </div>
</template>
<script>
export default {
   name:'HomeNav',
  data() {
    return {
      nav: ["原创", "转载", "日记"],
      chooseNav: 0,
    };
  },
  methods: {
    choose(index) {
      this.chooseNav = index;
      let choose = ''
      switch(index){
        case 0:choose = 'yc';break;
        case 1:choose = 'zz';break;
        case 2:choose = 'rj';break;
      }
      this.$emit('chooseNav',choose)
    },
  },
};
</script>
<style lang='less' scoped>
.homenav {
  background: white;
  display: flex;
  position: relative;
    .kb{
        width: 25px;
        height: 10px;
    }

  .line {
    border-bottom: 1px solid #d4d4d483;
    position: absolute;
    width: 100%;
    bottom: 0;
  }

  .search {
    position: absolute;
    right: 10px;
    top: 0;
    bottom: 0;
    margin-top: auto;
    margin-bottom: auto;
    height: 27px;

    input {
      border: 1px solid #d4d4d4;
      border-right: none;
      height: 25px;
      padding: 0;
      width: 150px;
      border-radius: 0;
      padding: 0 4px;
      outline: 0;
      color: rgb(122, 122, 122);
    }

    i {
      width: 27px;
      height: 27px;
      line-height: 27px;
      text-align: center;
      background: rgb(105, 105, 105);
      color: #e7e7e7;
      position: relative;
      top: 1px;

      &:hover {
        background: rgb(92, 92, 92);
      }
    }
  }

  .navItem {
    width: 55px;
    text-align: center;
      cursor: pointer;
    .font {
      color: #5a5a5a;
      font-size: 18px;
      font-weight: 400;
      display: inline-block;
      padding: 30px 0;
    }
  }
}

.ischoose {
  border-bottom: 1px solid #5a5a5a;
}

@media (max-width: 768px) {
  .homenav {
    .search {
      display: none;
    }

    .navItem {
      width: 40px;
      text-align: center;

      .font {
        color: #5a5a5a;
        font-size: 14px;
        font-weight: 400;
        display: inline-block;
        padding: 15px 0;
      }
    }
  }
}
</style>