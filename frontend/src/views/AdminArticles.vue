<template>
  <v-container>
    <h1 class="display-3 ma-4 d-flex justify-center">Utilisateurs</h1>
    <v-card
      outlined
      hover
      class="ma-4"
      v-for="article in articles"
      :key="article.id"
    >
      <v-card-title>
        <h3>{{ article.title }}</h3>

        <v-btn
          text
          class="ma-2 d-flex justify-center"
          small
          @click="deleteArticle(article)"
          >Supprimer</v-btn
        >
      </v-card-title>
    </v-card>
  </v-container>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex";
export default {
  name: "AdminArticles",
  components: {},
  computed: {
    ...mapState(["articles"]),
  },
  methods: {
    deleteArticle(article) {
      let response = confirm(
        `Êtes vous sur de vouloir supprimer l'article nommé ${article.title}`
      );
      if (response) {
        this.$store.dispatch("deleteArticle", article);
      }
    },
  },
  mounted() {
    this.$store.dispatch("loadArticles");
  },
};
</script>
