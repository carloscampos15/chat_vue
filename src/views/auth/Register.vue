<template>
  <b-row class="justify-content-center div-center" align-v="center">
    <b-col col md="8">
      <b-card class="shadow-sm">
        <b-form>
          <b-form-group>
            <h2 class="text-center">Registro</h2>
          </b-form-group>
          <b-row>
            <b-col>
              <b-form-group label="Nombres" label-for="input-1">
                <b-form-input id="input-1" type="text" required placeholder="Nombres"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="Apellidos" label-for="input-2">
                <b-form-input id="input-2" type="text" required placeholder="Apellidos"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col col md="4">
              <b-form-group label="Pais" label-for="input-3">
                <b-form-select id="input-3" required></b-form-select>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="Correo electrónico" label-for="input-4">
                <b-form-input id="input-4" type="email" required placeholder="Correo electrónico"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group label="Contraseña" label-for="input-5">
                <b-form-input id="input-5" type="password" required placeholder="Contraseña"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="Confirmar contraseña" label-for="input-5">
                <b-form-input
                  id="input-6"
                  type="password"
                  required
                  placeholder="Confirmar contraseña"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-form-group>
            <b-col col md="4" class="offset-md-4">
              <b-button type="submit" block variant="primary">Registro</b-button>
            </b-col>
          </b-form-group>
        </b-form>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: "Register",
  components: {}
};
</script>

<style scoped>
.div-center {
  height: 70vh;
}
</style>

