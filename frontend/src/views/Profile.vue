<template>
  <v-container>
    <v-card>
      <v-card-title>
        {{ currentUser.username }}
      </v-card-title>
    </v-card>
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
