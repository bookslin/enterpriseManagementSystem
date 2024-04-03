import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import News from '../views/News.vue'
import NewDetail from '../views/NewDetail.vue'
import Product from '../views/Product.vue'
import Contact from '../views/Contact.vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/news',
    name: 'news',
    component: News
  },
  {
    path: '/new-detail/:id',
    name: 'NewDetail',
    component: NewDetail
  },
  {
    path: '/product',
    name: 'product',
    component: Product
  },
  {
    path: '/contact',
    name: 'contact',
    component: Contact
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to,from,next)=>{
  NProgress.start();
  next()
})
router.afterEach((to,from,next)=>{
  NProgress.done();
  // next()
})

export default router
