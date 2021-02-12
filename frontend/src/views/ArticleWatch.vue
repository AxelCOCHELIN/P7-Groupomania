<template>
  <v-container
    ><h1>one article</h1>
    <h3>{{ article.title }}</h3>
    <br />
    {{ article.content }}
  </v-container>
</template>

<script>
export default {
  computed: {
    article() {
      return this.$store.state.articles.find(
        (article) => article.id == this.$route.params.id
      );
    },
  },
};
</script>
