<template>
  <ul class="metadata-form">
    <li
      class="metadata-form__entry"
      v-for="(item, key, index) in metadataFields"
      :key="`${key}-${index}`"
    >
      <input
        class="metadata-form__input"
        type="text"
        :placeholder="key"
        :value="item"
        @input="(e) => emitUpdatedMeta(e, key)"
      />
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    metadata: {
      type: Object,
      default() {
        return {
          title: '',
          date: '',
          tags: '',
        };
      },
    },
  },
  data() {
    return {
      metadataFields: {
        title: '',
        date: '',
        tags: '',
      },
    };
  },
  computed: {
    metadataHelper() {
      const fieldsObj = {
        title: this.metadata.title,
        date: this.metadata.date,
        tags: this.metadata.tags,
      };
      this.title = fieldsObj.title;
      this.date = fieldsObj.date;
      this.tags = fieldsObj.tags;
      return fieldsObj;
    },
  },
  methods: {
    emitUpdatedMeta(e, metaKey) {
      this.metadataFields[metaKey] = e.currentTarget.value;
      this.$emit('meta-updated', metaKey, this.metadataFields[metaKey]);
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

    &:focus {
      @include input-border($red);

      transition: border 0.5s;
    }
  }
}
</style>
