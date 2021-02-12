import Vue from "vue";
import Vuex from "vuex";
import Api from "@/services/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    articles: [],
  },
  mutations: {
    SET_ARTICLES(state, articles) {
      state.articles = articles;
    },
  },
  actions: {
    async loadArticles({ commit }) {
      let response = await Api().get("/articles");
      commit("SET_ARTICLES", response.data);
    },
  },
  modules: {},
});
