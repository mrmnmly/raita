<template>
  <div class="editor-writer">
    <metadata-form :metadata="articleContents.metadata" />
    <textarea
      class="editor-writer__textarea"
      v-model="articleContents.markdown"
    >
    </textarea>
  </div>
</template>

<script>
import EditorMetadataForm from './EditorMetadataForm';

export default {
  components: {
    'metadata-form': EditorMetadataForm,
  },
  computed: {
    articleContents() {
      return this.$store.getters.getSelectedArticleContents;
    },
  },
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
</style>
