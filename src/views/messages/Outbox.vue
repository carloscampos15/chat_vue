<template>
  <div>
    <h1 class="mb-3">Mensajes enviados (Outbox)</h1>
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
            <strong v-for="(item, jndex) in message.receptors" v-bind:key="jndex">{{item.email}}&nbsp;</strong>
          </b-col>
          <b-col>{{message.subject}}</b-col>
          <b-col>{{message.created_at}}</b-col>
          <b-col class="text-right">
            <b-button class="pt-0 pb-0 text-success" variant="link" v-b-tooltip.hover title="Ver">
              <b-icon-eye></b-icon-eye>
            </b-button>
            <b-button
              class="pt-0 pb-0 text-danger"
              variant="link"
              v-b-tooltip.hover
              title="Eliminar"
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
export default {
  name: "OutboxMessage",
  components: {},
  data() {
    return {
      messages: []
    };
  },
  created: function() {
    var that = this;
    return new Promise(resolve => {
      that.$store.state.showOverlay = true;
      axios
        .get("api/message/outbox")
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
  }
};
</script>

<style scoped>
</style>