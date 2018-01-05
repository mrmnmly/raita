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
      placeholder="Start writing here.."
    >
    </textarea>
    <button
      class="editor-writer__preview-toggle-button"
      v-if="formArticleText.length > 0"
      @click.prevent="previewArticle"
    >
      Preview
    </button>
    <save-button :article-text="formArticleText" />
  </div>
</template>

<script>
// TODO: when clicking preview on unsaved article, when going back to edit mode it loads the saved document and all the edits are gone :/
import EditorMetadataForm from './EditorMetadataForm';
import EditorSaveButton from './EditorSaveButton';
import { uploadApiImage } from './../helpers/apiHelpers';

export default {
  data() {
    return {
      formArticleText: '',
    };
  },
  components: {
    'metadata-form': EditorMetadataForm,
    'save-button': EditorSaveButton,
  },
  computed: {
    selectedArticle() {
      return this.$store.getters.getSelectedArticle;
    },
    selectedArticleContents() {
      return this.$store.getters.getSelectedArticleContents;
    },
    isArticleSelected() {
      this.formArticleText = this.selectedArticleContents.markdown;
      return Object.keys(this.selectedArticle).length;
    },
  },
  methods: {
    updateArticleText(e) {
      this.formArticleText = e.currentTarget.value;
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
    },
    previewArticle() {
      this.$store.dispatch('updateContentToPreview', this.formArticleText);
    },
  }
};
</script>

<style lang="scss">
.editor-writer__textarea {
  border: none;
  display: block;
  font-size: $editor-font-size;
  height: 70vh;
  line-height: 1.5em;
  margin: $big-margin auto;
  padding: $regular-padding;
  resize: none;
  width: $editor-width;
}

.editor-writer__preview-toggle-button {
  @include button($black, $white, $big-padding, $regular-padding);

  bottom: $big-margin * 3;
  position: fixed;
  right: $big-margin;

  &:hover {
    @include button-hover($red);
  }
}
</style>
