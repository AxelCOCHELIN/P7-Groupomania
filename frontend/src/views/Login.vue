<template>
  <v-container>
    <h1>Se connecter</h1>
    <UserAuthForm :submitForm="loginUser" buttonText="Se connecter" />
  </v-container>
</template>
<script>
import UserAuthForm from "@/components/UserAuthForm";

export default {
  components: {
    UserAuthForm,
  },

  methods: {
    async loginUser(userInfo) {
      let user = await this.$store.dispatch("loginUser", userInfo);
      if (user.error) {
        alert(user.error);
      } else {
        alert("Félicitation " + user.username + ", vous êtes connecté!");
        this.$router.push("/feed");
      }
    },
  },
};
</script>
