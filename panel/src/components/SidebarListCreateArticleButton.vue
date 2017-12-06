<template>
  <li
    class="article-list__article-item"
    @click="addNewArticle"
  >
    Add new article
  </li>
</template>

<script>
import moment from 'moment';
import { saveApiArticle } from './../helpers/apiHelpers';
import updateSidebarDataMixin from './../mixins/updateSidebarDataMixin';

export default {
  mixins: [ updateSidebarDataMixin ],
  computed: {
    selectedList() {
      return this.$store.getters.getSelectedList;
    },
  },
  methods: {
    addNewArticle(e) {
      e.preventDefault();
      const date = moment().format('YYYY-MM-DD');
      const slug = `${date}-new-article`;
      const rootUrl = this.$store.getters.getArticleRootPath;
      const path = `${rootUrl}${this.selectedList}/${slug}.md`;
      const newArticleObj = {
        content: '',
        url: path,
        customFields: {
          title: 'New Article',
          date: date,
          tags: '',
        },
      };
      saveApiArticle(newArticleObj).then(() => {
        const newSelectedArticle = {
          file: `${slug}.md`,
          folder: this.selectedList,
          path: path,
          slug: slug,
          type: 'list-item',
        };
        // Method available thanks to fetchingDataMixin
        this.updateSidebarData(newSelectedArticle);
      });
    },
  },
}
</script>

<style lang="scss">
.article-list__article-item {
  .article-list__article-item-remove-button {
    display: none;
  }

  &:hover .article-list__article-item-remove-button {
    display: inline;
    float: right;
  }
}
</style>
