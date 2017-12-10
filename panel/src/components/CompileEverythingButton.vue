<template>
  <button
    class="sidebar__compile-button"
    title="Compile contents"
    @click.prevent="compileEverything"
  >
    Compile
  </button>
</template>

<script>
import { compileApiContents } from './../helpers/apiHelpers';
export default {
  methods: {
    compileEverything() {
      compileApiContents();
    }
  }
}
</script>

<style lang="scss">
.sidebar__compile-button {
  @include button($gray, $white, $big-padding, $regular-padding);

  display: block;
  margin: $regular-margin auto;

  &:hover {
    @include button-hover($red);

    color: $white;
  }
}

</style>
