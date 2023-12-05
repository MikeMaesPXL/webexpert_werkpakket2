import { createRouter, createWebHistory } from 'vue-router'
import homeView from '../views/homeView.vue'
import shopView from '../views/shopView.vue'
import loginView from '../views/loginView.vue'
import aboutView from '../views/aboutView.vue'
import shoppingCartView from '../views/shoppingCartView.vue'
import teamsView from '../views/teamsView.vue'
import newsView from '../views/newsView.vue'
import productView from '../views/productView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: homeView },
    { path: '/shop', component: shopView },
    { path: '/login', component: loginView },
    { path: '/about', component: aboutView },
    { path: '/shoppingCart', component: shoppingCartView },
    { path: '/teams', component: teamsView },
    { path: '/news', component: newsView },
    { path: '/product/:id', name: 'product', component: productView, props: true },
    { path: '/:catchAll(.*)', redirect: '/' },
  ]
})

export default router
