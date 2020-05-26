<template>
  <div>
    <b-card v-if="user">
      <b-form ref="form">
        <b-row>
          <b-col>
            <b-form-group label="Nombre de usuario:">
              <strong>
                <p>{{user.name + " " + user.lastname}}</p>
              </strong>
            </b-form-group>
          </b-col>
          <b-col class="text-right">
            <b-form-group :label="'Creado el: '+user.created_at"></b-form-group>
            <b-button
              class="pt-0 pb-0 text-danger"
              variant="link"
              v-b-tooltip.hover
              title="Eliminar"
              @click="deleteUser(user._id)"
            >
              <b-icon-trash></b-icon-trash>
            </b-button>
          </b-col>
        </b-row>
        <b-form-group label="Email:">
          <strong>
            <p>{{user.email}}</p>
          </strong>
        </b-form-group>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import router from "@/router/index";
export default {
  name: "ShowUser",
  components: {},
  data() {
    return {
      user: null
    };
  },
  created: function() {
    var user_id = this.$route.params.user_id;
    var that = this;
    that.$store.state.showOverlay = true;
    return new Promise(resolve => {
      axios
        .get(`api/users/${user_id}`)
        .then(function(response) {
          that.user = response.data.user;
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
      var that = this;
      that.$store.state.showOverlay = true;
      return new Promise(resolve => {
        axios
          .delete(`api/users/delete/${user_id}`)
          .then(function(response) {
            resolve(response);
            that.$store.state.showOverlay = false;
            router.push("/users");
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
</style>