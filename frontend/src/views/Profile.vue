<template>
  <v-container>
    <h2>Mon profil</h2>
    <v-card>
      <v-card-title>
        {{ currentUser.username }}
      </v-card-title>
    </v-card>
    <h2>Mes articles</h2>

    <h2>Mes commentaires</h2>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["currentUser"]),
  },
};
</script>
