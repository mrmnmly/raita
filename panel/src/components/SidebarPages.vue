<template>
  <div class="sidebar-pages">
    <h2 class="sidebar-pages__header">Pages:</h2>
    <ul class="sidebar-pages__entries">
      <page-entry
        v-for="page in pageList"
        :key="page.name"
        :page="page"
      />
    </ul>
  </div>
</template>

<script>
import SidebarPagesEntry from './SidebarPagesEntry';
import { getApiPages } from './../helpers/apiHelpers';

export default {
  components: {
    'page-entry': SidebarPagesEntry,
  },
  computed: {
    pages() {
      return this.$store.getters.getPages || {};
    },
    pageList() {
      const list = [];
      Object.keys(this.pages).map(obj => {
        // we will add page name to page object
        const helperObj = {
          ...this.pages[obj],
          name: obj,
        };
        list.push(helperObj);
      });
      return list;
    },
  },
  methods: {
    getPages() {
      return getApiPages().then(resp => {
        return this.$store.dispatch('updatePages', resp.data);
      }).catch(error => {
        console.error(error);
      });
    },
  },
  created() {
    this.getPages().then(() => {
      this.$forceUpdate();
    });
  },
}
</script>

<style lang="scss">
.sidebar-pages__header {
  @include bottom-shadow;

  background: $gray;
  color: $white;
  display: block;
  float: left;
  font-size: $h2-size;
  font-weight: $font-regular;
  margin-bottom: 0;
  padding: $regular-padding 0;
  position: relative;
  text-align: center;
  width: 100%;
  z-index: $sidebar-index;
}

.sidebar-pages__entries {
  display: block;
  float: left;
  height: 25vh;
  list-style-type: none;
  margin: 0;
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 0 $regular-padding 0 0;
  width: 100%;
}

.sidebar-pages__single-entry {
  clear: both;
  color: $white;
  cursor: pointer;
  display: block;
  float: left;
  margin: 0;
  padding: $regular-padding $big-padding;
  width: 100%;

  &:hover {
    background: $gray-light;
    color: $white;
  }

  &.sidebar-pages__single-entry--selected {
    color: $red;
  }
}
</style>
