<template>
  <div class="main-wrapper">
    <sidebar />
  </div>
</template>

<script>
import Sidebar from './Sidebar';

export default {
  components: {
    'sidebar': Sidebar,
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
