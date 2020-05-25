<template>
  <div>
    <b-card>
      <h1>Enviar mensaje</h1>
      <p class="lead">Especificar los datos del mensaje.</p>
      <b-form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group label="Email:" label-for="email">
          <b-form-input
            id="email"
            type="email"
            required
            placeholder="Ingresar el email de los destinatarios"
            v-model="email"
          ></b-form-input>
          <div class="error" v-if="!$v.email.required">Campo requerido.</div>
        </b-form-group>

        <b-form-group label="Asunto:" label-for="asunto">
          <b-form-input
            id="asunto"
            v-model="subject"
            required
            placeholder="Ingresar el asunto del mensaje"
          ></b-form-input>
          <div class="error" v-if="!$v.subject.required">Campo requerido.</div>
        </b-form-group>

        <b-form-group label="Mensaje:" label-for="mensaje">
          <b-form-textarea id="mensaje" v-model="message" size="lg" rows="5"></b-form-textarea>
          <div class="error" v-if="!$v.message.required">Campo requerido.</div>
        </b-form-group>

        <b-button @click="handleSend" type="submit" pill block variant="outline-primary">Enviar</b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";
export default {
  name: "CreateMessage",
  components: {},
  validations: {
    email: {
      required
    },
    subject: {
      required
    },
    message: {
      required
    }
  },
  data() {
    return {
      email: null,
      subject: null,
      message: null
    };
  },
  methods: {
    handleSend(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmit();
    },
    handleSubmit() {
      var that = this;
      that.$v.$touch();
      if (that.$v.$invalid) {
        return;
      }
      var email = this.email;
      var subject = this.subject;
      var message = this.message;
    }
  }
};
</script>

<style scoped>
.error {
  display: block;
  color: #f57f6c;
  font-size: 12px;
}
</style>

