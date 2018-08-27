<template>
  <div class="about-luru ">
    <yd-flexbox ref="tabselectMain">
      <yd-flexbox-item><div class="tabselects" :class="{'selectedbtn': show1}" @click="showSelect()">{{radio1 | radioType}}<span :class="{'yd-accordion-rotated': show1}" class="yd-accordion-head-arrow"></span></div></yd-flexbox-item>
    </yd-flexbox>
    <div class="inscroll">
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
              <!-- <div class="collected" @click.stop="collected(item.id, item.is_collect, index)">
                <yd-icon :name="item.is_collect === 1 ? 'star': 'star-outline'"  size=".45rem" color="#ff9c00"></yd-icon>
              </div> -->
              </yd-list-other>
            </yd-list-item>
          </yd-list>
            <!-- 数据全部加载完毕显示 -->
          <span slot="doneTip">没有更多数据...</span>

          <!-- 加载中提示，不指定，将显示默认加载中图标 -->
          <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>
      </yd-infinitescroll>
    </div>

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
        type: 'submit',
        page: 1,
        perpage: 10
      },
      list: []
    };
  },
  created() {
  },
  mounted() {
    this.allh = window.innerHeight
    this.$dialog.loading.open('加载中...');
    this.list = []
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
      this.filters.type = this.radio1
      this.$axios.post(this.baseUrl + 'my/lists', this.filters)
      .then(response => {
        this.$dialog.loading.close();
        const _list = response.data.data.list
        this.list.push(..._list)
        console.log(this.list)
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
    loadList() {
      this.filters.page ++
      this.getResult()
    },
    selectHandle() {
      this.getResult()
      this.show1 = false
    },
    gotoSearchDetial(id) {
      this.$router.push({path:'/SearchDetial3',query:{id:id}})
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
      this.$dialog.loading.open('加载中...');
      this.list = []
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
  .inscroll {
    width: 100%;
    height: calc(100vh - 1rem - 40px);
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
      z-index: 999;
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
          padding: 3px .1rem;
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
.yd-flexbox-item {
  position: relative;
}
.nodata {
  width: 100%;
  text-align: center;
  color: #888;
  margin-top: 3rem;
}
.tabselects {
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
.tabselects::after{
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
