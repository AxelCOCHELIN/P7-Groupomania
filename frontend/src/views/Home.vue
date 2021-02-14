<template>
  <v-container class="home">
    <h1 class="display-3 ma-4 d-flex justify-center">Articles</h1>
    <v-card
      outlined
      hover
      class="ma-4"
      v-for="article in articles"
      :key="article.title"
      :to="{ name: 'one-article', params: { id: article.id } }"
    >
      <v-card-title>
        <h3>{{ article.title }}</h3>
      </v-card-title>
      <v-card-text>
        {{ article.content }}
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
  computed: {
    articles() {
      return this.$store.state.articles;
    },
  },
};
</script>
