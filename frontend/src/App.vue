<template>
  <v-app>
    <Navbar />
    <v-main>
      <router-view></router-view>
    </v-main>

    <v-snackbar
      v-for="(snackbar, index) in snackbars.filter((s) => s.showing)"
      :key="snackbar.text + Math.random()"
      v-model="snackbar.showing"
      :timeout="6000"
      :color="snackbar.color"
      :style="`bottom: ${index * 60}px`"
    >
      {{ snackbar.text }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar.showing = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import { mapState } from "vuex";

export default {
  name: "App",

  components: {
    Navbar,
  },
  computed: {
    ...mapState(["snackbars"]),
  },
  data: () => ({
    //
  }),
  mounted() {
    this.$store.dispatch("loadArticles");
    this.$store.dispatch("loadCurrentUser");
  },
};
</script>
