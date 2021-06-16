import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Cart = () => import('../views/cart/Cart')
const Profile = () => import('../views/profile/Profile')
const Detail = () => import("../views/detail/Detail")

// 1.安装插件
Vue.use(VueRouter)

// 2.创建router
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  // 首页
  {
    path: '/home',
    component: Home
  },
  // 分类页
  {
    path: '/category',
    component: Category
  },
  // 购物车
  {
    path: '/cart',
    component: Cart
  },
  // 个人中心
  {
    path: '/profile',
    component: Profile
  },
  // 商品详情页
  {
    path: '/detail:iid',
    component: Detail
  }
]
const router = new VueRouter({
  routes,
  mode: 'history'
})


export default router
