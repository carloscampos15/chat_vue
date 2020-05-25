import Vue from 'vue'
import store from '@/store'
import VueRouter from 'vue-router'
import Welcome from '@/views/Welcome';
//auth
import Login from '@/views/auth/Login'
import Register from '@/views/auth/Register'
//messages
import InboxMessage from '@/views/messages/Inbox'
import OutboxMessage from '@/views/messages/Outbox'
import CreateMessage from '@/views/messages/Create'

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
    path: '/messages',
    name: 'inboxMessage',
    component: InboxMessage,
    meta: { 
      requiresAuth: true
    }
  },
  {
    path: '/messages/create',
    name: 'createMessage',
    component: CreateMessage,
    meta: { 
      requiresAuth: true
    }
  },
  {
    path: '/messages/sent',
    name: 'outboxMessage',
    component: OutboxMessage,
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
      next('/messages') 
      return
    }
    next() 
  }
})

export default router