<template>
  <div class="about-luru page-content">
    <yd-flexbox ref="tabselectMain">
      <yd-flexbox-item><div class="tabselect" :class="{'selectedbtn': show1}" @click="showSelect()">{{radio1 | radioType}}<span :class="{'yd-accordion-rotated': show1}" class="yd-accordion-head-arrow"></span></div></yd-flexbox-item>
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
    <yd-popup v-model="show1" width="100%" class="searchPop" ref="lrType">  
      <div style="background-color:#fff;" class="setselect">
        <yd-radio-group v-model="radio1">
            <yd-radio val="submit">已提交</yd-radio>
            <yd-radio val="no_submit">未提交</yd-radio>
            <yd-radio val="publish">已发布</yd-radio>
            <yd-radio val="reject">已驳回</yd-radio>
        </yd-radio-group>
      </div>
    </yd-popup>
    <div v-if="list.length === 0" class="nodata">暂无数据...</div>
  </div>
</template>

<script>

export default {
  name: "luru",
  components: {
  },
  data() {
    return {
      show1: false,
      show2: false,
      allh: '',
      from: '',
      setMes: {},
      result: [],
      radio1: 'submit',
      filters: {
        type: 'submit'
      },
      list: []
    };
  },
  created() {
  },
  mounted() {
    this.allh = window.innerHeight
    this.getResult()
  },
  activated () {
    this.getResult()
  },
  filters: {
    radioType(status) {
      const mes = {
        'submit' : '已提交',
        'no_submit' : '未提交',
        'publish' : '已发布',
        'reject' : '已驳回',
      }
      return mes[status]
    }
  },
  methods: {
    getResult() {
      const par = {
        type: this.radio1
      }
      this.$axios.post(this.baseUrl + 'my/lists', par)
      .then(response => {
        this.list = response.data.data.list
        console.log(this.list)
      }).catch(() => {
      });
    },
    selectHandle() {
      this.getResult()
      this.show1 = false
    },
    gotoSearchDetial(id) {
      this.$router.push({path:'/SearchDetial',query:{id:id}})
    },
    showSelect() {
      this.setBottom()
      this.show1 = true
    },
    setBottom() {
      document.getElementById('scrollView').scrollTop = 0

      let pe =  (document.getElementsByTagName('html')[0].style.fontSize)
      pe = parseInt(pe.substring(0, pe.length - 2)) + 36
      const pre = (1 - (pe / this.allh)) * 100
      this.$refs['lrType'].$el.children[1].style.bottom = pre + '%'
    },
    reSelect() {
      this.filters.type = []
    }
  },
  watch: {
    radio1(val) {
      this.getResult()
      this.show1 = false
    }
  }
};
</script>
<style lang="scss">
.about-luru {
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
  .yd-accordion-head-arrow {
    min-height: 0;
    display: inline-block;
    margin-left: .1rem;
    margin-bottom: 2px;
  }
}
.tabselect::after{
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
.btn1{
  color: #888;
  background-color: #fff;
  border-top: 1px solid #e3e3e3;
}
.btn2{
  color: #fff;
  background-color: #eb4a4a;
  border-top: 1px solid #e3e3e3;
}
.searchPop {
  max-width: 750px;
  .yd-popup-bottom {
    -webkit-transform: translateY(100%);
    transform: translateY(100%);
    right: 0;
    bottom: 100%;
    display: none;
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
.setselect {
  padding: 0 5%;
 .yd-radio {
   display: inherit;
   line-height: .8rem;
    .yd-radio-icon {
     float: right;
     margin-top:.2rem;
     color: #eb4a4a!important;
    }
  }
  .yd-radio>input[type=radio]:checked+.yd-radio-icon + .yd-radio-text{
    color: #eb4a4a!important;
  }
}
.selectedbtn{
  color: #eb4a4a;
  .yd-accordion-head-arrow:after{
    border-bottom: 7px solid #eb4a4a;
  }
}
</style>
