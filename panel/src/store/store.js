import Vue from 'vue';
import Vuex from 'vuex';

import sidebar from './modules/sidebar';
import lists from './modules/lists';
import article from './modules/article';
import popup from './modules/popup';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    sidebar,
    lists,
    article,
    popup,
  },
});