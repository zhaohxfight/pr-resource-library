<template>
  <div class="searchDetialS page-content">
    <yd-navbar bgcolor="#eb4a4a" fixed>
      <a href="javascript:;" @click="goback()" slot="left">
        <yd-navbar-back-icon></yd-navbar-back-icon>
      </a>
      <div slot="center"><span class="yd-navbar-center-title">{{showDetialMes.title}}</span></div>
    </yd-navbar>
    <div class="datalistContent">
      <div class="datalistTitle" v-if="showDetialMes.time && showDetialMes.time.length > 0">{{showDetialMes.time}}</div>
      <div class="dataList" v-for="item2 in showDetialMes.data">
        <div v-if="item2.list && item2.list.length > 0">
          <div class="data-time">{{item2.subtitle}}</div>
          <div v-for="item3 in item2.list" class="dataList2">
            <div class="data-title">{{item3.name}}213123</div>
            <div class="data-mes">
              <div v-if="item3.is_html && item3.is_html === '1'">
                <div v-html="item3.value"></div>
              </div>
              <div v-else>
                <div v-if="isArray(item3.value)">
                  <div style="margin-bottom:.1rem;" v-for="item4 in item3.value">
                    <span v-if="item4.name && item4.name !== ''">{{item4.name}}:</span>{{item4.value}}  
                  </div>
                </div>
                <div v-else style="max-width:4.3rem">{{item3.value}}</div>
              </div>
            </div>                  
          </div>
        
        </div>
        <div v-else>
          <div class="data-title">{{item2.name}}:</div>
          <div class="data-mes">
            <div v-if="item2.is_html && item2.is_html === '1'">
              <div v-html="item2.value"></div>
            </div>
            <div v-else>
              <div v-if="isArray(item2.value)">
                <div style="margin-bottom:.1rem;" v-for="item3 in item2.value">
                  <span v-if="item3.name && item3.name !== ''">{{item3.name}}:</span>{{item3.value}}  
                </div>
              </div>
              <div v-else style="max-width:4.3rem">{{item2.value}}</div>
            </div>
          </div> 
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "searchDetialS",
  components: {
  },
  data() {
    return {
      ovHeight: null,
      showDetialMes: {},
      demo2: '美食',
      index: 0,
    };
  },
  created() {
     this.getResult()
  },
  mounted() {
     
  },
  methods: {
    getResult() {
      this.showDetialMes = this.$store.state.detialMes;
      console.log(this.showDetialMes)
      if (!this.showDetialMes) {
        this.$router.go(-1);
      }
    },
    goback() {
      this.$router.go(-1);
    },
    isArray(obj){ 
      return Array.isArray(obj)
    } 
  },
  watch: {
  }
};
</script>
<style lang="scss">
.searchDetialS {
  height: 100%;
  overflow: hidden;
  .pf {
    flex: 0 0 50%!important;
  }
  .yd-tab-panel-item {
    padding: .5rem;
  }
  .yd-tab-nav{
    min-width: 100%!important;
  }
  .yd-tab-panel {
    margin-top: 10px;
  }
  .datalistContent {
    margin-top: 1.5rem;
  }
  .dataList{
    width:90%;
    margin: 0 auto;
    margin-bottom: .28rem;
    .dataList2 {
      margin-bottom: .28rem;
    }
    .data-time {
      margin: .2rem 0;
    }
    .data-title {
      display: inline-block;
      color: #666;
      font-size: .28rem;
      width: 1.57rem;
      line-height: .4rem;
      vertical-align: top;
    }
    .data-title::after {
      width: 100%;
      height: 0;
      content: "\0020";
      overflow: hidden;
    }
    .data-mes {
      display: inline-block;
      color: #000;
      font-size: .28rem;
      line-height: .4rem;
      margin-left: .2rem;
      max-width: 4.5rem;
      a {
        text-decoration: underline;
      }
    }
  }
  .datalistTitle {
    width: 90%;
    margin: .3rem auto;
    font-size: .30rem;
  }
  .vux-swiper {
    background-color: #fff;
    overflow: hidden;
    .vux-swiper-item {
      overflow-y: scroll;
    }
    .vux-swiper-item::-webkit-scrollbar {
      display: none;
    }
  }
  .vux-tab-ink-bar {
    min-width: 70px;
    max-width: 50%;
  }
  .vux-tab .vux-tab-item {
    font-size: .28rem;
    flex: 0 0 38%;
  }
}
</style>
