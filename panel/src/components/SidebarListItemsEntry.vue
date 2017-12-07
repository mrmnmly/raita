<template>
  <li
    :key="article.file"
    :class="getClassForListEntry(article.path)"
    title="Click to edit this article"
    @click="selectArticle(article)"
  >
    {{ article.slug }}
    <span
      class="article-list__article-item-remove-button"
      @click="(e) => showRemovePopup(e, article)"
      title="Click to remove this article"
    >
      x
    </span>
  </li>
</template>

<script>
import moment from 'moment';
import { getApiArticleContents } from './../helpers/apiHelpers';

export default {
  props: {
    article: {
      type: Object,
      default() {
        return {
          slug: '',
          file: '',
          path: '',
        };
      },
    },
  },
  computed: {
    selectedList() {
      return this.$store.getters.getSelectedList;
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
    getClassForListEntry(articlePath) {
      return {
        'article-list__article-item': true,
        'article-list__article-item--selected': articlePath === this.selectedArticle.path,
      };
    },
    selectArticle(article) {
      // when selecting or deselecting article we need to empty the preview contents to always show editor in edit mode
      this.$store.dispatch('updateContentToPreview', '');
      if (article.path === this.selectedArticle.path) {
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
    showRemovePopup(e, article) {
      e.stopPropagation();
      this.$store.dispatch('updateArticleToRemove', article);
      this.$store.dispatch('showPopup', 'removePopup');
    },
  },
};
</script>

<style lang="scss">
.article-list {
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

    .article-list__article-item-remove-button {
      display: none;
      float: right;
      margin-top: -$small-margin;
      padding: $small-padding;

      &:hover {
        background-color: $red;
        color: $white;
      }
    }

    &:hover .article-list__article-item-remove-button {
      display: inline;
    }
  }
}
</style>
