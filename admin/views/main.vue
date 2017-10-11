<template>
  <div>
    <h1>Hello world!</h1>
    <p>Welcome to {{title}}</p>
    <app-sidebar></app-sidebar>
  </div>
</template>

<script>
  import Sidebar from './sidebar.vue';

  export default {
    data() {
      return {
        title: 'Admin panel'
      }
    },
    components: {
      appSidebar: Sidebar
    }
  }
</script>

<style lang="css">

</style>