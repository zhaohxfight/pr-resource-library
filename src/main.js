
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import YDUI from 'vue-ydui'
import 'vue-ydui/dist/ydui.rem.css';
Vue.config.productionTip = false
Vue.use(YDUI);
Vue.prototype.$axios = axios
Vue.prototype.baseUrl = 'http://peopleapi.iyunfish.cn/'

document.addEventListener('DOMContentLoaded', function() {
  typeof FastClick === 'function' && FastClick.attach(document.body);
}, false)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
