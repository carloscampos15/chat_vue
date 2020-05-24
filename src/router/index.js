import Vue from 'vue'
import store from '@/store'
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
    component: Home,
    meta: { 
      requiresAuth: true
    }
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

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login') 
  } else {
    if(to.name == 'login' && store.getters.isLoggedIn || to.name == 'register' && store.getters.isLoggedIn){
      next('/home') 
      return
    }
    next() 
  }
})

export default router
