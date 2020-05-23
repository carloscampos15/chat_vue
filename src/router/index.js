import Vue from 'vue'
import VueRouter from 'vue-router'
import Welcome from '@/views/Welcome';
import Home from '@/views/Home'
//auth
import Login from '@/views/auth/Login'
import Register from '@/views/auth/Register'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'welcome',
    component: Welcome
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  { 
    path: '*', 
    redirect: '/' 
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
