<template>
  <v-container>
    <v-card
      ><v-form class="pb-2">
        <v-text-field
          class="mx-4 pa-4"
          id="title"
          autocompete="off"
          v-model="article.title"
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
          v-model="article.content"
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
          @click="editArticle"
          >Modifier mon article
        </v-btn></v-card-actions
      ></v-card
    >
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import validations from "@/utils/validations";

export default {
  data() {
    return {
      ...validations,
    };
  },
  computed: {
    ...mapState(["articles"]),
    article() {
      return this.articles.find((a) => a.id == this.$route.params.id);
    },
  },
  methods: {
    async editArticle() {
      let article = await this.$store.dispatch("editArticle", this.article);
      this.$store.dispatch("setSnackbar", {
        text: `Votre article nommé : "${article.title}" a bien été modifié !`,
      });
      this.$router.push("/feed");
    },
  },
};
</script>
