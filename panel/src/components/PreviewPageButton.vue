<template>
  <button
    class="sidebar__preview-button"
    title="Preview compiled page"
    @click.prevent="compileAndPreview"
  >
    Preview compiled page
  </button>
</template>

<script>
import { compileApiContents } from './../helpers/apiHelpers';
export default {
  methods: {
    compileAndPreview() {
      compileApiContents().then(() => {
        document.location.href = '/public';
      });
    }
  }
}
</script>

<style lang="scss">
.sidebar__preview-button {
  @include button($gray, $white, $big-padding, $regular-padding);

  display: block;
  margin: $regular-margin auto;

  &:hover {
    @include button-hover($red);

    color: $white;
  }
}

</style>
