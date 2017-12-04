<template>
  <div class="main-wrapper">
    <sidebar />
    <editor />
  </div>
</template>

<script>
import Sidebar from './Sidebar';
import Editor from './Editor';
import { getContentsRootUrl } from './../helpers/apiHelpers';

export default {
  components: {
    'sidebar': Sidebar,
    'editor': Editor,
  },
  mounted() {
    /* on start we need to set project's source folder
    path into the store to be accessible for the rest of the app components */
    getContentsRootUrl().then(resp => {
      this.$store.dispatch('setArticleRootPath', resp.data);
    });
  },
};
</script>

<style lang="scss">
.main-wrapper {
  background: $gray-lighter;
  bottom: 0;
  display: block;
  left: 0;
  margin: 0;
  padding: 0;
  position: fixed;
  right: 0;
  top: 0;
  width: 100%;
}
</style>
