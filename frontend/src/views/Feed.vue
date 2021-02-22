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
    >
      <v-card-title>
        <h3>
          {{ article.title }}
          <span class="font-italic subtitle-1"
            >écrit par {{ article.User.username }}</span
          >
        </h3>
      </v-card-title>
      <v-card-text>
        {{ article.content }}
      </v-card-text>

      <v-card-actions>
        <v-row align="center" justify="end">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                fab
                plain
                small
                aria-label="commenter l'article"
                v-bind="attrs"
                v-on="on"
                ><v-icon>mdi-comment</v-icon></v-btn
              ></template
            ><span dark color="black">Commenter</span></v-tooltip
          >
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                fab
                plain
                small
                aria-label="modifier l'article"
                v-bind="attrs"
                v-on="on"
                @click="edit = !edit"
                ><v-icon>mdi-content-save-edit</v-icon></v-btn
              ></template
            ><span dark color="black">Modifier</span></v-tooltip
          >
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                fab
                plain
                small
                aria-label="Supprimer l'article"
                v-bind="attrs"
                v-on="on"
                @click="deleteArticle(article)"
                ><v-icon>mdi-delete</v-icon></v-btn
              ></template
            ><span dark color="black">Supprimer</span></v-tooltip
          >
        </v-row></v-card-actions
      >
      <v-alert :value="edit" transition="scale-transition">
        <v-card class="ma-4" :value="edit">
          <v-form class="pb-2">
            <v-text-field
              class="mx-4 pa-4"
              id="title"
              v-model="article.title"
              autocompete="off"
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
              v-model="article.content"
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
              @click="editArticle"
              >Éditer mon article
            </v-btn></v-card-actions
          >
        </v-card>
      </v-alert>
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
      newArticle: {},
      post: false,
      edit: false,
      ...validations,
    };
  },
  computed: {
    articles() {
      return this.$store.state.articles;
    },
    ...mapState(["currentUser"]),
  },
  methods: {
    async createArticle() {
      await this.$store.dispatch("createArticle", this.newArticle);
    },
    editArticle() {
      let currentUser = JSON.parse(window.localStorage.currentUser);
      let article = this.$store.state.articles.find((a) => a.id);
      let response = confirm(
        `Êtes vous sur de vouloir modifier l'article nommé ${article.title}`
      );
      if (response) {
        if (article.UserId == currentUser.userId) {
          this.$store.dispatch("editArticle", article);
        } else {
          alert("Vous n'êtes pas autoriser à modifier cet article");
        }
      }
    },
    deleteArticle(article) {
      let currentUser = JSON.parse(window.localStorage.currentUser);
      let response = confirm(
        `Êtes vous sur de vouloir supprimer l'article nommé ${article.title}`
      );
      if (response) {
        if (article.UserId == currentUser.userId) {
          this.$store.dispatch("deleteArticle", article);
        } else {
          alert("Vous n'êtes pas autoriser à supprimer cet article");
        }
      }
    },
  },
};
</script>
