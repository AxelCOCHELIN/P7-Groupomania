<template>
  <v-container>
    <h2 class="d-flex justify-center">
      Bienvenue sur la page de modération cher Admin
    </h2>
    <v-tabs class="d-flex justify-center">
      <v-tab to="/admin/users">Utilisateurs</v-tab>
      <v-tab to="/admin/articles">Articles</v-tab>
      <v-tab to="/admin/comments">Commentaires</v-tab>
    </v-tabs>
    <router-view></router-view>
  </v-container>
</template>

<script>
export default {};
</script>
