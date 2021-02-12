<template>
  <v-container>
    <h1>Articles</h1>
    <v-layout>
      <v-card v-for="article in articles" :key="article.id">
        <router-link :to="{ name: 'one-article', params: { id: article.id } }">
          <v-card-title>
            <h3>{{ article.title }}</h3>
          </v-card-title>
          <v-card-text>
            {{ article.content }}
          </v-card-text>
        </router-link>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
  mounted() {
    this.$store.dispatch("loadArticles");
  },
  computed: {
    articles() {
      return this.$store.state.articles;
    },
  },
};
</script>
