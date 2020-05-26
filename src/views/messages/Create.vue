<template>
  <div>
    <b-card>
      <h1>Enviar mensaje</h1>
      <p class="lead">Especificar los datos del mensaje.</p>
      <b-form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group label="Email:" label-for="email">
          <autocomplete
            id="email"
            ref="autocomplete"
            :search="searchUsers"
            placeholder="Ingresar correos separados por comas"
            aria-label="Ingresar correos separados por comas"
            @submit="addEmail"
          ></autocomplete>
          <div class="error" v-if="emails.length == 0">Es necesario al menos un email.</div>
          <div
            v-for="(email, index) in emails"
            v-bind:key="index"
            class="alert alert-warning alert-dismissible fade show mt-2"
            role="alert"
          >
            <strong>{{email}}</strong>
            <button
              type="button"
              class="close"
              data-dismiss="alert"
              aria-label="Close"
              @click="deleteEmail(email)"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
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
          <b-form-textarea id="mensaje" v-model="body" size="sm" rows="5"></b-form-textarea>
          <div class="error" v-if="!$v.body.required">Campo requerido.</div>
        </b-form-group>

        <b-button @click="handleSend" type="submit" pill block variant="outline-primary">Enviar</b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";
import Autocomplete from "@trevoreyre/autocomplete-vue";
import router from "@/router/index";
export default {
  name: "CreateMessage",
  components: { Autocomplete },
  validations: {
    subject: {
      required
    },
    body: {
      required
    }
  },
  data() {
    return {
      emails: [],
      subject: null,
      body: null
    };
  },
  methods: {
    searchUsers(input) {
      var that = this;
      return new Promise(resolve => {
        if (input.length < 3) {
          return resolve([]);
        }
        axios
          .post("api/users/search", {
            search: input,
            emails: that.emails
          })
          .then(function(response) {
            var data = [];
            var user = that.$store.state.user;
            response.data.emails.forEach(element => {
              var bandera = true;
              that.emails.forEach(email => {
                //Se restringe que no se puedan enviar mensajes a el mismo
                if (element == email || user.email == element) {
                  bandera = false;
                }
              });
              if (bandera) {
                if (user.email != element) {
                  data.push(element);
                }
              }
            });
            resolve(data);
          })
          .catch(function(error) {
            console.log(error);
          });
      });
    },
    addEmail(result) {
      this.emails.push(result);
      this.$refs.autocomplete.value = "";
    },
    deleteEmail(email) {
      for (var i = 0; i < this.emails.length; i++) {
        if (email == this.emails[i]) {
          this.emails.splice(i, 1);
          break;
        }
      }
    },
    handleSend(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmit();
    },
    handleSubmit() {
      var that = this;
      that.$v.$touch();
      if (that.$v.$invalid || that.emails.length == 0) {
        return;
      }
      var emails = that.emails;
      var subject = that.subject;
      var body = that.body;

      that.$store.state.showOverlay = true;
      return new Promise(resolve => {
        axios
          .post("api/message/create", {
            receptors: that.emails,
            subject: that.subject,
            body: that.body
          })
          .then(function(response) {
            resolve(response);
            that.$store.state.showOverlay = false;
            router.push("/messages");
          })
          .catch(function(error) {
            console.log(error);
            that.$store.state.showOverlay = false;
          });
      });
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

