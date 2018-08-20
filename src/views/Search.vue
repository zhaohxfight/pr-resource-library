<template>
  <div class="home page-content">
    <div class="imgMain">
      <img class="img1" src="../assets/img1.gif">
      <img class="img2" src="../assets/img2.png" alt="">
    </div>

    <yd-search v-model="value1" @click.native="gotoSearchResult" placeholder="请输入搜索内容"></yd-search>
    <div class="buttonList">
      <yd-checkbox-group v-model="types" class="setcheckbox" style="margin:0">
        <yd-checkbox v-for="item in setMes" :val="item.id" :key="item.id">{{item.name}}</yd-checkbox>
      </yd-checkbox-group>
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
      types: [],
      setMes: [],
      result: []
    };
  },
  created() {
    this.getBaseData()
  },
  mounted() {
    this.getSetting()
  },
  activated () {
    this.types = []
  },
  methods: {
    gotoSearchResult() {
      // this.$router.push('SearchResult')
      this.$router.push({path:'/SearchResult',query:{type:JSON.stringify(this.types)}})
    },
    getSetting() {
      this.$axios.get(this.baseUrl + 'search/setting')
      .then(response => {
        this.setMes = response.data.data.type
      }).catch(() => {
      });
    },
    getBaseData() {
      this.$axios.get(this.baseUrl + 'apply/getuser', {
        params: {
        }
      }).then(response => {
        if (response.data.person && response.data.person !== '') {

        } else {
          this.$dialog.confirm({
              title: '提示',
              mes: '未登录，请登录！',
              opts: () => {
              }
          });
        };
      }).catch(() => {
          this.$dialog.confirm({
              title: '提示',
              mes: '请求失败！',
              opts: () => {
              }
          });
      });
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
    margin: .5rem 0;
    .img1{
      width: 100%;
    }
    .img2{
      width: 2.8rem;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -1.5rem;
      margin-left: -1.4rem;
      -webkit-transform: rotate(360deg);
      animation: rotation 60s linear infinite;
      -moz-animation: rotation 60s linear infinite;
      -webkit-animation: rotation 60s linear infinite;
      -o-animation: rotation 60s linear infinite;
    }
  }
  .yd-search-input {
    background-color: #fff;
    padding: 10px 0 10px .6rem;
    .search-input {
      border: 1px solid #eb4a4a;
      border-radius: 5px;
      margin-right: .6rem;
      height: .7rem;
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
      margin: 10px 4px;
    }
    .yd-btn {
      width: 100%;
      background-color: #f7f7f7;
      color: #888;
      border-radius: 5px;
      padding: 0;
    }
  }
}
.yd-confirm-ft>a.primary {
  color: #eb4a4a!important;
}
@-webkit-keyframes rotation{
  from {-webkit-transform: rotate(0deg);}
  to {-webkit-transform: rotate(360deg);}
}
</style>