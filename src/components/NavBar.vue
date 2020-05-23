<template>
  <b-navbar toggleable="md" type="light" variant="light" class="bg-white shadow-sm">
    <b-container>
      <b-navbar-brand :to="{name: 'welcome'}">DISTRIBUIDOS</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav class="text-center">
        <b-navbar-nav class="ml-auto" right>
            <b-nav-item :to="{name: 'login'}" exact-active-class="active">Acceder</b-nav-item>
            <b-nav-item :to="{name: 'register'}" exact-active-class="active">Registro</b-nav-item>

            <b-nav-item-dropdown text="userName" right>
              <b-dropdown-item>Logout</b-dropdown-item>
            </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>

<script>
export default {
  name: "NavBar",
  props: {},
  data() {
    return {
      userName: null,
      session: null
    };
  }
};
</script>

<style>
</style>