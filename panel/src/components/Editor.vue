<template>
  <div :class="editorClasses">
    <writing-view />
    <preview-view />
  </div>
</template>

<script>
import EditorWritingMode from './EditorWritingMode';
import EditorPreviewMode from './EditorPreviewMode';

export default {
  components: {
    'writing-view': EditorWritingMode,
    'preview-view': EditorPreviewMode,
  },
  computed: {
    visibleSidebar() {
      return this.$store.getters.getSidebarVisibilityStatus;
    },
    selectedList() {
      return this.$store.getters.getSelectedList;
    },
    editorClasses() {
      return {
        'editor-wrapper': true,
        'editor-wrapper--wide': !this.selectedList,
        'editor-wrapper--extra-wide': !this.visibleSidebar,
      };
    },
  },
};
</script>

<style lang="scss">
.editor-wrapper {
  bottom: 0;
  display: block;
  height: 100%;
  left: $sidebar-width + $sidebar-entries-width;
  position: fixed;
  right: 0;
  top: 0;
  transition: left 0.5s, width 0.5s;
  width: calc(100% - $sidebar-width + $sidebar-entries-width);

  &.editor-wrapper--wide {
    left: $sidebar-width;
    transition: left 0.5s, width 0.5s;
    width: calc(100% - $sidebar-entries-width);
  }

  &.editor-wrapper--extra-wide {
    left: 0;
    transition: left 0.5s, width 0.5s;
    width: 100%;
  }
}
</style>
