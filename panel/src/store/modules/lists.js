const state = {
  lists: [],
};

const getters = {
  getLists(state) {
    return state.lists;
  },
};

const mutations = {
  updateLists(state, payload) {
    state.lists = payload;
  },
};

const actions = {
  updateLists({ commit }, payload) {
    return new Promise((resolve) => {
      commit('updateLists', payload);
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
