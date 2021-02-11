<template>
  <v-container>
    <Articles />
  </v-container>
</template>

<script>
import Articles from "@/components/Articles.vue";
// @ is an alias to /src

export default {
  name: "Articles",
  components: {
    Articles,
  },
};
</script>
