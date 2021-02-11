<template>
  <v-container>
    <v-container>
      <v-layout row justify-center>
        <v-flex xs12 md6 lg4>
          <v-card flat class="text-center" color="deep-orange lighten-4">
            <v-card-text class="text-center headline text-uppercase">
              Rejoignez le groupe
            </v-card-text>
            <v-card-text>
              <v-form class="px-3">
                <v-text-field
                  label="email"
                  v-model="email"
                  type="text"
                  :rules="emailRules"
                  required
                  class="pt-3"
                >
                </v-text-field>
                <v-text-field
                  label="mot de passe"
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  :rules="passwordRules"
                  required
                  class="pt-3"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword = !showPassword"
                >
                </v-text-field>
                <v-text-field
                  label="pseudo"
                  v-model="username"
                  type="text"
                  :rules="usernameRules"
                  required
                  class="pt-3"
                >
                </v-text-field>
              </v-form>
            </v-card-text>
            <v-card-text
              class="text-left subheadings"
              v-if="email === '' && password === '' && username === ''"
            >
              Pour vous inscrire vous devez renseigner votre email, votre mot de
              passe et votre pseudo. <br />
              <br />
              Si vous avez déjà un compte merci seul votre email et mot de passe
              suffisent
            </v-card-text>
            <v-card-actions center
              ><v-btn
                type="submit"
                @click.prevent="saveUser"
                v-if="email !== '' && password !== '' && username !== ''"
                >S'inscrire</v-btn
              >
              <v-btn
                type="submit"
                @click.prevent="logUser"
                v-if="email !== '' && password !== ''"
                >Se connecter</v-btn
              ></v-card-actions
            >
            <br />
            <v-alert type="success" v-if="successSignup">{{
              successSignup
            }}</v-alert>
            <v-alert type="error" v-if="errorSignup">{{ errorSignup }}</v-alert>
            <v-alert type="success" v-if="successLogin">{{
              successLogin
            }}</v-alert>
            <v-alert type="error" v-if="errorLogin">{{ errorLogin }}</v-alert>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Signup",

  data() {
    return {
      email: "",
      password: "",
      showPassword: false,
      username: "",
      successSignup: "",
      errorSignup: "",
      successLogin: "",
      errorLogin: "",
      emailRules: [
        (v) => !!v || "L'adresse mail est requise",
        (v) =>
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || "l'adresse mail doit être valide",
      ],
      passwordRules: [
        (v) => !!v || "Le mot de passe est requis",
        (v) =>
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/.test(v) ||
          "le mot de passe doit contenir entre 8 et 20 caractères et au moins un chiffre et une majuscule",
      ],
      usernameRules: [
        (v) => !!v || "le pseudo est requis",
        (v) =>
          (v && v.length > 2) ||
          "le pseudo doit comprendre au moins 3 caractères",
        (v) =>
          (v && v.length < 20) || "Le pseudo doit avoir moins de 20 caractères",
      ],
    };
  },

  methods: {
    saveUser() {
      axios
        .post("http://localhost:8080/api/users/signup", {
          email: this.email,
          password: this.password,
          username: this.username,
        })
        .then(() => {
          this.successSignup = "Vous faites partie du groupe désormais";
          this.errorSignup = "";
        })
        .catch((e) => {
          this.errorSignup = e.response.data.error;
          this.succesSignup = "";
        });
    },
    logUser() {
      axios
        .post("http://localhost:8080/api/users/login", {
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          this.successLogin = "Bienvenue dans l'application";
          this.errorLogin = "";
          this.$store.dispatch("setToken", res.data.token);
          this.$store.dispatch("setUser", res.data.userId);
          setTimeout(() => {
            this.$router.push("/Feed");
          }, 1500);
        })
        .catch((e) => {
          this.errorLogin = e.response.data.error;
          this.successLogin = "";
        });
    },
  },
};
</script>
