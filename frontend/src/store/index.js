import { createStore } from "vuex";

import { API_URL } from "../config";

export default createStore({
  state: {
    products: [],
    config: {
      API_URL,
    },
  },
  mutations: {
    updateProducts(state, { data }) {
      state.products = data;
    },
  },
  actions: {
    async getProducts({ state, commit }) {
      try {
        const response = await fetch(state.config.API_URL + "product").then(
          (response) => response.json()
        );
        commit("updateProducts", response);
      } catch (error) {
        console.log(error);
      }
    },
  },
  modules: {},
});
