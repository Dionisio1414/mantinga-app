<template>
  <div class="wishlist-footer">
    <div
      v-for="i in 4"
      :key="i"
      :class="{ 'body-text2--bold': i === 1 }"
      class="wishlist-footer__text body-text2"
      v-html="$sanitize($t(`page_wishlist.footer.text_${i}`))"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'
import WishlistProduct from '~/components/wishlist/WishlistProduct.vue'

@Component({
  components: {
    WishlistProduct,
  },
})
export default class ComponentWishlistFooter extends Vue {}
</script>

<style lang="scss" scoped>
.wishlist-footer {
  padding: 0 16px;

  &__text {
    text-align: center;
    color: $color-primary-light;

    &:not(:last-child) {
      margin-bottom: 16px;
    }
  }
}

@include media-lg {
  .wishlist-footer {
    display: flex;
    gap: 16px;
    align-items: center;
    justify-content: center;
    margin-top: 14px;

    &__text {
      &:not(:last-child) {
        margin-bottom: 0px;
      }
    }
  }
}
</style>
