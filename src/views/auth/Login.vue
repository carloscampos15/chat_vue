<template>
  <b-row class="justify-content-center div-center" align-v="center">
    <b-col col md="6">
      <b-card class="shadow-sm">
        <b-form>
          <b-form-group>
            <h2 class="text-center">Acceder</h2>
          </b-form-group>
          <b-form-group>
            <b-form-input type="email" placeholder="Correo electrónico" trim required></b-form-input>
          </b-form-group>
          <b-form-group>
            <b-form-input type="password" placeholder="Contraseña" trim required></b-form-input>
          </b-form-group>
          <b-form-group>
            <b-button type="submit" block variant="primary">Acceder</b-button>
          </b-form-group>
        </b-form>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: "Login",
  components: {}
};
</script>

<style scoped>
.div-center {
  height: 70vh;
}
</style>
