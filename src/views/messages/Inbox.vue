<template>
  <div>
    <h1 class="mb-3">Mensajes recibidos (Inbox)</h1>
    <b-alert v-if="messages.length == 0" variant="success" show>No hay mensajes aun</b-alert>
    <b-card
      v-for="(message, index) in messages"
      v-bind:key="index"
      justified
      class="shadow-sm mb-3"
    >
      <b-card-text class="text-justify">
        <b-row>
          <b-col>
            <b-icon v-if="message.state == 'RECIBIDO'" icon="exclamation-circle-fill" class="mr-2" variant="primary"></b-icon>
            <strong>{{message.sender_email}}</strong>
          </b-col>
          <b-col>{{message.subject}}</b-col>
          <b-col>{{message.created_at}}</b-col>
          <b-col class="text-right">
            <b-button
              class="pt-0 pb-0 text-success"
              :to="'messages/showReceive/'+message._id"
              variant="link"
              v-b-tooltip.hover
              title="Ver"
            >
              <b-icon-eye></b-icon-eye>
            </b-button>
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
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
import router from "@/router/index";
export default {
  name: "InboxMessage",
  components: {},
  data() {
    return {
      messages: []
    };
  },
  created: function() {
    var that = this;
    that.$store.state.showOverlay = true;
    return new Promise(resolve => {
      axios
        .get("api/message/inbox")
        .then(function(response) {
          that.messages = response.data.messages;
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
            location.reload();
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