<template>
  <div>
    <div :class="sidebarClasses">
      <h1
        class="sidebar__header"
        title="Click to hide"
        @click="toggleSidebarVisibility"
      >
        ライター
      </h1>
      <sidebar-lists />
    </div>
    <sidebar-list-items
      :listVisibility="sidebarVisibility"
    />
    <p
      :class="showButtonClasses"
      @click="toggleSidebarVisibility"
    >
      Show sidebar
    </p>
  </div>
</template>

<script>
import SidebarLists from './SidebarLists';
import SidebarListItems from './SidebarListItems';

export default {
  components: {
    'sidebar-lists': SidebarLists,
    'sidebar-list-items': SidebarListItems,
  },
  data() {
    return {
      sidebarVisibility: false,
    };
  },
  computed: {
    sidebarClasses() {
      return {
        'sidebar': true,
        'sidebar--hidden': this.sidebarVisibility,
      };
    },
    showButtonClasses() {
      return {
        'sidebar__show-button': true,
        'sidebar__show-button--hidden': !this.sidebarVisibility,
      };
    },
  },
  methods: {
    toggleSidebarVisibility() {
      this.sidebarVisibility = !this.sidebarVisibility;
    },
  }
}
</script>

<style lang="scss">
.sidebar {
  background: $gray-dark;
  bottom: 0;
  display: block;
  left: 0;
  height: 100%;
  width: $sidebar-width;
  overflow-x: hidden;
  overflow-y: scroll;
  position: fixed;
  top: 0;
  transition: left 0.5s;
  z-index: $sidebar-index;
}

.sidebar--hidden {
  left: -$sidebar-width;
  transition: left 1s;
}

.sidebar__header {
  color: $white;
  cursor: pointer;
  float: left;
  text-align: center;
  width: 100%;
}

.sidebar__show-button {
  color: $gray-dark;
  cursor: pointer;
  display: block;
  font-size: $small-font;
  left: $regular-margin;
  position: fixed;
  top: $small-margin;
  transition: left 1s;

  &:hover {
    color: $red;
    text-decoration: underline;
  }

  &.sidebar__show-button--hidden {
    left: -$sidebar-width;
    transition: left 1s;
  }
}
</style>
