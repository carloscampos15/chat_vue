<template>
  <b-navbar toggleable="md" type="light" variant="light" class="bg-white shadow-sm">
    <b-container>
      <b-navbar-brand href="/">DISTRIBUIDOS</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav class="text-center">
        <b-navbar-nav class="ml-auto" right>
          <b-nav-item :to="{name: 'Login'}" exact-active-class="active">Acceder</b-nav-item>
          <b-nav-item :to="{name: 'Register'}" exact-active-class="active">Registro</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>

<script>
export default {
  name: "NavBar",
  props: {}
};
</script>

<style>
</style>