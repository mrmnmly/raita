import { getApiLists } from './../helpers/apiHelpers';

export default {
  methods: {
    updateSidebarData() {
      // Update sidebar article lists
      getApiLists().then(resp => {
        this.$store.dispatch('updateLists', resp.data);
      }).catch(error => {
        console.error(error);
      });
    }
  },
};
