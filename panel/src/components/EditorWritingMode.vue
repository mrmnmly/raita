<template>
  <div
    class="editor-writer"
    v-if="isArticleSelected"
  >
    <metadata-form />
    <textarea
      class="editor-writer__textarea"
      :value="articleContents.markdown"
      @input="updateArticleText"
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
import { saveApiArticle, removeApiFile } from './../helpers/apiHelpers';
import { slugify } from './../helpers/parsingHelpers'

export default {
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
      const articleContents = this.$store.getters.getSelectedArticleContents;
      this.formArticleText = articleContents.markdown;
      return articleContents;
    },
    isArticleSelected() {
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
        saveApiArticle(articleObj);
      });
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
