<template>
  <div
    :class="listItemsClasses"
  >
    <h2 class="article-list-wrapper--header">{{ selectedList }}</h2>
    <ul class="article-list">
      <li
        v-for="article in currentList"
        :key="article.file"
        :class="getClassForArticle(article.slug)"
        title="Click to edit this article"
        @click="selectArticle(article)"
      >
        {{ article.slug }}
      </li>
    </ul>
  </div>
</template>

<script>
import { getApiArticleContents } from './../helpers/apiHelpers.js';

export default {
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
    selectedArticle() {
      return this.$store.getters.getSelectedArticle;
    },
  },
  methods: {
    getClassForArticle(articleSlug) {
      return {
        'article-list__article-item': true,
        'article-list__article-item--selected': articleSlug === this.selectedArticle.slug,
      };
    },
    selectArticle(article) {
      if (article.slug === this.selectedArticle.slug) {
        this.$store.dispatch('selectArticle', {}).then(() => {
          this.$store.dispatch('updateSelectedArticleContents', {});
        });
      } else {
        this.$store.dispatch('selectArticle', article).then(() => {
          getApiArticleContents(article).then(resp => {
            return this.$store.dispatch('updateSelectedArticleContents', resp.data);
          }).catch(error => {
            console.error(error);
          });
        });
      }
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

  .article-list__article-item {
    border-bottom: 1px solid $white-darker;
    cursor: pointer;
    display: block;
    margin: 0;
    padding: $medium-padding;

    &:hover {
      background-color: $white-dark;
      color: $red;
    }

    &.article-list__article-item--selected {
      color: $red;
    }
  }
}
</style>
