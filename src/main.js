
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import YDUI from 'vue-ydui'
import 'vue-ydui/dist/ydui.rem.css';
// import VueScroller from 'vue-scroller'
// Vue.use(VueScroller)
Vue.config.productionTip = false
Vue.use(YDUI);
Vue.prototype.$axios = axios
Vue.prototype.baseUrl = 'http://peopleapi.iyunfish.cn/api/'
let pe =  (document.getElementsByTagName('html')[0].style.fontSize)
pe = parseInt(pe.substring(0, pe.length - 2))
Vue.prototype.swHeight = (window.innerHeight - pe - 50) + 'px'

document.addEventListener('DOMContentLoaded', function() {
  typeof FastClick === 'function' && FastClick.attach(document.body);
}, false)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
