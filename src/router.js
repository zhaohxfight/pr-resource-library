import Vue from 'vue'
import Router from 'vue-router'
import Search from './views/Search.vue'
import About from './views/About.vue'
import AboutLuru from './views/AboutLuru.vue'
import AboutSenhe from './views/AboutSenhe.vue'
import AboutShowcang from './views/AboutShoucang.vue'
import SearchResult from './views/SearchResult.vue'
import SearchDetail from './views/SearchDetail.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'search',
      component: Search,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/searchResult',
      name: 'SearchResult',
      component: SearchResult,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/searchDetial',
      name: 'SearchDetail',
      component: SearchDetail,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/aboutLuru',
      name: 'aboutLuru',
      component: AboutLuru,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/aboutSenhe',
      name: 'aboutSenhe',
      component: AboutSenhe,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/aboutShowcang',
      name: 'aboutShowcang',
      component: AboutShowcang,
      meta: {
        keepAlive: false
      }
    }
  ]
})
