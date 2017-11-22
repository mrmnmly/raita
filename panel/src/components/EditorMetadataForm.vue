<template>
  <div>
    {{ metadata }}
  </div>
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
        };
      },
    },
  },
};
</script>

<style lang="scss">

</style>
