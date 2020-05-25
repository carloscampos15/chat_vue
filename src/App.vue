<template>
  <div id="app">
    <OverLay />
    <Navbar />
    <main class="py-4">
      <b-container>
        <router-view />
      </b-container>
    </main>
  </div>
</template>

<script>
import Navbar from "@/components/NavBar";
import OverLay from "@/components/OverLay";
export default {
  components: {
    Navbar,
    OverLay
  }
};
</script>

<style>
</style>