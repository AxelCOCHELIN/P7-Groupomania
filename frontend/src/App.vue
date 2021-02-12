<template>
  <v-app>
    <router-link to="/">home</router-link> |
    <router-link to="/about">about</router-link>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    //
  }),
};
</script>
