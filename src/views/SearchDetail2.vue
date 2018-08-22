<template>
  <div id="searchDetial2" class="searchDetial2 page-content">
    <yd-navbar id="changeHead" slot="navbar" style="background:rgb(235, 74, 74, 0)" fixed>
      <a href="javascript:;" @click="goback" slot="left">
          <yd-navbar-back-icon>返回</yd-navbar-back-icon>
      </a>
      <div slot="center"><span v-if="headTitles === '公关资源库'" class="yd-navbar-center-title">{{headTitles}}</span><span v-else class="yd-navbar-center-title">{{name}}</span></div>
      <a href="javascript:;" slot="right" @click="allClose">
          关闭
      </a>
    </yd-navbar>
    <div class="content1">
        <div class="headimg">
          <img src="http://cdn.aixifan.com/dotnet/artemis/u/cms/www/201711/03113043qpdpyqom.jpg" alt="">
        </div>
        <div class="content mart">
            <div class="name">李思思</div>
            <div><span>女</span><span>28岁</span><span>媒体人</span><span>汉族</span><span>公开档案</span></div>
            <div>网易新闻北京分区</div>
        </div>
    </div>
    <div class="content">
      <div class="dataList">
        <div class="data-title">类别</div>
        <div class="data-mes">
          <div style="max-width: 4.3rem;">媒体人</div>
        </div>
      </div>
      <div class="dataList">
        <div class="data-title">类别</div>
        <div class="data-mes">
          <div style="max-width: 4.3rem;">媒体人</div>
        </div>
      </div>
      <div class="dataList">
        <div class="data-title">类别</div>
        <div class="data-mes">
          <div style="max-width: 4.3rem;">媒体人</div>
        </div>
      </div>
      <div class="dataList">
        <div class="data-title">类别</div>
        <div class="data-mes">
          <div style="max-width: 4.3rem;">媒体人</div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="headtitle">工作{{headTitles}}</div>
      <div class="maintitle">副总裁、主编</div>
      <div class="mes"><span>网易新闻北京分区</span>|<span>北京分区</span></div>
    </div>
    <div class="content">
      <div class="headtitle">工作</div>
      <div class="maintitle">副总裁、主编</div>
      <div class="mes"><span>网易新闻北京分区</span>|<span>北京分区</span></div>
    </div>
    <div class="content">
      <div class="headtitle">工作</div>
      <div class="maintitle">副总裁、主编</div>
      <div class="mes"><span>网易新闻北京分区</span>|<span>北京分区</span></div>
    </div>
    <div class="content">
      <div class="headtitle">工作</div>
      <div class="maintitle">副总裁、主编</div>
      <div class="mes"><span>网易新闻北京分区</span>|<span>北京分区</span></div>
    </div>
    <div class="content">
      <div class="headtitle">工作</div>
      <div class="maintitle">副总裁、主编</div>
      <div class="mes"><span>网易新闻北京分区</span>|<span>北京分区</span></div>
    </div>
    <div class="content">
      <div class="headtitle">工作</div>
      <div class="maintitle">副总裁、主编</div>
      <div class="mes"><span>网易新闻北京分区</span>|<span>北京分区</span></div>
    </div>
    <div class="content">
      <div class="headtitle">工作</div>
      <div class="maintitle">副总裁、主编</div>
      <div class="mes"><span>网易新闻北京分区</span>|<span>北京分区</span></div>
    </div>
    <div class="content">
      <div class="headtitle">工作</div>
      <div class="maintitle">副总裁、主编</div>
      <div class="mes"><span>网易新闻北京分区</span>|<span>北京分区</span></div>
    </div>
    <div class="content">
      <div class="headtitle">工作</div>
      <div class="maintitle">副总裁、主编</div>
      <div class="mes"><span>网易新闻北京分区</span>|<span>北京分区</span></div>
    </div>
    
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
      result: [],
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
      this.getResult()
      document.getElementById('searchDetial2').addEventListener('scroll', this.handleScroll)
  },
  activated () {
    this.result = []
    this.getResult()
    window.addEventListener('scroll', this.handleScroll)
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
    },
    handleScroll () {
      const scrollTop  = document.getElementById('searchDetial2').scrollTop
      const header  = document.getElementById('changeHead')
      const opcaity = (scrollTop / 200 >  1) ? 1 : scrollTop / 200
      header.style.background='rgba(235, 74, 74,'+ opcaity +')';
      if (scrollTop > 10) {
        this.headTitles = '李思思'
        this.name = '李思思'
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
    .headimg {
      width: 2rem;
      height: 2rem;
      position: absolute;
      left: 50%;
      margin-left: -1rem;
      margin-top: -1rem;
      
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
  }
  .mart {
    margin-top: 120px!important;
    text-align: center;
  }
  .content {
    width: 96%;
    margin: 15px auto;
    background: #fff;
    border-radius: 5px;
    box-shadow: 1px 1px 10px #f2f2f2;
    padding: 20px;
  }
  .bottomBtn {
    width: 100%;
    position: fixed;
    bottom: 0;
    white-space: nowrap;
    .btn {
      display: inline-block!important;
      height: 40px;
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

}
</style>
