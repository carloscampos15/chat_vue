import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// https://github.com/christiannwamba/vue-auth-vuex

export default new Vuex.Store({
  state: {
    showOverlay: false,
    status: "",
    user: localStorage.getItem("user") || null,
  },
  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, user) {
      state.status = "success";
      state.user = user;
    },
    auth_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.user = null;
    },
  },
  actions: {
    login({ commit }, user) {
      var that = this;
      that.state.showOverlay = true;
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios
          .post("api/auth/login", {
            email: user.email,
            password: user.password,
          })
          .then(function(response) {
            const token = response.data.token;
            const user = response.data.user;
            user.token = token;
            localStorage.setItem("user", JSON.stringify(user));
            axios.defaults.headers.common["Authorization"] = token;
            commit("auth_success", user);
            resolve(response);
            that.state.showOverlay = false;
          })
          .catch(function(error) {
            console.log(error.response);
            commit("auth_error");
            localStorage.removeItem("user");
            reject(error);
            that.state.showOverlay = false;
          });
      });
    },
    register({ commit }, user) {
      var that = this;
      that.state.showOverlay = true;
      return new Promise((resolve, reject) => {
        commit("auth_request");

        axios
          .post("api/auth/register", {
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            password: user.password,
          })
          .then(function(response) {
            const token = response.data.token;
            const user = response.data.user;
            user.token = token;
            localStorage.setItem("user", JSON.stringify(user));
            axios.defaults.headers.common["Authorization"] = token;
            commit("auth_success", user);
            resolve(response);
            that.state.showOverlay = false;
          })
          .catch(function(error) {
            commit("auth_error", error);
            localStorage.removeItem("user");
            reject(error);
            that.state.showOverlay = false;
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        commit("logout");
        localStorage.removeItem("user");
        delete axios.defaults.headers.common["Authorization"];
        resolve();
      });
    },
  },
  modules: {},
  getters: {
    isLoggedIn: (state) => !!state.user,
    authStatus: (state) => state.status,
    user: (state) => state.user
  },
});
