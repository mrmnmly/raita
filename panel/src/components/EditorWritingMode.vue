<template>
  <div
    class="editor-writer"
    v-if="isArticleSelected"
  >
    <metadata-form />
    <textarea
      class="editor-writer__textarea"
      v-model="formArticleText"
      @input="updateArticleText"
      @drop="appendImage"
    >
    </textarea>
    <button
      class="editor-writer__save-button"
      title="Click to save changes"
      @click="updateArticle"
    >
      Save
    </button>
  </div>
</template>

<script>
import EditorMetadataForm from './EditorMetadataForm';
import { saveApiArticle, removeApiFile, uploadApiImage } from './../helpers/apiHelpers';
import { slugify } from './../helpers/parsingHelpers'
import updateSidebarDataMixin from './../mixins/updateSidebarDataMixin';

export default {
  mixins: [ updateSidebarDataMixin ],
  data() {
    return {
      formArticleText: '',
    };
  },
  components: {
    'metadata-form': EditorMetadataForm,
  },
  computed: {
    selectedArticle() {
      return this.$store.getters.getSelectedArticle;
    },
    articleContents() {
      return this.$store.getters.getSelectedArticleContents;
    },
    isArticleSelected() {
      this.formArticleText = this.$store.getters.getSelectedArticleContents.markdown;
      return Object.keys(this.selectedArticle).length;
    }
  },
  methods: {
    updateArticleText(e) {
      this.formArticleText = e.currentTarget.value;
    },
    updateArticle(e) {
      e.preventDefault();
      removeApiFile(this.selectedArticle.path).then(() => {
        // All these variables are necessary to update file name (because it contains date and title slug)
        const articleContents = this.$store.getters.getSelectedArticleContents;
        const selectedArticle = this.$store.getters.getSelectedArticle;
        const rootUrl = this.$store.getters.getArticleRootPath;
        const fileFolder = selectedArticle.folder;
        const slug = slugify(articleContents.metadata.title);
        const newUrl = `${rootUrl}${fileFolder}/${articleContents.metadata.date}-${slug}.md`;
        const articleObj = {
          content: this.formArticleText,
          url: newUrl,
          customFields: {
            title: articleContents.metadata.title,
            date: articleContents.metadata.date || '',
            tags: articleContents.metadata.tags || '',
          },
        };
        saveApiArticle(articleObj).then(() => {
          const newSelectedArticle = {
              file: `${articleContents.metadata.date}-${slug}.md`,
              folder: fileFolder,
              path: newUrl,
              slug: `${articleContents.metadata.date}-${slug}`,
              type: 'list-item',
            };
          // Method available thanks to fetchingDataMixin
          this.updateSidebarData(newSelectedArticle);
        });
      });
    },
    appendImage(e) {
      e.preventDefault();
      const files = e.target.files || e.dataTransfer.files;
      let promises = [];
      if (files && files.length > 0) {
        for (let file of files){
          promises.push(uploadApiImage(file));
        };
        Promise.all(promises).then(respArr => {
          respArr.map(respImg => {
            this.formArticleText += respImg.data;
          });
        });
      }
    }
  }
};
</script>

<style lang="scss">
.editor-writer__textarea {
  border: none;
  display: block;
  font-size: $editor-font-size;
  height: 80vh;
  line-height: 1.5em;
  margin: $big-margin auto;
  padding: $regular-padding;
  resize: none;
  width: $editor-width;
}

.editor-writer__save-button {
  background-color: $black;
  border: none;
  bottom: $big-margin;
  color: $white;
  cursor: pointer;
  padding: $regular-padding $big-padding;
  position: fixed;
  right: $big-margin;
  transition: background-color 0.35s;

  &:hover {
    background-color: $red;
    transition: background-color 0.35s;
  }
}
</style>
