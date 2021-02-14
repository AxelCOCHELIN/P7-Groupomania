<template>
  <v-form v-model="valid">
    <v-text-field
      v-model="userInfo.email"
      label="Adresse e-mail"
      :rules="[required('email'), emailFormat()]"
    ></v-text-field
    ><v-text-field
      v-model="userInfo.password"
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
    <v-text-field
      v-model="userInfo.username"
      label="Pseudo"
      :rules="[required('username')]"
      v-if="hasName"
    ></v-text-field>

    <v-btn @click="submitForm(userInfo)" :disabled="!valid">
      {{ buttonText }}<v-icon>mdi-login</v-icon></v-btn
    >
  </v-form>
</template>

<script>
import validations from "@/utils/validations";
export default {
  data() {
    return {
      valid: true,
      showPassword: false,
      userInfo: {
        email: "",
        password: "",
      },
      ...validations,
    };
  },
  props: ["submitForm", "buttonText", "hasName"],
};
</script>
