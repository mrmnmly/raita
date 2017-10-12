<template>
  <div>
    {{ lists }}
  </div>
</template>

<script>

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
        // axios.get('http://locahost:3000/list-contents/').then(data => {
        //   this.lists = data;
        // });
      }
    }
  }
</script>

<style lang="css">

</style>