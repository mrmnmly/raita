<template>
  <button
    class="editor-writer__save-button"
    title="Click to save changes"
    @click.prevent="saveDocument"
  >
    Save
  </button>
</template>

<script>
import { saveApiArticle, removeApiFile } from './../helpers/apiHelpers';
import { slugify } from './../helpers/parsingHelpers'
import updateSidebarDataMixin from './../mixins/updateSidebarDataMixin';

export default {
  mixins: [ updateSidebarDataMixin ],
  props: {
    articleText: {
      type: String,
      default: ''
    },
  },
  computed: {
    selectedArticle() {
      return this.$store.getters.getSelectedArticle;
    },
    selectedArticleContents() {
      return this.$store.getters.getSelectedArticleContents;
    }
  },
  methods: {
    updatePage() {
      const pageObj = {
        content: this.articleText,
        url: this.selectedArticle.path,
        customFields: {
          title: this.selectedArticleContents.metadata.title,
          date: this.selectedArticleContents.metadata.date || '',
          tags: this.selectedArticleContents.metadata.tags || '',
        },
      }
      saveApiArticle(pageObj);
    },
    updateArticle() {
      removeApiFile(this.selectedArticle.path).then(() => {
        // All these variables are necessary to update file name (because it contains date and title slug)
        const rootUrl = this.$store.getters.getArticleRootPath;
        const fileFolder = this.selectedArticle.folder;
        const slug = slugify(this.selectedArticleContents.metadata.title);
        const newUrl = `${rootUrl}${fileFolder}/${this.selectedArticleContents.metadata.date}-${slug}.md`;
        const articleObj = {
          content: this.articleText,
          url: newUrl,
          customFields: {
            title: this.selectedArticleContents.metadata.title,
            date: this.selectedArticleContents.metadata.date || '',
            tags: this.selectedArticleContents.metadata.tags || '',
          },
        };
        saveApiArticle(articleObj).then(() => {
          const newSelectedArticle = {
            file: `${this.selectedArticleContents.metadata.date}-${slug}.md`,
            folder: fileFolder,
            path: newUrl,
            slug: `${this.selectedArticleContents.metadata.date}-${slug}`,
            type: 'list-item',
          };
          // Method available thanks to updateSidebarDataMixin
          this.updateSidebarData(newSelectedArticle);
        });
      });
    },
    saveDocument() {
      if (this.selectedArticle.type === 'page') {
        this.updatePage();
      } else {
        this.updateArticle();
      }
    },
  }
};
</script>

<style lang="scss">
.editor-writer__save-button{
  @include black-button($black, $white, $big-padding, $regular-padding);

  bottom: $big-margin;
  position: fixed;
  right: $big-margin;

  &:hover {
    @include black-button-hover($red);
  }
}
</style>
