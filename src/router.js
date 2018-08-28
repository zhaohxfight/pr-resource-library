import Vue from 'vue'
import Router from 'vue-router'
import Search from './views/Search.vue'
import About from './views/About.vue'
import AboutLuru from './views/AboutLuru.vue'
import AboutSenhe from './views/AboutSenhe.vue'
import AboutShowcang from './views/AboutShoucang.vue'
import SearchResult from './views/SearchResult.vue'
import SearchDetail from './views/SearchDetail.vue'
import SearchDetail2 from './views/SearchDetail2.vue'
import SearchDetail3 from './views/SearchDetail3.vue'
import SearchDetailS from './views/SearchDetailS.vue'

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
      path: '/searchDetialS',
      name: 'SearchDetailS',
      component: SearchDetailS,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/searchDetial2',
      name: 'SearchDetail2',
      component: SearchDetail2,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/searchDetial3',
      name: 'SearchDetail3',
      component: SearchDetail3,
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
        keepAlive: false
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
