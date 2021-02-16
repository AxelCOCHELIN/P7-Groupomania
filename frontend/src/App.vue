<template>
  <v-app>
    <Navbar />
    <v-main color="grey">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  name: "App",

  components: {
    Navbar,
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
