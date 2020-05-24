<template>
  <b-row class="justify-content-center div-center" align-v="center">
    <b-col col md="6">
      <b-card class="shadow-sm">
        <b-form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group>
            <h2 class="text-center">Acceder</h2>
          </b-form-group>
          <b-form-group>
            <b-form-input
              type="email"
              v-model="email"
              placeholder="Correo electrónico"
              trim
              required
              @keyup="emailState = false"
            ></b-form-input>
            <div class="error" v-if="!$v.email.required">Campo requerido.</div>
            <div class="error" v-if="!$v.email.email">Email invalido.</div>
            <div class="error" v-if="emailState == true">Email invalido.</div>
          </b-form-group>
          <b-form-group>
            <b-form-input type="password" v-model="password" placeholder="Contraseña" trim required></b-form-input>
            <div class="error" v-if="!$v.password.required">Campo requerido.</div>
          </b-form-group>
          <b-form-group>
            <b-button @click="handleRegister" block variant="primary">Acceder</b-button>
          </b-form-group>
        </b-form>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
import router from "@/router/index";
export default {
  name: "Login",
  components: {},
  data() {
    return {
      email: null,
      password: null,
      emailState: false
    };
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required
    }
  },
  methods: {
    handleRegister(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmit();
    },
    handleSubmit() {
      var that = this;
      that.$v.$touch();
      if (that.$v.$invalid) {
        return;
      }
      var email = that.email;
      var password = that.password;
      that.$store
        .dispatch("login", { email, password })
        .then(() => router.push("home"))
        .catch(err => that.emailState = true);
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
