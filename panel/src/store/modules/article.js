const state = {
  selectedArticle: {},
  selectedArticleContents: {},
  articlesRootPath: '',
  contentToPreview: '',
  articleToRemove: {},
};

const getters = {
  getSelectedArticle(state) {
    return state.selectedArticle;
  },
  getSelectedArticleContents(state) {
    return state.selectedArticleContents;
  },
  getArticleRootPath(state) {
    return state.articlesRootPath;
  },
  getContentToPreview(state) {
    return state.contentToPreview;
  },
  getArticleToRemove(state) {
    return state.articleToRemove;
  }
};

const mutations = {
  selectArticle(state, payload) {
    state.selectedArticle = payload;
  },
  updateSelectedArticleContents(state, payload) {
    state.selectedArticleContents = payload;
  },
  setArticleRootPath(state, payload) {
    state.articlesRootPath = payload;
  },
  updateContentToPreview(state, payload) {
    state.contentToPreview = payload;
  },
  updateArticleToRemove(state, payload) {
    state.articleToRemove = payload;
  }
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
  setArticleRootPath({ commit }, payload) {
    commit('setArticleRootPath', payload);
  },
  updateContentToPreview({ commit }, payload) {
    return new Promise(resolve => {
      commit('updateContentToPreview', payload);
      resolve();
    });
  },
  updateArticleToRemove({ commit }, payload) {
    commit('updateArticleToRemove', payload);
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
