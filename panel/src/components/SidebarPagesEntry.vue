<template>
  <li
    :key="page.name"
    :class="getPageClasses(page.path)"
    @click="selectPage(page)"
  >
    {{ page.name }}
  </li>
</template>

<script>
import { getApiPages, getApiPageContents } from './../helpers/apiHelpers';

export default {
  props: {
    page: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    selectedPage() {
      return this.$store.getters.getSelectedPage || {};
    },
    selectedArticle() {
      return this.$store.getters.getSelectedArticle;
    }
  },
  methods: {
    getPages() {
      return getApiPages().then(resp => {
        return this.$store.dispatch('updatePages', resp.data);
      }).catch(error => {
        console.error(error);
      });
    },
    getPageClasses(pagePath) {
      return {
        'sidebar-list__single-entry': true,
        'sidebar-list__single-entry--selected': pagePath === this.selectedArticle.path,
      };
    },
    selectPage(page) {
      // when selecting or deselecting article we need to empty the preview contents to always show editor in edit mode
      // page is the same kind as article
      this.$store.dispatch('updateContentToPreview', '');
      // hide list menu if it was selected
      this.$store.dispatch('selectList', null);
      if (page.path === this.selectedArticle.path) {
        this.$store.dispatch('selectArticle', {}).then(() => {
          this.$store.dispatch('updateSelectedArticleContents', {});
        });
      } else {
        this.$store.dispatch('selectArticle', page).then(() => {
          getApiPageContents(page).then(resp => {
            return this.$store.dispatch('updateSelectedArticleContents', resp.data);
          }).catch(error => {
            console.error(error);
          });
        });
      }
    },
  },
  created() {
    this.getPages().then(() => {
      this.$forceUpdate();
    });
  },
}
</script>

<style lang="scss">
.sidebar-pages__header {
  @include bottom-shadow;

  background: $gray;
  color: $white;
  display: block;
  float: left;
  font-size: $h2-size;
  font-weight: $font-regular;
  margin-bottom: 0;
  padding: $regular-padding 0;
  position: relative;
  text-align: center;
  width: 100%;
  z-index: $sidebar-index;
}

.sidebar-pages__entries {
  display: block;
  float: left;
  height: 25vh;
  list-style-type: none;
  margin: 0;
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 0 $regular-padding 0 0;
  width: 100%;
}

.sidebar-pages__single-entry {
  clear: both;
  color: $white;
  cursor: pointer;
  display: block;
  float: left;
  margin: 0;
  padding: $regular-padding $big-padding;
  width: 100%;

  &:hover {
    background: $gray-light;
    color: $white;
  }

  &.sidebar-pages__single-entry--selected {
    color: $red;
  }
}
</style>
