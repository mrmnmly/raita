const state = {
  lists: [],
  selectedList: null,
};

const getters = {
  getLists(state) {
    return state.lists;
  },
  getSelectedList(state) {
    return state.selectedList;
  }
};

const mutations = {
  updateLists(state, payload) {
    state.lists = payload;
  },
  selectList(state, payload) {
    state.selectedList = payload;
  },
};

const actions = {
  updateLists({ commit }, payload) {
    return new Promise((resolve) => {
      commit('updateLists', payload);
      resolve();
    });
  },
  selectList({ commit }, payload) {
    commit('selectList', payload);
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
