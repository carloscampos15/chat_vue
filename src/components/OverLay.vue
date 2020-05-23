<template>
  <b-overlay
    spinner-variant="primary"
    :show="this.$store.state.showOverlay"
    :variant="variant"
    :opacity="opacity"
    :blur="blur"
    no-wrap
    z-index="1041"
  >
    <template v-slot:overlay>
      <div class="text-center">
        <b-spinner variant="dark" style="width: 3rem; height: 3rem;"></b-spinner>
        <p id="cancel-label">Please wait...</p>
      </div>
    </template>
  </b-overlay>
</template>

<script>
export default {
  data() {
    return {
      variant: "secondary",
      opacity: 0.58,
      blur: "1rem"
    };
  }
};
</script>

<style>
</style>