<template>
  <div>
    <p class="popup__question">Are you sure to remove {{ articleToRemove.slug }}?</p>
    <button
      class="popup__button"
      @click.prevent="removeArticle"
    >
      Yes
    </button>
    <button
      class="popup__button"
      @click.prevent="dismissPopup"
    >
      No
    </button>
  </div>
</template>

<script>
import updateSidebarDataMixin from './../mixins/updateSidebarDataMixin';
import { removeApiFile } from './../helpers/apiHelpers';

export default {
  mixins: [ updateSidebarDataMixin ],
  computed: {
    articleToRemove() {
      return this.$store.getters.getArticleToRemove;
    },
    selectedArticle() {
      return this.$store.getters.getSelectedArticle;
    }
  },
  methods: {
    dismissPopup() {
      this.$store.dispatch('updateArticleToRemove', {});
      this.$store.dispatch('closePopup', 'removePopup');
    },
    removeArticle() {
      removeApiFile(this.articleToRemove.path).then(() => {
        let articleToSelect = {};
        if (this.selectedArticle.path !== this.articleToRemove.path) {
          articleToSelect = this.selectedArticle;
        }
        // method from imported updateSidebarDataMixin
        this.updateSidebarData(articleToSelect).then(() => {
          this.dismissPopup();
        });
      });
    },
  }
};
</script>

<style lang="scss">
.popup__question {
  margin-bottom: $big-margin;
  padding: 0 $regular-padding;
}

.popup__button {
  @include button($black, $white, $big-padding, $regular-padding);

  &:hover {
    @include button-hover($red);
  }
}
</style>
