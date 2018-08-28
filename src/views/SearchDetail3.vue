<template>
  <div id="searchDetial2" class="searchDetial2 page-content" ref="sd2">
    <yd-navbar id="changeHead" slot="navbar" bgcolor="rgb(235, 74, 74, 0)" fixed>
      <a href="javascript:;" @click="goback" slot="left">
          <yd-navbar-back-icon>返回</yd-navbar-back-icon>
      </a>
      <div slot="center"><span v-show="headTitles === '公关资源库'" class="yd-navbar-center-title">{{headTitles}}</span><span class="yd-navbar-center-title" v-show="headTitles !== '公关资源库'">{{result.base.name}}</span> </div>
      <a href="javascript:;" slot="right" @click="allClose">
          关闭
      </a>
    </yd-navbar>
    <div class="content1">
        <div class="headimg" :style="`background: url(${result.base.info.head_pic}) no-repeat center/cover`">
          <yd-lightbox style="opacity: 0">
              <yd-lightbox-img :src="result.base.info.head_pic"></yd-lightbox-img>
          </yd-lightbox>
        </div>
        <div class="h120"></div>
        <div class="content mart">
            <div class="name">{{result.base.name}}</div>
            <div class="nameMes">{{result.base.info.description}}</div>
            <div class="nameMes">{{result.base.info.company}}</div>
        </div>
    </div>
    <div class="content" @click="showDetialMethod('base')">
      <div class="dataList">
        <div class="data-title">手机：{{result.base.info.phone}}</div>
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
    <div class="content" v-if="result.life" @click="showDetialMethod('life')">
      <div v-for="(item, key) in result.life.info" class="dataList">
        <div class="data-title">
          {{key}}:
        </div>
        <div class="data-mes">{{item}}</div>
      </div>
    </div>
    <div class="content" v-if="result.company" >
      <div class="headtitle"><i class="work"></i>工作</div>
      <div class="wkitem" v-for="(item,index) in result.company.info" @click="showDetialMethod('company',index)">
        <div class="maintitle">{{item.name}}</div>
        <div class="mes">{{item.description}}</div>
      </div>

    </div>
    <div class="content" v-if="result.live" @click="showDetialMethod('live')">
      <div class="headtitle"><i class="live"></i>居住</div>
        <div class="maintitle">{{result.live.info.name}}</div>
        <div class="mes">{{result.live.info.description}}</div>
    </div>
    <div class="content" v-if="result.visit">
      <div class="headtitle"><i class="visit"></i>来访</div>
      <div class="wkitem" v-for="item in result.visit.info" @click="showDetialMethod('visit',index)">
        <div class="maintitle">{{item.name}}</div>
        <div class="mes"><span>{{item.description}}</span><span style="float:right">{{item.time}}</span></div>
      </div>
    </div>

    <div class="content" v-if="result.meeting">
      <div class="headtitle"><i class="meeting"></i>会务</div>
      <div class="wkitem" v-for="item in result.meeting.info" @click="showDetialMethod('meeting',index)">
        <div class="maintitle">{{item.name}}</div>
        <div class="mes"><span>{{item.description}}</span><span style="float:right">{{item.time}}</span></div>
      </div>
    </div>

    <div class="content" v-if="result.activity">
      <div class="headtitle"><i class="activity"></i>活动</div>
      <div class="wkitem" v-for="item in result.activity.info" @click="showDetialMethod('activity',index)">
        <div class="maintitle">{{item.name}}</div>
        <div class="mes"><span>{{item.description}}</span><span style="float:right">{{item.time}}</span></div>
      </div>
    </div>

    <div class="content" v-if="result.cooperation">
      <div class="headtitle"><i class="cooperation"></i>合作</div>
      <div class="wkitem" v-for="item in result.cooperation.info" @click="showDetialMethod('cooperation',index)">
        <div class="maintitle">{{item.name}}</div>
        <div class="mes"><span>{{item.description}}</span><span style="float:right">{{item.time}}</span></div>
      </div>
    </div>
    <div style="width:100%;height:50px;"></div>
    <div class="bottomBtn">
      <yd-button-group>
          <yd-button size="large" type="primary" class="btnLeft btn" @click.native="showDetialMethod('people',index)">档案对接人</yd-button>
          <yd-button size="large" type="primary" class="btnRight btn" :class="{'btnRight2' : result.base.info.is_collect === 1}" @click.native="collected()">{{result.base.info.is_collect === 0 ? '收藏': '取消收藏'}}</yd-button>
      </yd-button-group>
    </div>
    <!-- <yd-popup v-model="showDetial" position="right">
      <yd-navbar bgcolor="#eb4a4a" fixed>
        <a href="javascript:;" @click="showDetial = false" slot="left">
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
    </yd-popup> -->
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
      showDetial: false,
      from: '',
      showDetialMes: {
        title: '',
        time: '',
        data: []
      },
      name: '',
      demo2: '美食',
      index: 0,
    };
  },
  created() {
  },
  mounted() {
    this.result = {}
  },
  activated () {
    setTimeout(() => {
      console.log(this.from)
      if (this.from === '/SearchDetialS'){
        this.$refs.sd2.scrollTop = this.$store.state.pageYOffsetS;
      } else {
        this.$refs.sd2.scrollTop = 0
        const header  = document.getElementById('changeHead')
        header.style.background = 'rgba(235, 74, 74,0)'
        this.headTitles = '公关资源库'
        this.getResult()
      }
    },0)
  },
  beforeRouteEnter (to, from, next) {
    next(vm=>{
      console.log(from.path)
        vm.from = from.path;
    })
  },
  methods: {
    getResult(val) {
      this.$dialog.loading.open('加载中...');
      const par = {
        id: this.$route.query.id
      }
      this.$axios.post(this.baseUrl + 'examine/detail', par)
      .then(response => {
        this.$dialog.loading.close();
        this.result = response.data.data
        setTimeout(() => {
          document.getElementById('searchDetial2').addEventListener('scroll', this.handleScroll)
        }, 100)
      }).catch(() => {
      });
    },
    collected() {
      const par =  {
        people_id: this.$route.query.id,
        type: this.result.base.info.is_collect === 0 ? 1 : 0
      }
      this.$axios.post(this.baseUrl + 'add/collect', par)
      .then(response => {
        if (response.data.code === 0) {
          this.result.base.info.is_collect = par.type
          this.$store.state.type = par.type
          this.$store.state.peopleId = this.$route.query.id
          if (par.type === 1) {
            this.$dialog.toast({
                mes: '收藏成功',
                timeout: 1000,
                icon: 'success'
            });
          } else {
            this.$dialog.toast({
                mes: '已取消收藏',
                timeout: 1000,
                icon: 'error'
            });
          }
        }
      }).catch(() => {
      });
    },
    showDetialMethod(mes,index) {
      this.showDetialMes = {
        title: '',
        time: '',
        data: []
      }
      if (mes === 'life' || mes === 'live' || mes === 'base') {
        this.showDetialMes = this.result[mes]
      } else if (mes === 'company'){
        this.showDetialMes.title = this.result[mes].title
        this.showDetialMes.data = this.result[mes].data[index]
      } else if (mes === 'people'){
        this.showDetialMes.title = '档案对接人'
        this.showDetialMes.data = this.result[mes].data
      } else {
        this.showDetialMes.title = this.result[mes].title
        this.showDetialMes.data = this.result[mes].data[index].list
        this.showDetialMes.time = this.result[mes].data[index].subtitle
      }
      this.$store.commit('setPageDetialMes', this.showDetialMes);
      this.$store.commit('setPageYOffsetS', this.$refs.sd2.scrollTop);
      this.$router.push({path:'/SearchDetialS'})
    },
    itemClickHandler(item) {
      this.$dialog.toast({ mes: `搜索：${item}` });
    },
    submitHandler(value) {
      this.$dialog.toast({ mes: `搜索：${value}` });
    },
    isArray(obj){ 
      return (typeof obj == 'object') && obj.constructor == Array; 
    },
    handleScroll () {
      const scrollTop  = document.getElementById('searchDetial2').scrollTop
      const header  = document.getElementById('changeHead')
      const opcaity = (scrollTop / 80 >  1) ? 1 : scrollTop / 80
      header.style.background='rgba(235, 74, 74,'+ opcaity +')'
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
      border-radius: 50%;
      overflow: hidden;
      background-size:cover;
      background-position:50%;
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
      margin-bottom: 5px;
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
      line-height: .55rem;
      color: #898989;
      span {
        margin: 0 3px;
      }
    }
    .headtitle {
      font-size: .3rem;
      color: #eb4a4a;
      margin-bottom: .2rem;
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
      .visit {
        background: url('../assets/03.jpg') no-repeat center/cover;
      }
      .meeting  {
        background: url('../assets/04.jpg') no-repeat center/cover;
      }
      .activity {
        background: url('../assets/05.jpg') no-repeat center/cover;
      }
      .cooperation {
        background: url('../assets/06.jpg') no-repeat center/cover;
      }
    }
    .maintitle {
      font-size: .3rem;
      color: #333333;
      line-height: .58rem;
      margin-top: .2rem;
    }
    .mes {
      font-size: .26rem;
      color: #888888;
      line-height: .58rem;
      padding-bottom: .15rem;
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
        color: #666!important;
        font-size: .28rem;
        line-height: .4rem;
        margin-left: .2rem;
        width: 5.5rem;
        a {
          text-decoration: underline;
        }
      }
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
    .btnRight2 {
      background-color: #eb4a4a;
      color: #fff;
    }
   }
  .yd-tab-panel {
    margin-top: 10px;
  }
  .yd-popup {
    width: 100%!important;
  }
  .datalistContent {
    margin-top: 1.5rem;
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
    .datalistTitle {
      width: 86%;
      margin: .3rem auto;
      font-size: .30rem;
    }
  }
}
</style>
