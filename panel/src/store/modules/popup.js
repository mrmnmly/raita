const state = {
  popupVisibility: {
    removePopup: false,
  },
};

const getters = {
  getPopupState(state) {
    return state.popupVisibility;
  },
};

const mutations = {
  showPopup(state, payload) {
    state.popupVisibility[payload] = true;
  },
  closePopup(state, payload) {
    state.popupVisibility[payload] = false;
  },
  togglePopup(state) {
    state.popupVisibility[payload] = !state.popupVisibility[payload];
  },
};

const actions = {
  showPopup({ commit }, payload) {
    commit('showPopup', payload);
  },
  closePopup({ commit }, payload) {
    commit('closePopup', payload);
  },
  togglePopup({ commit }, payload) {
    commit('togglePopup', payload);
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
