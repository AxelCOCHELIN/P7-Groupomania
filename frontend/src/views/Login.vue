<template>
  <v-container>
    <v-form v-model="valid">
      <v-text-field
        v-model="loginInfo.email"
        label="Adresse e-mail"
        :rules="[required('email'), emailFormat()]"
      ></v-text-field
      ><v-text-field
        v-model="loginInfo.password"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        label="Mot de passe"
        counter="true"
        :rules="[
          required('password'),
          minLength('password', 8),
          maxLength('password', 20),
          passwordFormat(),
        ]"
        :type="showPassword ? 'text' : 'password'"
        @click:append="showPassword = !showPassword"
      ></v-text-field>

      <v-btn @click="loginUser" :disabled="!valid"
        >Se connecter <v-icon>mdi-login</v-icon></v-btn
      >
    </v-form>
  </v-container>
</template>
<script>
import validations from "@/utils/validations";

export default {
  data() {
    return {
      showPassword: false,
      loginInfo: {
        email: "",
        password: "",
      },
      ...validations,
    };
  },
  methods: {
    loginUser() {
      this.$store.dispatch("loginUser", this.loginInfo);
    },
  },
};
</script>
