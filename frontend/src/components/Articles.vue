<template>
  <v-card></v-card>
</template>

<script>
import axios from "axios";

export default {
  name: "Articles",

  mounted() {
    axios
      .get("http://localhost:8080/api/articles")
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  },
};
</script>
