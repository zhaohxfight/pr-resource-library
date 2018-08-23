<template>
  <div id="searchDetial2" class="searchDetial2 page-content">
    <yd-navbar id="changeHead" slot="navbar" style="background:rgb(235, 74, 74, 0)" fixed>
      <a href="javascript:;" @click="goback" slot="left">
          <yd-navbar-back-icon>返回</yd-navbar-back-icon>
      </a>
      <div slot="center"><span v-if="headTitles === '公关资源库'" class="yd-navbar-center-title">{{headTitles}}</span><span v-else class="yd-navbar-center-title">{{result.base.name}}</span></div>
      <a href="javascript:;" slot="right" @click="allClose">
          关闭
      </a>
    </yd-navbar>
    <div class="content1">
        <div class="headimg">
          <img :src="result.base.info.head_pic" alt="">
        </div>
        <div class="h120"></div>
        <div class="content mart">
            <div class="name">{{result.base.name}}</div>
            <div class="nameMes">{{result.base.info.description}}</div>
            <div class="nameMes">{{result.base.info.company}}</div>
        </div>
    </div>
    <div class="content">
      <div class="dataList">
        <div class="data-title">手机：{{result.base.info.phone}}</div>
        <!-- <div class="data-mes">
          <div style="max-width: 4.3rem;"></div>
        </div> -->
      </div>
      <div class="dataList">
        <div class="data-title">电话：{{result.base.info.tel}}</div>
      </div>
      <div class="dataList">
        <div class="data-title">微信：{{result.base.info.wechat}}</div>
      </div>
      <div class="dataList">
        <div class="data-title">邮箱：{{result.base.info.email}}</div>
      </div>
    </div>
    <div class="content">
      <div v-for="item in result.life.info" class="dataList">
        <div class="data-title">{{item}}</div>
      </div>
    </div>
    <div class="content">
      <div class="headtitle"><i class="work"></i>工作</div>
      <div class="wkitem" v-for="item in result.company.info">
        <div class="maintitle">{{item.name}}</div>
        <div class="mes">{{item.description}}</div>
      </div>

    </div>
    <div class="content">
      <div class="headtitle"><i class="live"></i>居住</div>
        <div class="maintitle">{{result.live.info.name}}</div>
        <div class="mes">{{result.live.info.description}}</div>
    </div>
    <div class="content">
      <div class="headtitle"><i class="arrive"></i>来访</div>
      <div class="wkitem" v-for="item in result.visit.info">
        <div class="maintitle">{{item.name}}</div>
        <div class="mes"><span>{{item.description}}</span><span style="float:right">{{item.time}}</span></div>
      </div>
    </div>
    <div style="width:100%;height:50px;"></div>
    <div class="bottomBtn">
      <yd-button-group>
          <yd-button size="large" type="primary" class="btnLeft btn">核对档案信息</yd-button>
          <yd-button size="large" type="primary" class="btnRight btn" @click="this.headTitles === '110'">收藏</yd-button>
      </yd-button-group>
    </div>
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
      result: {
        base: {
          info: {}
        }
      },
      list2: list(),
      ovHeight: null,
      headTitles: '公关资源库',
      name: '',
      demo2: '美食',
      index: 0,
    };
  },
  created() {
  },
  mounted() {
    // this.getResult()
    // document.getElementById('searchDetial2').addEventListener('scroll', this.handleScroll)
  },
  activated () {
    this.result = {}
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
        setTimeout(() => {
          document.getElementById('searchDetial2').addEventListener('scroll', this.handleScroll)
        }, 100)
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
    },
    handleScroll () {
      const scrollTop  = document.getElementById('searchDetial2').scrollTop
      const header  = document.getElementById('changeHead')
      const opcaity = (scrollTop / 80 >  1) ? 1 : scrollTop / 80
      header.style.background='rgba(235, 74, 74,'+ opcaity +')';
      if (scrollTop > 10) {
        this.headTitles = this.result.base.name
      } else {
        this.headTitles = '公关资源库'

      }
    },
    goback() {
      if (this.$route.path === '/') {
        this.allClose()
      } else {
        this.$router.go(-1);
      }
    },
    allClose() {
      if (!window.isIOS) {
        window.connectWebViewJavascriptBridge(function(bridge) {
          bridge.callHandler('closeCurWindow', function(response) {
          });
        });
      } else {
        this.closeCurWindow();
      }           
    },
    closeCurWindow() {
      window.webkit.messageHandlers.closeCurWindow.postMessage('关闭当前界面');
    }
  },
  watch: {
    headTitles(val) {
      console.log(val)
    }
  }
};
</script>
<style lang="scss">
.searchDetial2 {
  height: 100%;
  background-color: #f2f2f2;
  .content1 {
    position: relative;
    background: url('../assets/detailBg.jpg');
    background-repeat:no-repeat;
    background-size: contain; 
    background-position: top;
    .h120 {
      width: 100%;
      height: 90px;
    }
    .headimg {
      width: 1.85rem;
      height: 1.85rem;
      position: absolute;
      left: 50%;
      top: 55px;
      margin-left: -0.925rem;
      
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
  }
  .mart {
    text-align: center;
  }
  .content {
    width: 96%;
    margin: 15px auto;
    background: #fff;
    border-radius: 5px;
    box-shadow: 1px 1px 10px #f2f2f2;
    padding: 20px;
    .name {
      margin-top: 30px;
      font-size: .36rem;
      line-height: .6rem;
    }
    .wkitem {
      position: relative;
    }
    .wkitem::after{
      content: "";
      position: absolute;
      z-index: 0;
      left: 0;
      width: 100%;
      -webkit-transform: scaleY(.5);
      transform: scaleY(.5);
      -webkit-transform-origin: 0 0;
      transform-origin: 0 0;
      bottom: 0;
      border-bottom: 1px solid #d8d8d8;
    }
    .nameMes {
      font-size: .26rem;
      line-height: .45rem;
      color: #898989;
      span {
        margin: 0 3px;
      }
    }
    .headtitle {
      font-size: .3rem;
      color: #eb4a4a;
      margin-bottom: .4rem;
      padding-left: .45rem;
      position: relative;
      i {
        position: absolute;
        width: .35rem;
        height: .35rem;
        left: 0;
        top:1px;
      }
      .work {
        background: url('../assets/01.jpg') no-repeat center/cover;
      }
      .live {
        background: url('../assets/02.jpg') no-repeat center/cover;
      }
      .arrive {
        background: url('../assets/03.jpg') no-repeat center/cover;
      }
    }
    .maintitle {
      font-size: .3rem;
      color: #333333;
      line-height: .58rem;
    }
    .mes {
      font-size: .26rem;
      color: #888888;
      line-height: .58rem;
      padding-bottom: .15rem;
    }
  }
  .bottomBtn {
    width: 100%;
    position: fixed;
    bottom: 0;
    white-space: nowrap;
    background-color: #f3f3f3;
    .btn {
      display: inline-block!important;
      height: 40px;
      margin: .15rem 0;
    }
    .btnLeft {
      width: 58%;
      margin-right: 2%;
      background-color: #eb4a4a;
    }
    .btnRight {
      width: 40%;
      background-color: transparent;
      border: 1px solid #eb4a4a;
      color: #eb4a4a;
    }
  }
  .yd-tab-panel {
    margin-top: 10px;
  }
  .dataList{
    width:100%;
    margin: 0 auto;
    margin-bottom: .2rem;
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
      a {
        text-decoration: underline;
      }
    }
  }

}
</style>
