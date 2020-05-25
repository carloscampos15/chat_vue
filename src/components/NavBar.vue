<template>
  <b-navbar toggleable="md" type="light" variant="light" class="bg-white shadow-sm">
    <b-container>
      <b-navbar-brand :to="{name: 'welcome'}">DISTRIBUIDOS</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav class="text-center">
        <b-navbar-nav class="ml-auto" right>
          <b-nav-item v-if="!isLoggedIn" :to="{name: 'login'}" exact-active-class="active">Acceder</b-nav-item>
          <b-nav-item
            v-if="!isLoggedIn"
            :to="{name: 'register'}"
            exact-active-class="active"
          >Registro</b-nav-item>

          <b-nav-item-dropdown v-if="isLoggedIn" text="mensajes" right>
            <b-dropdown-item :to="{name: 'createMessage'}" exact-active-class="active">Crear</b-dropdown-item>
            <b-dropdown-item :to="{name: 'inboxMessage'}" exact-active-class="active">Recibidos</b-dropdown-item>
            <b-dropdown-item :to="{name: 'outboxMessage'}" exact-active-class="active">Enviados</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown v-if="isLoggedIn" :text="user.name + ' ' + user.lastname" right>
            <b-dropdown-item @click="logout">Logout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>

<script>
import router from "@/router/index";
export default {
  name: "NavBar",
  props: {},
  data() {
    return {
      userName: null,
      session: null
    };
  },
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    },
    user: function() {
      var user = JSON.parse(localStorage.getItem("user"));
      return user;
    }
  },
  methods: {
    logout: function() {
      this.$store.dispatch("logout").then(() => {
        router.push("/login");
      });
    }
  }
};
</script>

<style>
</style>