import { getApiLists, getApiArticleContents } from './../helpers/apiHelpers';

export default {
  methods: {
    updateSidebarData(newSelectedArticle) {
      // Update sidebar article lists
      return getApiLists().then(newList => {
        this.$store.dispatch('updateLists', newList.data);
        // get updated file contents
        getApiArticleContents(newSelectedArticle).then(resp => {
          // update all necessary vuex stores
          this.$store.dispatch('updateSelectedArticleContents', resp.data).then(() => {
            return this.$store.dispatch('selectArticle', newSelectedArticle);
          });
        });
      }).catch(error => {
        console.error(error);
      });
    }
  },
};
