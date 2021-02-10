<template>
  <div id="signup">
    <input
      type="email"
      name="email"
      id="email"
      placeholder="votre email"
      v-model="userEmail"
    />
    <input
      type="password"
      name="password"
      id="password"
      placeholder="votre password"
      v-model="userPassword"
    />

    <input
      type="text"
      name="username"
      id="username"
      placeholder="votre pseudo"
      v-model="userPseudo"
    />

    <button class="sub-button" @click.prevent="saveUser">S'inscrire</button>
    <button class="log-button" @click.prevent="logUser">Se connecter</button>
    <div v-if="saveUser">{{ messages }}</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Signup",

  data() {
    return {
      userEmail: "",
      userPassword: "",
      userPseudo: "",
      messages: [],
    };
  },

  methods: {
    saveUser() {
      axios
        .post("http://localhost:8080/api/users/signup", {
          email: this.userEmail,
          password: this.userPassword,
          username: this.userPseudo,
        })
        .then(() => this.messages.push("Votre compte a bien été créé"))
        .catch((err) => console.log(err));
    },
    logUser() {
      axios
        .post("http://localhost:8080/api/users/login", {
          email: this.userEmail,
          password: this.userPassword,
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    },
  },
};
</script>
