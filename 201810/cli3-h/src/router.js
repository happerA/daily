import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Top from './views/Top.vue'
import PlayList from './views/playlist.vue'
import Search from './views/search.vue'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/playlist',
    },
    {
      path: '/playlist',
      name: 'home',
      component: Home
    },
    {
      path: '/toplist',
      name: 'Top',
      component: Top
    },
    {
      path: '/playlist/:id',
      name: 'PlayList',
      component: PlayList
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    }
  ]
})
