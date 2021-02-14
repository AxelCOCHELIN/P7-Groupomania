<template>
  <v-container>
    <v-form>
      <v-text-field
        v-model="loginInfo.email"
        label="Adresse e-mail"
      ></v-text-field
      ><v-text-field
        v-model="loginInfo.password"
        label="Mot de passe"
        type="password"
      ></v-text-field>

      <v-btn @click="loginUser">Se connecter <v-icon>mdi-login</v-icon></v-btn>
    </v-form>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      loginInfo: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    loginUser() {
      this.$store.dispatch("loginUser", this.loginInfo);
    },
  },
};
</script>
