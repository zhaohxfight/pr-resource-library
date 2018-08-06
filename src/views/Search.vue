<template>
  <div class="home page-content">
    <div class="imgMain">
      <img class="img1" src="../assets/img1.gif">
      <img class="img2" src="../assets/img2.png" alt="">
    </div>
    <yd-search v-model="value1" @click.native="gotoSearchResult" placeholder="请输入搜索内容"></yd-search>
    <div class="buttonList">
      <yd-flexbox>
          <yd-flexbox-item><yd-button  @click.native="handleClick('全部')" type="danger">全部</yd-button></yd-flexbox-item>
          <yd-flexbox-item><yd-button  @click.native="handleClick('职业经理人')" type="danger">职业经理人</yd-button></yd-flexbox-item>
          <yd-flexbox-item><yd-button  @click.native="handleClick('专家')" type="danger">专家</yd-button></yd-flexbox-item>
      </yd-flexbox>
      
      <yd-flexbox>
          <yd-flexbox-item><yd-button  @click.native="handleClick('媒体人')" type="danger">媒体人</yd-button></yd-flexbox-item>
          <yd-flexbox-item><yd-button  @click.native="handleClick('公务员')" type="danger">公务员</yd-button></yd-flexbox-item>
          <yd-flexbox-item><yd-button  @click.native="handleClick('其他')" type="danger">其他</yd-button></yd-flexbox-item>
      </yd-flexbox>      
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    HelloWorld
  },
  data() {
    return {
      value1: "",
      result: []
    };
  },
  methods: {
    gotoSearchResult() {
      this.$router.push('SearchResult')
    },
    handleClick(key) {
      this.$router.push({path:'/SearchResult',query:{key:key}})
    }
  },
  watch: {
    value2(val) {
      this.result = this.getResult(val);
    }
  }
};
</script>
<style lang="scss">
.home {
  .imgMain {
    width: 100%;
    position: relative;
    .img1{
      width: 100%;
    }
    .img2{
      width: 2.8rem;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -1.5rem;
      margin-left: -1.2rem;
      -webkit-transform: rotate(360deg);
      animation: rotation 60s linear infinite;
      -moz-animation: rotation 60s linear infinite;
      -webkit-animation: rotation 60s linear infinite;
      -o-animation: rotation 60s linear infinite;
    }
  }
  .yd-search-input {
    background-color: #fff;
    .search-input {
      border: 1px solid #eb4a4a;
      border-radius: 20px;
    }
  }
  .yd-search-input::before {
    border-top: none;
  }
  .yd-search-input::after {
    border-bottom: none;
  }
  .buttonList {
    width: 86%;
    margin: 10px auto;
    .yd-flexbox-item {
      text-align: center;
      height: 30px;
      line-height: 30px;
      margin: 10px 15px;
    }
    .yd-btn {
      width: 100%;
      background-color: #f7f7f7;
      color: #888;
      border-radius: 20px;
    }
  }
}

@-webkit-keyframes rotation{
  from {-webkit-transform: rotate(0deg);}
  to {-webkit-transform: rotate(360deg);}
}
</style>