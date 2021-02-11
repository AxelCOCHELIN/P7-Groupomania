import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
    userId: 0,
    isLoggedIn: false,
  },

  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],

  getters: {},

  mutations: {
    // users
    SET_TOKEN(state, token) {
      state.token = token;
      if (token) {
        state.isLoggedIn = true;
      } else {
        state.isLoggedIn = false;
      }
    },
    SET_USER(state, userId) {
      state.userId = userId;
    },
  },

  actions: {
    //users
    setToken({ commit }, token) {
      commit("SET_TOKEN", token);
    },
    setUser({ commit }, userId) {
      commit("SET_USER", userId);
    },
  },
  modules: {},
});
