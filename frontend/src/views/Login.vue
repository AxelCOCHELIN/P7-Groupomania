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
        this.$store.dispatch("setSnackbar", {
          color: "error",
          text: user.error,
        });
      } else {
        this.$store.dispatch("setSnackbar", {
          text: "Félicitation " + user.username + ", vous êtes connecté!",
        });
        this.$router.push("/feed");
      }
    },
  },
};
</script>
