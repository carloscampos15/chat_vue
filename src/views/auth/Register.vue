<template>
  <b-row class="justify-content-center div-center" align-v="center">
    <b-col col md="8">
      <b-card class="shadow-sm">
        <b-form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group>
            <h2 class="text-center">Registro</h2>
          </b-form-group>
          <b-row>
            <b-col>
              <b-form-group label="Nombres" label-for="input-name">
                <b-form-input
                  v-model="name"
                  id="input-name"
                  type="text"
                  required
                  placeholder="Nombres"
                ></b-form-input>
                <div class="error" v-if="!$v.name.required">Campo requerido.</div>
                <div
                  class="error"
                  v-if="!$v.name.minLength"
                >Los nombres debe tener al menos {{$v.name.$params.minLength.min}} letras.</div>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="Apellidos" label-for="input-lastname">
                <b-form-input
                  v-model="lastname"
                  id="input-lastname"
                  type="text"
                  required
                  placeholder="Apellidos"
                ></b-form-input>
                <div class="error" v-if="!$v.lastname.required">Campo requerido.</div>
                <div
                  class="error"
                  v-if="!$v.lastname.minLength"
                >Los apellidos debe tener al menos {{$v.lastname.$params.minLength.min}} letras.</div>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group label="Correo electrónico" label-for="input-email">
                <b-form-input
                  v-model="email"
                  id="input-email"
                  type="email"
                  required
                  placeholder="Correo electrónico"
                  @keyup="emailState = false"
                ></b-form-input>
                <div class="error" v-if="!$v.email.required">Campo requerido.</div>
                <div class="error" v-if="!$v.email.email">Email invalido.</div>
                <div class="error" v-if="emailState == true">Este email ya se encuentra registrado.</div>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group label="Contraseña" label-for="input-password">
                <b-form-input
                  v-model="password"
                  id="input-password"
                  type="password"
                  required
                  placeholder="Contraseña"
                ></b-form-input>
                <div class="error" v-if="!$v.password.required">Campo requerido.</div>
                <div
                  class="error"
                  v-if="!$v.password.minLength"
                >La contraseña debe tener al menos {{$v.password.$params.minLength.min}} letras.</div>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="Confirmar contraseña" label-for="input-password-confirmation">
                <b-form-input
                  id="input-password-confirmation"
                  type="password"
                  required
                  v-model="passwordConfirmation"
                  placeholder="Confirmar contraseña"
                ></b-form-input>
                <div class="error" v-if="!$v.passwordConfirmation.required">Campo requerido.</div>
                <div
                  class="error"
                  v-if="!$v.passwordConfirmation.sameAsPassword"
                >Las contraseñas deben coincidir.</div>
              </b-form-group>
            </b-col>
          </b-row>
          <b-form-group>
            <b-col col md="4" class="offset-md-4">
              <b-button @click="handleRegister" block variant="primary">Registro</b-button>
            </b-col>
          </b-form-group>
        </b-form>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";
export default {
  name: "Register",
  components: {},
  data() {
    return {
      name: null,
      lastname: null,
      email: null,
      password: null,
      passwordConfirmation: null,
      emailState: false
    };
  },
  validations: {
    name: {
      required,
      minLength: minLength(5)
    },
    lastname: {
      required,
      minLength: minLength(5)
    },
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    },
    passwordConfirmation: {
      required,
      sameAsPassword: sameAs("password")
    }
  },
  methods: {
    handleRegister(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmit();
    },
    handleSubmit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      var that = this;
      that.$store.state.showOverlay = true;
      axios
        .post("api/auth/register", {
          name: that.name,
          lastname: that.lastname,
          email: that.email,
          password: that.password
        })
        .then(function(response) {
          console.log(response);
          that.$store.state.showOverlay = false;
        })
        .catch(function(error) {
          console.log(error.response);
          that.emailState = true;
          that.$store.state.showOverlay = false;
        });
    }
  }
};
</script>

<style scoped>
.div-center {
  height: 70vh;
}

.error {
  display: block;
  color: #f57f6c;
  font-size: 12px;
}
</style>

