<template>
  <div class="flex-center position-ref full-height">
    <div class="content">
      <div class="title m-b-md">EMAIL 5000</div>

      <div class="links">
        <a href="#" target="_blank">Karen Castaño</a>
        <a href="#" target="_blank">Carlos Campos</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Welcome",
  components: {}
};
</script>

<style scoped>
.full-height {
  height: 80vh;
}

.flex-center {
  align-items: center;
  display: flex;
  justify-content: center;
}

.position-ref {
  position: relative;
}

.content {
  text-align: center;
}

.title {
  font-size: 84px;
}

.links > a {
  color: #636b6f;
  padding: 0 25px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.1rem;
  text-decoration: none;
  text-transform: uppercase;
}

.m-b-md {
  margin-bottom: 30px;
}
</style>