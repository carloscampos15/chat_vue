import Vue from "vue";
import store from "@/store";
import VueRouter from "vue-router";
import Welcome from "@/views/Welcome";
//auth
import Login from "@/views/auth/Login";
import Register from "@/views/auth/Register";
//messages
import InboxMessage from "@/views/messages/Inbox";
import OutboxMessage from "@/views/messages/Outbox";
import CreateMessage from "@/views/messages/Create";
import ShowReceive from "@/views/messages/ShowReceive";
import ShowSend from "@/views/messages/ShowSend";
//users
import Users from "@/views/users/Index";
import CreateUser from "@/views/users/Create";
import ShowUser from "@/views/users/Show";

Vue.use(VueRouter);

const routes = [
  {
    path: "/", name: "welcome", component: Welcome,
  },
  {
    path: "/login", name: "login", component: Login,
  },
  {
    path: "/register", name: "register", component: Register,
  },
  {
    path: "/messages", name: "inboxMessage", component: InboxMessage,
    meta: {requiresAuth: true}
  },
  {
    path: "/messages/create", name: "createMessage", component: CreateMessage,
    meta: {requiresAuth: true}
  },
  {
    path: "/messages/sent", name: "outboxMessage", component: OutboxMessage,
    meta: {requiresAuth: true}
  },
  {
    path: "/messages/showReceive/:message_id", name: "showReceive", component: ShowReceive,
    meta: {requiresAuth: true},
  },
  {
    path: "/messages/showSend/:message_id", name: "showSend", component: ShowSend,
    meta: {requiresAuth: true}
  },
  {
    path: "/users", name: "users", component: Users,
    meta: {requiresAuth: true}
  },
  {
    path: "/users/create", name: "createUser", component: CreateUser,
    meta: {requiresAuth: true}
  },
  {
    path: "/users/:user_id", name: "showUser", component: ShowUser,
    meta: {requiresAuth: true}
  },
  {path: "*", redirect: "/"}
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      if(store.getters.user.role == "USER"){
        if (to.name == "createMessage" || 
            to.name == "inboxMessage" || 
            to.name == "outboxMessage" || 
            to.name == "showReceive" ||
            to.name == "showSend"){
              next();
        }else{
          next("/");
        }
      }else if(store.getters.user.role == "ADMIN"){
        if (to.name == "users" || 
            to.name == "createUser" ||
            to.name == "showUser"){
              next();
        }else{
          next("/");
        }
      }
      return;
    }
  } else {
    if (
      (to.name == "login" && store.getters.isLoggedIn) ||
      (to.name == "register" && store.getters.isLoggedIn)
    ) {
      if (store.getters.user.role == "USER") {
        next("/messages");
      }
      return;
    }
    next();
  }
});

export default router;
