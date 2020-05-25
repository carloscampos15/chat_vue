<template>
  <div>
    <h1>Mensajes enviados (Outbox)</h1>
    <b-card justified class="shadow-sm">
      <b-card-text class="text-justify">
        <b-row>
          <b-col>
            <strong>Nombre receptor</strong>
          </b-col>
          <b-col>Asunto del mensaje</b-col>
          <b-col>dd-mm-aa</b-col>
          <b-col class="text-right">
            <b-button class="pt-0 pb-0 text-success" variant="link" v-b-tooltip.hover title="Ver">
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
  created: function() {
    this.$store.state.showOverlay = true;
  }
};
</script>