<template>
  <div class="main-wrapper">
    <sidebar />
    <editor v-if="selectedArticle" />
    <popup-wrapper
      v-if="removePopupVisibility"
      :window-name="removePopupWindowName"
      :popup-name="removePopupName"
      :show-window="removePopupVisibility"
      :closeable="false"
    >
      <remove-popup v-if="removePopupVisibility" />
    </popup-wrapper>
  </div>
</template>

<script>
import Sidebar from './Sidebar';
import Editor from './Editor';
import Popup from './Popup';
import RemovePopupForm from './PopupRemoveArticleForm';
import { getContentsRootUrl } from './../helpers/apiHelpers';

export default {
  components: {
    'sidebar': Sidebar,
    'editor': Editor,
    'popup-wrapper': Popup,
    'remove-popup': RemovePopupForm,
  },
  data() {
    return {
      removePopupWindowName: 'Delete article?',
      removePopupName: 'removePopup',
    };
  },
  computed: {
    selectedArticle() {
      return Object.keys(this.$store.getters.getSelectedArticle).length;
    },
    popupState() {
      return this.$store.getters.getPopupState;
    },
    removePopupVisibility() {
      return this.popupState.removePopup;
    },
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
