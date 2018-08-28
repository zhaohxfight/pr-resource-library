<template ref="searchresult">
  <div class="search-result">
    <yd-search ref="searchinput" v-model="filters.name" :on-submit="submitHandler" :on-cancel="cancelHandler" top="1rem"></yd-search>
    <yd-flexbox ref="tabselectMain" style="background: #fff;" :class="{'pb10': show1,'pb102': show2}">
      <yd-flexbox-item><div class="tabselect se1" :class="{'tabselect1': !show1, 'selectedbtn': show1}" @click="showSelect() ">资源类别<span :class="{'yd-accordion-rotated': show1}" class="yd-accordion-head-arrow"></span></div></yd-flexbox-item>
      <yd-flexbox-item><div class="tabselect" :class="{'tabselect1': !show2, 'selectedbtn': show2}" @click="showRadio()">性别<span :class="{'yd-accordion-rotated': show2}" class="yd-accordion-head-arrow"></span></div></yd-flexbox-item>
    </yd-flexbox>
    <div class="asscroll" :class="{'mb10': show1,'mb102': show2}">
      <yd-infinitescroll :callback="getResult" ref="infinitescrollDemo">
        <yd-list theme="4" slot="list">
          <yd-list-item v-for="(item, index) in list" :key="item.id" @click.native="gotoSearchDetial(item.id)">
            <img slot="img" :src="item.head_pic">
            <span slot="title">{{item.name}}</span>
            <yd-list-other slot="other">
                <div>
                  <div class="listMes">{{item.description}}</div>
                  <div class="listMes listMes2">{{item.company}}</div>
                </div>
            <div class="listbadge">
              <yd-badge class="red" shape="square">{{item.type[0]}}</yd-badge>
              <yd-badge class="blue" shape="square">{{item.search_secret_level}}</yd-badge>
            </div>
            <div class="collected" @click.stop="collected(item.id, item.is_collect, index)">
              <yd-icon :name="item.is_collect === 1 ? 'star': 'star-outline'"  size=".45rem" color="#ff9c00"></yd-icon>
            </div>
            </yd-list-other>
          </yd-list-item>
        </yd-list>
        <!-- 数据全部加载完毕显示 -->
        <span slot="doneTip">没有更多数据啦~~</span>

        <!-- 加载中提示，不指定，将显示默认加载中图标 -->
        <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>

      </yd-infinitescroll>      
    </div>

    <yd-popup v-model="show1" width="100%" class="searchPop" ref="zyType">  
      <div style="background-color:#fff;">
          <div style="width:86%;margin: 10px auto;">
            <yd-checkbox-group v-model="filters.type" class="setcheckbox">
              <yd-checkbox v-for="item in setMes.type" :val="item.id" :key="item.id">{{item.name}}</yd-checkbox> 
            </yd-checkbox-group>
          </div>
          <yd-flexbox ref="tabselectMain">
            <yd-flexbox-item><div class="tabselect btn1" @click="reSelect()">重置</div></yd-flexbox-item>
            <yd-flexbox-item><div class="tabselect btn2" @click="selectHandle()">确定</div></yd-flexbox-item>
          </yd-flexbox>
      </div>
    </yd-popup>
    <yd-popup v-model="show2" width="100%" class="searchPop" ref="seType">  
      <div style="background-color:#fff;">
          <div style="width:86%;margin: 10px auto;">
            <yd-radio-group v-model="filters.sex" class="setcheckbox">
              <yd-radio v-for="item in setMes.sex" :val="item.id" :key="item.id">{{item.name}}</yd-radio> 
            </yd-radio-group>
          </div>
          <yd-flexbox ref="tabselectMain">
            <yd-flexbox-item><div class="tabselect btn1" @click="reSelect2()">重置</div></yd-flexbox-item>
            <yd-flexbox-item><div class="tabselect btn2" @click="selectHandle()">确定</div></yd-flexbox-item>
          </yd-flexbox>
      </div>
    </yd-popup>
    <div v-if="list.length === 0 && nodata" class="nodata">暂无数据...</div>
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
      show1: false,
      show2: false,
      nodata: true,
      from: '',
      allh: '',
      setMes: {},
      result: [],
      filters: {  
        name: '',
        page: 1,
        perpage: 10,
        type: [],
        sex: ''
      },
      list: [ ]
    };
  },
  created() {
  },
  mounted() {
    this.allh = window.innerHeight
    this.$refs['searchinput'].$refs.search.$el.children[0].focus()
    this.getSetting()
  },
  computed: {
    type () {
      return this.$store.state.type
    },
    peopleId () {
      return this.$store.state.peopleId
    }
  },
  activated () {
    setTimeout(() => {
      if (this.from === '/' && this.$route.query.type && this.$route.query.type !== ''){
        this.list = []
        this.$refs['searchinput'].$refs.search.$el.children[0].focus()
        this.filters.name = '' 
        this.filters.sex = ''
        this.filters.type = JSON.parse(this.$route.query.type)
      }
      let that = this
      this.list.forEach(function (item, index, data) {
        if (item.id == that.$store.state.peopleId) {
          item.is_collect = that.$store.state.type
        }
      })
    },100)
  },
  beforeRouteEnter (to, from, next) {
    console.log(11)
    next(vm=>{
      console.log(from.path)
        vm.from = from.path;
    })
  },
  methods: {      
    getResult() {
      this.nodata = false
      this.$axios.post(this.baseUrl + 'search/index', this.filters)
      .then(response => {
        this.$dialog.loading.close();
        const _list = response.data.list.data
        this.list.push(..._list)
        if (_list.length < this.filters.perpage) {
            /* 所有数据加载完毕 */
            this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
            return;
        }
        /* 单次请求数据完毕 */
        this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');
        this.filters.page ++;
      }).catch(() => {
      });
    },
    getSetting() {
      this.$axios.get(this.baseUrl + 'search/setting')
      .then(response => {
        this.setMes = response.data.data
        console.log(JSON.parse(this.$route.query.type))
        if(this.$route.query.type && this.$route.query.type !== '') {
          setTimeout(() => {
            this.filters.type = JSON.parse(this.$route.query.type)
          },100)
        }
      }).catch(() => {
      });
    },
    collected(id,ifData,index) {
      const par = ifData === 0 ? {
        people_id: id,
        type: 1
      } : {
        people_id: id,
        type: 0
      }
      this.$axios.post(this.baseUrl + 'add/collect', par)
      .then(response => {
        if (response.data.code === 0) {
          this.list[index].is_collect = par.type
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
    selectHandle() {
      this.$dialog.loading.open('加载中...');
      this.list = []
      this.filters.page = 1
      this.getResult()
      this.show1 = false
      this.show2 = false
    },
    itemClickHandler(item) {
      this.$dialog.toast({ mes: `搜索：${item}` });
    },
    submitHandler(value) {
      this.$dialog.loading.open('加载中...');
      this.list = []
      this.filters.page = 1
      this.getResult()
    },
    cancelHandler() {
      this.filters.name = ''
      this.$router.push('/')
    },
    gotoSearchDetial(id) {
      console.log(id)
      this.$router.push({path:'/SearchDetial2',query:{id:id}})
    },
    showSelect() {
      this.setBottom()
      this.show1 = true
    },
    showRadio() {
      this.setBottom()
      this.show2 = true
    },
    setBottom() {
      document.getElementById('scrollView').scrollTop = 0
      let pe =  (document.getElementsByTagName('html')[0].style.fontSize)
      pe = parseInt(pe.substring(0, pe.length - 2)) + 92
      console.log(pe)
      const pre = (1 - (pe / this.allh)) * 100
      this.$refs['zyType'].$el.children[1].style.bottom = pre + '%'
      this.$refs['seType'].$el.children[1].style.bottom = pre + '%'
    },
    reSelect() {
      this.filters.type = []
    },
    reSelect2() {
      this.filters.sex = ''
    }
  },
  watch: {
  }
};
</script>
<style lang="scss">
.search-result {
  .yd-search-input {
    background-color: #fff;
    .search-input {
      background-color: #f7f7f7;
    }
    .cancel-text {
      color: #eb4a4a;
    }
  }
  .asscroll {
    width: 100%;
    height: calc(100vh - 1rem - 90px);
    background-color: #f6f6f6;
    position: relative;
    overflow-x: hidden;
    overflow-y: scroll!important;
  }
  .yd-list-theme4 {
    width: 96%;
    margin: 0 auto;
    background-color: #f6f6f6;
  }
  .yd-list-item {
    border-radius: 5px;
    box-shadow: 0px 1px 10px #d8d7d7;
    margin: 13px 0;
    padding: 18px 8px!important;
    background-color: #fff;
    .yd-list-img{
      width: 1.4rem!important;
      padding: .7rem 0!important;
      margin: 0 .25rem;
      border-radius: 50%;
    }
    .collected {
      position: absolute;
      z-index: 98;
      top:50%;
      margin-top: -0.225rem;
      right: .1rem;
    }
    .yd-list-mes {
      position: relative;
      background-color: transparent; 
      .listbadge {
        position: absolute;
        top: 0;
        left: 2.2rem;
        width: 2.5rem;
        .yd-badge {
          background-color:transparent;
          font-size: .16rem;
          padding-top: 4px;
          line-height: .16rem;
          border-radius: 3px;
          margin-right: .13rem;
        }
        .red {
          color: #f85b62;
          border: 1px solid #f85b62;
        }
        .blue {
          color: #5b96f8;
          border: 1px solid #5b96f8;
        }
      }
      .listMes {
        line-height: .35rem;
        font-size: .26rem;
        max-width: 4rem;
      }
      .listMes2 {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }
  .yd-list-title {
    font-size: .32rem;
  }
  .yd-list-theme4 .yd-list-item:not(:last-child):after {
    border-bottom: 0 solid #d9d9d9;
  }
}
.nodata {
  width: 100%;
  text-align: center;
  color: #888;
  top: 20px;
  font-size: .28rem;
  position: fixed;
}
.tabselect {
  text-align: center;
  line-height: 40px;
  font-size: .28rem;
  position: relative;
  .yd-accordion-head-arrow {
    min-height: 0;
    display: inline-block;
    margin-left: .1rem;
    margin-bottom: 2px;
  }
}
.tabselect1::after{
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
.se1::before {
  content: "";
  position: absolute;
  z-index: 0;
  right: 0;
  width: 1px;
  height: 100%;
  -webkit-transform: scaleX(.5);
  transform: scaleX(.5);
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  top: 0;
  border-right: 1px solid #d8d8d8;
}
.btn1{
  color: #888;
  background-color: #fff;
  border-top: 1px solid #e3e3e3;
}
.btn2{
  color: #fff;
  background-color: #eb4a4a;
  border-top: 1px solid #eb4a4a;
}
.selectedbtn{
  color: #eb4a4a;
  .yd-accordion-head-arrow:after{
    border-bottom: 7px solid #eb4a4a;
  }
}
.pb10 {
  padding-bottom: 10px;
  position: relative;
  z-index: 99;
}
.pb102 {
  padding-bottom: 10px;
  position: relative;
  z-index: 99;
}
.mb10 {
  margin-top: -10px;
}
.mb102 {
  margin-top: -10px;
}
</style>
