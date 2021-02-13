<template>
  <v-container>
    <v-row>
      <v-col>
        <v-text-field v-model="article.title" label="Titre de votre article">
        </v-text-field>
        <v-text-field
          v-model="article.content"
          label="Contenu de votre article"
        ></v-text-field>
        <v-text-field
          v-model="article.image"
          label="URL de votre image"
        ></v-text-field>
        <v-btn @click="createArticle">Créer l'article</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      article: {},
    };
  },
  methods: {
    createArticle() {
      this.$store.dispatch("createArticle", this.article);
    },
  },
};
</script>
