<template>
  <div id="app">
    <main-wrapper />
  </div>
</template>

<script>
import MainWrapper from './components/MainWrapper';

export default {
  name: 'app',
  components: {
    'main-wrapper': MainWrapper,
  },
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
}
</style>
