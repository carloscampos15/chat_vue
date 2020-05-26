<template>
  <div>
    <b-alert v-if="!message" variant="danger" show>No tienes permisos para acceder a este recurso.</b-alert>
    <b-card v-if="message">
      <b-form ref="form">
        <b-row>
          <b-col>
            <b-form-group label="Enviado por:" label-for="enviado_por">
              <strong>
                <p>{{message.sender_email}}</p>
              </strong>
            </b-form-group>
          </b-col>
          <b-col class="text-right">
            <b-form-group :label="'Enviado el: '+message.created_at" label-for="enviado_por"></b-form-group>
            <b-button
              class="pt-0 pb-0 text-primary"
              variant="link"
              v-b-tooltip.hover
              title="Responder"
            >
              <b-icon-arrow-return-left></b-icon-arrow-return-left>
            </b-button>
            <b-button
              class="pt-0 pb-0 text-danger"
              variant="link"
              v-b-tooltip.hover
              title="Eliminar"
              @click="deleteMessage(message._id)"
            >
              <b-icon-trash></b-icon-trash>
            </b-button>
          </b-col>
        </b-row>
        <b-form-group label="Asunto:" label-for="asunto">
          <strong>
            <p>{{message.subject}}</p>
          </strong>
        </b-form-group>
        <b-form-group label="Mensaje:" label-for="mensaje">
          <p>{{message.body}}</p>
        </b-form-group>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import router from "@/router/index";
export default {
  name: "ShowMessage",
  components: {},
  data() {
    return {
      message: null
    };
  },
  created: function() {
    var message_id = this.$route.params.message_id;
    var that = this;
    that.$store.state.showOverlay = true;
    return new Promise(resolve => {
      axios
        .post("api/message/show", {
          message_id: message_id
        })
        .then(function(response) {
          that.message = response.data.message;
          resolve(response);
          that.$store.state.showOverlay = false;
        })
        .catch(function(error) {
          console.log(error);
          that.$store.state.showOverlay = false;
        });
    });
  },
  methods: {
    deleteMessage(message_id) {
      var that = this;
      that.$store.state.showOverlay = true;
      return new Promise(resolve => {
        axios
          .delete(`api/message/deleteInbox/${message_id}`)
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