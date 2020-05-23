<template>
  <div id="app">
    <OverLay/>
    <Navbar/>
    <b-container>
      <router-view/>
    </b-container>
  </div>
</template>

<script>
import Navbar from './components/NavBar';
import OverLay from './components/OverLay';
export default {
  components: {
    Navbar,
    OverLay
  }
}
</script>

<style>
</style>
