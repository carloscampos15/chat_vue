import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vuelidate from "vuelidate";
import axios from "axios";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import Autocomplete from '@trevoreyre/autocomplete-vue'
import '@trevoreyre/autocomplete-vue/dist/style.css'
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
Vue.use(Vuelidate);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(Autocomplete)

window.axios = axios;
axios.defaults.baseURL = "http://localhost:3999";
const user = JSON.parse(localStorage.getItem("user"));

if (user) {
  axios.defaults.headers.common["Authorization"] = user.token;
}

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");