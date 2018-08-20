<template>
  <div class="searchDetial page-content">
       <tab :line-width=2 active-color='#eb4a4a' v-model="index" :scroll-threshold="2">
        <tab-item class="vux-center yd-tab-nav-item" :class="{'pf': result.length === 2}" :selected="index === 0" v-for="(item,index) in result" @click="demo2 = item" :key="index">{{item.title}}</tab-item>
      </tab>
      <swiper v-model="index" :height="swHeight"  :show-dots="false">
        <swiper-item v-for="(item,index) in result" :key="index">
          <div style="width: 100%; height: .5rem;"></div>
          <div class="dataList" v-for="item2 in item.data">
            <div v-if="item2.list && item2.list.length > 0">
              <div class="data-time">{{item2.subtitle}}</div>
              <div v-for="item3 in item2.list" class="dataList2">
                <div class="data-title">{{item3.name}}</div>
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
              <div class="data-title">{{item2.name}}</div>
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
        </swiper-item>
      </swiper>
  </div>
</template>

<script>
import Tab from 'vux/src/components/tab/tab.vue'
import TabItem from 'vux/src/components/tab/tab-item.vue'
import Swiper from 'vux/src/components/swiper/swiper.vue'
import SwiperItem from 'vux/src/components/swiper/swiper-item.vue'
const list = () => ['精选', '美食', '电影', '酒店', '外卖']
export default {
  name: "home",
  components: {
    Tab,
    TabItem,
    Swiper,
    SwiperItem
  },
  data() {
    return {
      result: [],
      list2: list(),
      ovHeight: null,
      demo2: '美食',
      index: 0,
    };
  },
  created() {
  },
  mounted() {
      this.getResult()
  },
  activated () {
    this.result = []
    this.getResult()
  },
  methods: {
    getResult(val) {
      this.$dialog.loading.open('加载中...');
      const par = {
        id: this.$route.query.id
      }
      this.$axios.post(this.baseUrl + 'people/detail', par)
      .then(response => {
        this.$dialog.loading.close();
        this.result = response.data.data
      }).catch(() => {
      });
    },
    itemClickHandler(item) {
      this.$dialog.toast({ mes: `搜索：${item}` });
    },
    submitHandler(value) {
      this.$dialog.toast({ mes: `搜索：${value}` });
    },
    isArray(obj){ 
      return (typeof obj=='object') && obj.constructor == Array; 
    } 
  },
  watch: {
  }
};
</script>
<style lang="scss">
.searchDetial {
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
  .dataList{
    width:86%;
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
      text-align:justify;
      text-align-last: justify;
      text-justify:inter-cluster;
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
      margin-left: .5rem;
      a {
        text-decoration: underline;
      }
    }
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
