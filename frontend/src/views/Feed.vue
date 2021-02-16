<template>
  <v-container class="home">
    <h1 class="display-1 ma-4 d-flex justify-center">
      Le mur géant est ici pour accueillir vos articles!
    </h1>

    <div>
      <div class="text-center mb-4">
        <v-btn rounded color="deep-orange lighten-3" @click="post = !post">
          Écrire un nouvel article
        </v-btn>
      </div>
      <v-alert :value="post" transition="scale-transition">
        <v-card class="ma-4" :value="post">
          <v-card-title>
            <h3>Que voulez-vous dire, {{ currentUser.username }}?</h3>
          </v-card-title>
          <v-form class="pb-2">
            <v-text-field
              class="mx-4 pa-4"
              id="title"
              autocompete="off"
              v-model="newArticle.title"
              label="Le titre de votre article"
              :rules="[
                required('title'),
                minLength('title', 2),
                maxLength('title', 160),
              ]"
              counter="true"
            ></v-text-field>
            <v-divider></v-divider>
            <v-textarea
              class="mx-4 pa-4"
              id="content"
              autocomplete="off"
              v-model="newArticle.content"
              label="Le contenu de votre article"
              :rules="[
                required('content'),
                minLength('content', 4),
                maxLength('content', 8000),
              ]"
              counter="true"
            >
            </v-textarea>
          </v-form>
          <v-card-actions class="d-flex justify-center"
            ><v-btn
              text
              rounded
              outlined
              color="deep-orange"
              class="ma-2"
              @click="createArticle"
              >Poster mon article
            </v-btn></v-card-actions
          >
        </v-card>
      </v-alert>
    </div>

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
import validations from "@/utils/validations";
import { mapState } from "vuex";

export default {
  name: "Feed",
  components: {},
  data() {
    return {
      newArticle: { title: "", content: "" },
      post: true,
      ...validations,
    };
  },
  methods: {
    createArticle() {
      this.$store.dispatch("createArticle", this.newArticle);
    },
  },
  computed: {
    articles() {
      return this.$store.state.articles;
    },
    ...mapState(["currentUser"]),
  },
};
</script>
