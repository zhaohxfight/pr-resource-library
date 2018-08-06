<template>
  <yd-layout style="max-width:750px;">
      <yd-navbar slot="navbar" bgcolor="#eb4a4a">
          <a href="javascript:;" @click="goback" slot="left">
              <yd-navbar-back-icon>返回</yd-navbar-back-icon>
          </a>
          <div slot="center"><span class="yd-navbar-center-title">公共关系资源库</span></div>
          <a href="javascript:;" slot="right" @click="allClose">
              关闭
          </a>
      </yd-navbar>
        <keep-alive>
          <router-view  v-if="$route.meta.keepAlive" ref="appmain"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      <yd-tabbar slot="tabbar" v-if="$route.path === '/' || $route.path === '/about'">
          <yd-tabbar-item title="搜索" link="/" exact>
              <yd-icon name="search" slot="icon" size="0.54rem"></yd-icon>
          </yd-tabbar-item>
          <yd-tabbar-item title="我的" link="/about" exact>
              <yd-icon name="ucenter-outline" slot="icon" size="0.54rem"></yd-icon>
          </yd-tabbar-item>
      </yd-tabbar>
  </yd-layout>
</template>
<script>
export default {
    data() {
        return {
            show: false,
            value2: '',
            result: []
        }
    },
    created() {
      console.log(this.$route.path);
    },
    computed: {
    },
    methods: {
      getResult(val) {
          if (!val) return [];
          return ['Apple', 'Banana', 'Orange', 'Durian', 'Lemon', 'Peach', 'Cherry', 'Berry', 'Core', 'Fig', 'Haw', 'Melon', 'Plum', 'Pear', 'Peanut', 'Other'].filter(value => new RegExp(val, 'i').test(value));
      },
      itemClickHandler(item) {
          this.$dialog.toast({
              mes: `搜索：${item}`
          });
      },
      submitHandler(value) {
          this.$dialog.toast({
              mes: `搜索：${value}`
          });
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
        value2(val) {
            this.result = this.getResult(val);
        }
    }
}
</script>
<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.router-link-active {
    color: #eb4a4a!important;
}
.slide-fade-enter {
    opacity: 0;
}
.slide-fade-leave {
    opacity: 1;
}
.slide-fade-enter-active {
    transition: opacity .3s;
}
.slide-fade-leave-active {
    opacity: 0;
    transition: opacity .3s;
}
.yd-navbar {
  color: #fff;
  .yd-navbar-center-title {
    font-size: .32rem;
  }
  .yd-back-icon {
    color: #fff;
  }
  .yd-back-icon:before, .yd-next-icon:before {
    vertical-align: bottom;
    color: #fff;
  }

}
.yd-navbar::after {
  border-bottom: none!important; 
}
.yd-back-icon:before, .yd-next-icon:before {
    font-size: .32rem!important;
}
.yd-scrollview {
 background: #fff;
}

</style>
