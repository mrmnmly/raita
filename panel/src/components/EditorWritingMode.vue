<template>
  <div class="editor-writer">
    <metadata-form :metadata="articleContents.metadata" />
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
import { saveApiArticle } from './../helpers/apiHelpers';

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
  },
  methods: {
    updateArticleText(e) {
      this.formArticleText = e.currentTarget.value;
    },
    updateArticle(e) {
      e.preventDefault();
      const articleObj = {
        content: this.formArticleText,
        url: this.selectedArticle.path,
        customFields: this.articleContents.metadata,
      };
      console.log(articleObj);
      saveApiArticle(articleObj).then(() => this.$store.dispatch('updateSelectedArticleContents', this.articleContents));
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
