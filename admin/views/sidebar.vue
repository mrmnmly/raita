<template>
  <div>
    {{ lists }}
  </div>
</template>

<script>
  import {getSiteContents} from './../../api/contentHelpers';

  export default {
    data() {
      return {
        lists: {}
      }
    },
    created() {
      this.getSidebarData();
    },
    methods: {
      getSidebarData() {
        getSiteContents().then(data => {
          this.lists = data;
        });
      }
    }
  }
</script>

<style lang="css">

</style>