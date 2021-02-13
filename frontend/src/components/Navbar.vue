<template>
  <nav>
    <v-toolbar
      app
      color="deep-orange lighten-3"
      class="headline text-uppercase"
    >
      <v-toolbar-title>
        <router-link to="/">
          <v-img
            alt="Groupomania Logo"
            class="shrink mr-2"
            contain
            to="/"
            :src="require('../assets/icon-left-font-monochrome-black.png')"
            transition="scale-transition"
            width="250"
          />
        </router-link>
      </v-toolbar-title>
      <v-btn text to="/articles/new">Ajouter un article</v-btn>
      <v-spacer></v-spacer>
      <div>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              fab
              plain
              small
              aria-label="S'identifier"
              v-bind="attrs"
              v-on="on"
              ><v-icon>mdi-login</v-icon></v-btn
            ></template
          ><span dark color="black">S'identifier</span></v-tooltip
        >
      </div>
      <div>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn fab plain small aria-label="Profil" v-bind="attrs" v-on="on">
              <v-icon>mdi-account-circle</v-icon>
            </v-btn>
          </template>
          <span dark color="black">Profil</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              fab
              plain
              small
              aria-label="Fil d'actualité"
              v-bind="attrs"
              v-on="on"
              to="/"
              ><v-icon>mdi-home</v-icon></v-btn
            ></template
          ><span dark color="black">Fil d'actualité</span></v-tooltip
        >

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              fab
              plain
              small
              aria-label="tous les profils"
              v-bind="attrs"
              v-on="on"
              ><v-icon>mdi-book</v-icon></v-btn
            ></template
          ><span dark color="black">Tous les profils</span></v-tooltip
        >
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              fab
              plain
              small
              aria-label="Se déconnecter"
              v-bind="attrs"
              v-on="on"
              @click="logoutUser"
              ><v-icon>mdi-logout</v-icon></v-btn
            ></template
          ><span dark color="black">Se déconnecter</span></v-tooltip
        >
      </div>
    </v-toolbar>
  </nav>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Navbar",

  methods: {
    logoutUser() {
      this.$store.dispatch("logoutUser");
    },
  },

  computed: {
    ...mapState("loginInfo.email", "loginInfo.password"),
  },
};
</script>
