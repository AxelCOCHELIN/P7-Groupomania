<template>
  <v-container>
    <h2>Vous avez choisi l'article suivant :</h2>
    <v-card class="ma-4 pa-4"
      ><h3>{{ article.title }}</h3>
      <br />
      {{ article.content }}
      <v-btn>Modifier</v-btn>
      <v-btn>Supprimer</v-btn>
    </v-card>
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
