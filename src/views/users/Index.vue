<template>
  <div>
    <h1 class="mb-3">Usuarios</h1>
    <b-alert v-if="users.length == 0" variant="success" show>No hay usuarios registrados aun</b-alert>
    <b-card v-for="(user, index) in users" v-bind:key="index" justified class="shadow-sm mb-3">
      <b-card-text class="text-justify">
        <b-row>
          <b-col>
            <strong>{{user.email}}</strong>
          </b-col>
          <b-col>{{user.name}}</b-col>
          <b-col>{{user.lastname}}</b-col>
          <b-col class="text-right">
            <b-button
              class="pt-0 pb-0 text-success"
              variant="link"
              v-b-tooltip.hover
              title="Ver"
              :to="'users/'+user._id"
            >
              <b-icon-eye></b-icon-eye>
            </b-button>
            <b-button
              class="pt-0 pb-0 text-primary"
              variant="link"
              v-b-tooltip.hover
              title="Editar"
            >
              <b-icon-pencil></b-icon-pencil>
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
import router from "@/router/index";
export default {
  name: "Users",
  components: {},
  data() {
    return {
      users: []
    };
  },
  created: function() {
    var that = this;
    that.$store.state.showOverlay = true;
    return new Promise(resolve => {
      axios
        .get("api/users")
        .then(function(response) {
          that.users = response.data.users;
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
    deleteUser(user_id) {
      //   var that = this;
      //   that.$store.state.showOverlay = true;
      //   return new Promise(resolve => {
      //     axios
      //       .delete(`api/message/deleteInbox/${message_id}`)
      //       .then(function(response) {
      //         resolve(response);
      //         that.$store.state.showOverlay = false;
      //         location.reload();
      //       })
      //       .catch(function(error) {
      //         console.log(error);
      //         that.$store.state.showOverlay = false;
      //       });
      //   });
    }
  }
};
</script>