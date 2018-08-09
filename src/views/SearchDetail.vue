<template>
  <div class="searchDetial">
    <yd-tab horizontal-scroll>
      <yd-tab-panel v-for="item in result" :label="item.title">
        <div class="dataList" v-for="item2 in item.data">
          <div class="data-title">{{item2.name}}</div>
          <div class="data-mes">
            <div v-if="isArray(item2.value)">
              <div style="margin-bottom:.1rem;" v-for="item3 in item2.value">
                <span v-if="item3.name && item3.name !== ''">{{item3.name}}:</span>{{item3.value}}  
              </div>
            </div>
            <div v-else style="max-width:4.3rem">{{item2.value}}</div>
          </div>
        </div>
      </yd-tab-panel>
    </yd-tab>
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
      result: []
    };
  },
  created() {
  },
  mounted() {
      this.getResult()
  },
  methods: {
    getResult(val) {
      const par = {
        id: this.$route.query.id
      }
      this.$axios.post(this.baseUrl + 'people/detail', par)
      .then(response => {
        console.log(response.data)
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
  .yd-tab-panel-item {
    padding: .5rem;
  }
  .yd-tab-nav{
    width: 100%!important;
  }
  .yd-tab-panel {
    margin-top: 10px;
  }
  .dataList{
    margin-bottom: .25rem;
    .data-title {
      display: inline-block;
      color: #666;
      font-size: .28rem;
      width: 1.47rem;
      text-align:justify;
      text-align-last: justify;
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
      margin-left: .5rem;
    }
  }
}
</style>
