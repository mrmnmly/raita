<template>
  <div
    :class="listItemsClasses"
  >
    <ul>
      <li
        v-for="article in currentList"
        :key="article.file"
      >
        {{ article.slug }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    listVisibility: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    listItemsClasses() {
      return {
        'list-items': true,
        'list-items--visible': !this.listVisibility && (this.selectedList !== null),
      };
    },
    selectedList() {
      return this.$store.getters.getSelectedList;
    },
    lists() {
      return this.$store.getters.getLists;
    },
    currentList() {
      return this.lists[this.selectedList];
    }
  },
}
</script>

<style lang="scss">
.list-items {
  @include right-shadow;

  background: $gray-lighter;
  bottom: 0;
  display: block;
  left: -$sidebar-entries-width;
  position: fixed;
  top: 0;
  transition: left 0.95s;
  width: $sidebar-entries-width;
  z-index: $sidebar-list-index;

  &.list-items--visible {
    left: $sidebar-width;
    transition: left 0.95s;
  }
}
</style>
