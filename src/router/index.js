import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue';
import AddBusiness from '../views/AddBusiness.vue';
import Search from '../views/Search.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/add',
    name: 'AddBusiness',
    component: AddBusiness
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
