<template>
  <ul class="metadata-form">
    <li class="metadata-form__entry">
      <input
        class="metadata-form__input"
        type="text"
        placeholder="Title"
        :value="metaTitle"
        @change="(e) => updateArticleMeta(e, 'title')"
      />
    </li>
    <li class="metadata-form__entry">
      <input
        class="metadata-form__input"
        type="text"
        placeholder="Date"
        :value="metaDate"
        @change="(e) => updateArticleMeta(e, 'date')"
      />
    </li>
    <li class="metadata-form__entry">
      <input
        class="metadata-form__input"
        type="text"
        placeholder="Tags"
        :value="metaTags"
        @change="(e) => updateArticleMeta(e, 'tags')"
      />
    </li>
  </ul>
</template>

<script>
export default {
  computed: {
    articleData() {
      return this.$store.getters.getSelectedArticleContents;
    },
    metaTitle() {
      return this.articleData.metadata && this.articleData.metadata.title
      ? this.articleData.metadata.title : '';
    },
    metaDate() {
      return this.articleData.metadata && this.articleData.metadata.date
      ? this.articleData.metadata.date : '';
    },
    metaTags() {
      return this.articleData.metadata && this.articleData.metadata.tags
      ? this.articleData.metadata.tags : '';
    },
  },
  methods: {
    updateArticleMeta(e, metaKey) {
      const metaHelper = {...this.articleData};
      metaHelper.metadata[metaKey] = e.currentTarget.value;
      this.$store.dispatch('updateSelectedArticleContents', metaHelper);
    }
  }
};
</script>

<style lang="scss">
.metadata-form {
  display: block;
  list-style-type: none;
  margin: $regular-margin auto;
  padding: 0;
  width: $editor-width;

  .metadata-form__entry {
    display: block;
    width: 100%;
  }

  .metadata-form__input {
    @include input-border($white-darker);

    background: transparent;
    margin: $regular-margin 0;
    padding: $small-padding $regular-padding;
    transition: border 0.5s;
    width: 25%;

    &:focus {
      @include input-border($red);

      transition: border 0.5s;
    }
  }
}
</style>
