const state = {
  selectedArticle: {},
  selectedArticleContents: {},
};

const getters = {
  getSelectedArticle(state) {
    return state.selectedArticle;
  },
  getSelectedArticleContents(state) {
    return state.selectedArticleContents;
  },
};

const mutations = {
  selectArticle(state, payload) {
    state.selectedArticle = payload;
  },
  updateSelectedArticleContents(state, payload) {
    state.selectedArticleContents = payload;
  },
};

const actions = {
  selectArticle({ commit }, payload) {
    return new Promise(resolve => {
      commit('selectArticle', payload);
      resolve();
    });
  },
  updateSelectedArticleContents({ commit }, payload) {
    return new Promise(resolve => {
      commit('updateSelectedArticleContents', payload);
      resolve();
    });
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
