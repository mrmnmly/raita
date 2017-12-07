<template>
  <div
    :class="listItemsClasses"
  >
    <h2 class="article-list-wrapper--header">{{ selectedList }}</h2>
    <ul class="article-list">
      <create-article-button />
      <list-item
        v-for="article in currentList"
        :key="article.file"
        :article="article"
      />
    </ul>
  </div>
</template>

<script>
import SidebarListItemsEntry from './SidebarListItemsEntry';
import CreateArticleButton from './SidebarListCreateArticleButton';

export default {
  components: {
    'list-item': SidebarListItemsEntry,
    'create-article-button':CreateArticleButton,
  },
  computed: {
    sidebarVisibility() {
      return this.$store.getters.getSidebarVisibilityStatus;
    },
    selectedList() {
      return this.$store.getters.getSelectedList;
    },
    listItemsClasses() {
      return {
        'article-list-wrapper': true,
        'article-list-wrapper--visible': this.sidebarVisibility && (this.selectedList !== null),
      };
    },
    lists() {
      return this.$store.getters.getLists;
    },
    currentList() {
      return this.lists[this.selectedList];
    },
  },
};
</script>

<style lang="scss">
.article-list-wrapper {
  @include right-shadow;

  background: $gray-lighter;
  bottom: 0;
  display: block;
  left: -$sidebar-entries-width;
  overflow-x: hidden;
  position: fixed;
  top: 0;
  transition: left 0.95s;
  width: $sidebar-entries-width;
  z-index: $sidebar-list-index;

  &.article-list-wrapper--visible {
    left: $sidebar-width;
    transition: left 0.95s;
  }

  .article-list-wrapper--header {
    @include bottom-shadow;

    font-weight: $font-light;
    margin: 0;
    padding: $medium-padding 0;
    position: relative;
    text-align: center;
    z-index: $sidebar-list-index;
  }
}

.article-list {
  clear: both;
  display: block;
  list-style-type: none;
  margin: 0;
  padding: 0;
  width: 100%;
}
</style>
