import Vue from "vue";
import Vuex from "vuex";
import Api from "@/services/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    articles: [],
    currentUser: {},
    loginInfo: {
      email: "",
      password: "",
    },
  },
  mutations: {
    SET_ARTICLES(state, articles) {
      state.articles = articles;
    },
    ADD_ARTICLE(state, article) {
      let articles = state.articles.concat(article);
      state.articles = articles;
    },
    LOGOUT_USER(state, loginInfo) {
      state.loginInfo = loginInfo;
      window.sessionStorage.currentUser = JSON.stringify({});
    },
    SET_CURRENT_USER(state, loginInfo) {
      state.loginInfo = loginInfo;
      window.sessionStorage.currentUser = JSON.stringify(loginInfo);
    },
  },
  actions: {
    async loadArticles({ commit }) {
      let response = await Api().get("/articles");
      commit("SET_ARTICLES", response.data);
    },
    async createArticle({ commit }, article) {
      let response = await Api().post("/articles/new", article);
      commit("ADD_ARTICLE", response.data);
    },
    logoutUser({ commit }) {
      commit("LOGOUT_USER");
    },
    async loginUser({ commit }, loginInfo) {
      try {
        let response = await Api().post("/login", loginInfo);
        commit("SET_CURRENT_USER", response.data);
      } catch {
        return (e) => e.reponse.data.error;
      }
    },
  },
  modules: {},
});
