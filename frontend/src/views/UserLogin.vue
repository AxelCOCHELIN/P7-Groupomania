<template>
  <v-container>
    <v-form>
      <v-text-field v-model="email" label="email"></v-text-field>
      <v-text-field
        v-model="password"
        label="password"
        :type="showPassword ? 'text' : 'password'"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="showPassword = !showPassword"
      ></v-text-field>

      <v-btn @click="loginUser">Se connecter<v-icon>mdi-login</v-icon> </v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      showPassword: false,
    };
  },
  methods: {
    loginUser() {
      this.$store.dispatch("loginUser", this.email, this.password);
    },
  },
};
</script>
