<template>
  <div
    class="popup"
    v-if="showWindow">
    <div class="popup__window">
      <div class="popup__title-bar">
        <h2 class="popup__window-name">{{ windowName }}</h2>
        <span
          class="popup__close-icon"
          @click="closePopup(popupName)"
          v-if="closeable"
        >
          x
        </span>
      </div>
      <div class="popup__content-wrapper">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      windowName: {
        type: String,
        default: 'Default window',
      },
      popupName: {
        type: String,
        default: 'defaultWindow',
      },
      closeable: {
        type: Boolean,
        default: true,
      },
      showWindow: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      closePopup(popupName) {
        this.$store.dispatch('closePopup', this.popupName);
      }
    },
  };
</script>

<style lang="scss">
  .popup {
    align-items: center;
    background: rgba(0,0,0,0.25);
    bottom: 0;
    display: flex;
    justify-content: center;
    left: 0;
    position: fixed;
    right: 0;
    text-align: center;
    top: 0;
    z-index: $popup-z-index;
  }

  .popup__window {
    background: $white;
    border-radius: $small-border-radius;
    box-shadow: $standard-shadow;
    min-width: 250px;
    padding: 0;
  }

  .popup__title-bar {
    border-bottom: 1px solid $gray-lighter;
    display: block;
    font-weight: $font-regular;
    padding: $regular-padding;
  }

  .popup__window-name {
    cursor: default;
    display: inline;
    font-weight: $font-regular;
    line-height: 1em;
    margin: 0;
  }

  .popup__close-icon {
    background: $white;
    color: $gray-light;
    cursor: pointer;
    display: inline;
    float: right;
  }

  .popup__content-wrapper {
    min-height: 50px;
    padding: $regular-padding;
  }
</style>