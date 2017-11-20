<template>
  <div class="sidebar-list">
    <h2 class="sidebar-list__header">Lists:</h2>
    <ul class="sidebar-list__entries">
      <li
        class="sidebar-list__single-entry"
        v-for="list in listNames"
        :key="list"
      >
        {{ list }}
      </li>
    </ul>
  </div>
</template>

<script>
import config from './../config.json';

export default {
  computed: {
    lists() {
      return this.$store.getters.getLists || {};
    },
    listNames() {
      const listNames = [];
      Object.keys(this.lists).map(obj => {
        listNames.push(obj);
      });
      return listNames;
    },
  },
  methods: {
    getLists() {
      return fetch(`${config.api.domain}${config.api.endpoints.getLists}`).then(resp => {
        if (resp.ok) {
          return resp.json();
        }
      }).then(data => {
        console.log(data);
        return this.$store.dispatch('updateLists', data);
      }).catch(error => {
        console.error(error);
      });
    }
  },
  created() {
    this.getLists().then(() => {
      console.log('im here')
      this.$forceUpdate();
    });
  },
}
</script>

<style lang="scss">
.sidebar-list__header {
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

.sidebar-list__entries {
  display: block;
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.sidebar-list__single-entry {
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
}
</style>
