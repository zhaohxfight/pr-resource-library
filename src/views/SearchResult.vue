<template ref="searchresult">
  <div class="search-result page-content">
    <yd-search ref="searchinput" v-model="filters.name" :on-submit="submitHandler" :on-cancel="cancelHandler" top="1rem"></yd-search>
    <yd-flexbox ref="tabselectMain">
      <yd-flexbox-item><div class="tabselect se1" :class="{'tabselect1': !show1, 'selectedbtn': show1}" @click="showSelect() ">资源类别<span :class="{'yd-accordion-rotated': show1}" class="yd-accordion-head-arrow"></span></div></yd-flexbox-item>
      <yd-flexbox-item><div class="tabselect" :class="{'tabselect1': !show2, 'selectedbtn': show2}" @click="showRadio()">性别<span :class="{'yd-accordion-rotated': show2}" class="yd-accordion-head-arrow"></span></div></yd-flexbox-item>
    </yd-flexbox>
    <yd-list theme="4">
      <yd-list-item v-for="item in list" :key="item.id" @click.native="gotoSearchDetial(item.id)">
        <img slot="img" :src="item.head_pic">
        <span slot="title">{{item.name}}</span>
        <yd-list-other slot="other">
            <div>
              <div class="listMes">性别: {{item.sex}}</div>
              <div class="listMes">名族: {{item.nation}}</div>
              <div class="listMes">出生年月: {{item.birthday}}</div>
              <div class="listMes">企业名称: {{item.company[0]}}</div>
            </div>
        <div class="listbadge"><yd-badge shape="square">{{item.type[0]}}</yd-badge></div>
        </yd-list-other>
      </yd-list-item>
    </yd-list>
    <yd-popup v-model="show1" width="100%" class="searchPop" ref="zyType">  
      <div style="background-color:#fff;">
          <yd-checkbox-group v-model="filters.type" class="setcheckbox">
            <yd-checkbox v-for="item in setMes.type" :val="item.id" :key="item.id">{{item.name}}</yd-checkbox> 
          </yd-checkbox-group>
          <yd-flexbox ref="tabselectMain">
            <yd-flexbox-item><div class="tabselect btn1" @click="reSelect()">重置</div></yd-flexbox-item>
            <yd-flexbox-item><div class="tabselect btn2" @click="selectHandle()">确定</div></yd-flexbox-item>
          </yd-flexbox>
      </div>
    </yd-popup>
    <yd-popup v-model="show2" width="100%" class="searchPop" ref="seType">  
      <div style="background-color:#fff;">
          <yd-radio-group v-model="filters.sex" class="setcheckbox">
            <yd-radio v-for="item in setMes.sex" :val="item.id" :key="item.id">{{item.name}}</yd-radio> 
          </yd-radio-group>
          <yd-flexbox ref="tabselectMain">
            <yd-flexbox-item><div class="tabselect btn1" @click="show2 = false">取消</div></yd-flexbox-item>
            <yd-flexbox-item><div class="tabselect btn2" @click="selectHandle()">确定</div></yd-flexbox-item>
          </yd-flexbox>
      </div>
    </yd-popup>
    <div v-if="list.length === 0" class="nodata">暂无数据...</div>
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
      from: '',
      allh: '',
      setMes: {},
      result: [],
      filters: {
        name: '',
        type: [],
        sex: ''
      },
      list: [{
        type: [],
        company: []
      }]
    };
  },
  created() {
  },
  mounted() {
    this.allh = window.innerHeight
    this.$refs['searchinput'].$refs.search.$el.children[0].focus()
    this.getSetting()
    if(this.$route.query.key && this.$route.query.key !== '') {
      this.filters.name = this.$route.query.key
      this.getResult()
    }
  },
  activated () {
    setTimeout(() => {
      if (this.from === '/' && !this.$route.query.key) {
        this.$refs['searchinput'].$refs.search.$el.children[0].focus()
        this.filters = {
          name: '',
          sex: '',
          type: []
        }
        this.list = []
      } else if (this.from === '/' && this.$route.query.key && this.$route.query.key !== ''){
        this.filters.name = this.$route.query.key
        this.filters.sex = ''
        this.filters.type = []
        this.getResult()
      }
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
      console.log('请求')
      this.$axios.post(this.baseUrl + 'search/index', this.filters)
      .then(response => {
        this.list = response.data.list.data
        console.log(this.list)
      }).catch(() => {
      });
    },
    getSetting() {
      this.$axios.get(this.baseUrl + 'search/setting')
      .then(response => {
        this.setMes = response.data.data
      }).catch(() => {
      });
    },
    selectHandle() {
      this.getResult()
      this.show1 = false
      this.show2 = false
    },
    itemClickHandler(item) {
      this.$dialog.toast({ mes: `搜索：${item}` });
    },
    submitHandler(value) {
      this.getResult()
    },
    cancelHandler() {
      this.filters.name = ''
      this.$router.push('/')
    },
    gotoSearchDetial(id) {
      this.$router.push({path:'/SearchDetial',query:{id:id}})
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
}
.nodata {
  width: 100%;
  text-align: center;
  color: #888;
  margin-top: 3rem;
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
.searchPop {
  .yd-popup-bottom {
    -webkit-transform: translateY(100%);
    transform: translateY(100%);
    right: 0;
    bottom: 100%;
    display: none;
    max-width: 750px;
  }
  .yd-popup-show {
    
    -webkit-transform: translateY(100%)!important;
    transform: translateY(100%)!important;
    display: block;
  }
  .yd-mask {
    background-color: transparent!important;
  }
  .yd-popup-content {
   box-shadow: 0px 3px 9px #e7e6e6;
  }
}
.yd-list-item {
  .yd-list-mes {
    position: relative;
    .listbadge {
      position: absolute;
      top: 0;
      right: .5rem;
      .yd-badge {
        background-color: #e9eefb;
        color: #265cd7;
        font-size: .26rem;
        padding: 5px .2rem;
      }
    }
    .listMes {
      line-height: .35rem;
    } 
  }
}
.setcheckbox {
  margin: .3rem;
  .yd-checkbox-icon, .yd-radio-icon {
    display: none;
  }
  .yd-checkbox, .yd-radio {
    width: 33%;
    text-align: center;
    padding: 10px;
  }
  .yd-checkbox-text, .yd-radio-text{
    width: 100%;
    display: inline-block;
    padding: 4px 0;
    background-color: #f7f7f7;
    color: #8888;
    border-radius: 5px;
    font-size: .24rem;
  }
  .yd-checkbox>input[type=checkbox]:checked+.yd-checkbox-icon + .yd-checkbox-text,  .yd-radio>input[type=radio]:checked+.yd-radio-icon + .yd-radio-text{
    color: #fff!important;
    background-color: #eb4a4a!important;
  }
}
</style>
