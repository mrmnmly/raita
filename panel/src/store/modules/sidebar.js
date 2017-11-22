const state = {
  sidebarVisibility: true,
};

const getters = {
  getSidebarVisibilityStatus(state) {
    return state.sidebarVisibility;
  },
};

const mutations = {
  updateSidebarVisibilityStatus(state, payload) {
    state.sidebarVisibility = payload;
  },
};

const actions = {
  updateSidebarVisibilityStatus({ commit }, payload) {
    commit('updateSidebarVisibilityStatus', payload);
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
