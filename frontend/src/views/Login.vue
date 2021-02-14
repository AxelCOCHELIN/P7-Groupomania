<template>
  <v-container>
    <v-form>
      <v-text-field
        v-model="loginInfo.email"
        label="Adresse e-mail"
      ></v-text-field
      ><v-text-field
        v-model="loginInfo.password"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        label="Mot de passe"
        :type="showPassword ? 'text' : 'password'"
        @click:append="showPassword = !showPassword"
      ></v-text-field>

      <v-btn @click="loginUser">Se connecter <v-icon>mdi-login</v-icon></v-btn>
    </v-form>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      showPassword: false,
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
