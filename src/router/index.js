import { createRouter, createWebHistory } from 'vue-router'
import homeView from '../views/homeView.vue'
import shopView from '../views/shopView.vue'
import loginView from '../views/loginView.vue'
import shoppingCartView from '../views/shoppingCartView.vue'
import productView from '../views/productView.vue'
import checkoutView from '../views/checkoutView.vue'
import confirmationView from '../views/confirmationView.vue'
import rerouteView from '../views/rerouteView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: homeView },
    { path: '/shop', component: shopView },
    { path: '/login', component: loginView },
    { path: '/shoppingCart', component: shoppingCartView },
    { path: '/checkout', component: checkoutView },
    { path: '/confirmation', component: confirmationView },
    { path: '/coming_soon', component: rerouteView },
    { path: '/product/:id', name: 'product', component: productView, props: true },
    { path: '/:catchAll(.*)', redirect: '/coming_soon' },
  ]
})

export default router
