<template>
  <v-container>
    <h1>S'enregistrer</h1>
    <UserAuthForm
      :submitForm="registerUser"
      buttonText="S'enregistrer"
      hasName="true"
    />
  </v-container>
</template>
<script>
import UserAuthForm from "@/components/UserAuthForm";

export default {
  components: {
    UserAuthForm,
  },

  methods: {
    async registerUser(registrationInfo) {
      let user = await this.$store.dispatch("registerUser", registrationInfo);
      if (user.error) {
        alert(user.error);
      } else {
        alert("Bienvenue dans le groupe ");
        this.$router.push("/login");
      }
    },
  },
};
</script>
