<template>
  <div class="main-wrapper">
    <sidebar />
    <editor />
  </div>
</template>

<script>
import Sidebar from './Sidebar';
import Editor from './Editor';

export default {
  components: {
    'sidebar': Sidebar,
    'editor': Editor,
  },
};
</script>

<style lang="scss">
.main-wrapper {
  background: $gray-lighter;
  bottom: 0;
  display: block;
  left: 0;
  margin: 0;
  padding: 0;
  position: fixed;
  right: 0;
  top: 0;
  width: 100%;
}
</style>
