import Vue from 'vue';
import Vuex from 'vuex';

import article from './modules/article';
import lists from './modules/lists';
import pages from './modules/pages';
import popup from './modules/popup';
import sidebar from './modules/sidebar';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    article,
    lists,
    pages,
    popup,
    sidebar,
  },
});