const state = {
  pages: {},
  selectedPage: {},
};

const getters = {
  getPages(state) {
    return state.pages;
  },
  getSelectedPage(state) {
    return state.selectedPage;
  }
};

const mutations = {
  updatePages(state, payload) {
    state.pages = payload;
  },
  selectPage(state, payload) {
    state.selectedPage = payload;
  },
};

const actions = {
  updatePages({ commit }, payload) {
    return new Promise((resolve) => {
      commit('updatePages', payload);
      resolve();
    });
  },
  selectPage({ commit }, payload) {
    commit('selectPage', payload);
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
