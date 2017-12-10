<template>
  <div class="preview-wrapper">
    <div
      class="preview-wrapper__content-box"
      v-html="htmlContent"
    ></div>
    <button
      class="preview-wrapper__edit-button"
      @click.prevent="editArticle"
    >
      Edit
    </button>
  </div>
</template>

<script>
import { parseApiMarkdownToHtml } from './../helpers/apiHelpers';

export default {
  data() {
    return {
      htmlContent: '',
    };
  },
  methods: {
    editArticle() {
      this.$store.dispatch('updateContentToPreview', '');
    }
  },
  mounted() {
    // on every mount of this component data is fetched and parsed from markdown to html
    const source = this.$store.getters.getContentToPreview;
    return parseApiMarkdownToHtml(source).then(res => {
      this.htmlContent = res.data;
    });
  }
}
</script>

<style lang="scss">
.preview-wrapper {
  .preview-wrapper__content-box {
    background: $white;
    color: $black;
    display: block;
    margin: $regular-margin auto;
    padding: $regular-padding;
    width: $editor-width;
  }

  .preview-wrapper__edit-button {
    @include button($black, $white, $big-padding, $regular-padding);

    bottom: $big-margin * 3;
    position: fixed;
    right: $big-margin;

    &:hover {
      @include button-hover($red);
    }
  }
}
</style>
