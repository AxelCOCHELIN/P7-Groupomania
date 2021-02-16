<template>
  <v-container>
    <h1 class="display-3 ma-4 d-flex justify-center">Utilisateurs</h1>
    <v-card outlined hover class="ma-4" v-for="user in users" :key="user.id">
      <v-card-title>
        <h3>{{ user.username }}</h3>
        <v-btn>Afficher</v-btn>
        <v-btn>Modifier</v-btn>
        <v-btn @click="deleteUser(user)">Supprimer</v-btn>
      </v-card-title>
    </v-card>
  </v-container>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex";
export default {
  name: "AdminUsers",
  components: {},
  computed: {
    ...mapState(["users"]),
  },
  methods: {
    deleteUser(user) {
      let response = confirm(
        "Êtes vous sur de vouloir supprimer cet utilisateur?"
      );
      if (response) {
        this.$store.dispatch("deleteUser", user);
      }
    },
  },
  mounted() {
    this.$store.dispatch("loadUsers");
  },
};
</script>
