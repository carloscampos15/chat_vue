<template>
  <div>
    <b-alert v-if="!message" variant="danger" show>No tienes permisos para acceder a este recurso.</b-alert>
    <b-card v-if="message">
      <b-form ref="form">
        <b-row>
          <b-col>
            <b-form-group label="Enviado para:" class="mb-0">
              <strong v-for="(item, index) in message.receptors" v-bind:key="index">
                <p>
                  <b-icon icon="exclamation-circle-fill" class="mr-2" variant="primary"></b-icon>
                  <strong>{{item.email}}&nbsp;</strong>
                </p>
              </strong>
            </b-form-group>
          </b-col>
          <b-col class="text-right">
            <b-form-group :label="'Enviado el: '+message.created_at" label-for="enviado_por"></b-form-group>
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
  name: "ShowSend",
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
        .get(`api/message/showSend/${message_id}`)
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
  methods: {}
};
</script>