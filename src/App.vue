<template>
  <div id="app">
    <Navbar></Navbar>
    <b-container>
      <router-view/>
    </b-container>
  </div>
</template>

<script>
import Navbar from './components/NavBar';
export default {
  components: {
    Navbar
  }
}
</script>

<style>
</style>
