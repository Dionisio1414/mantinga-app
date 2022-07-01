<template>
  <NuxtLink
    class="header-cart-button btn btn--golden"
    :class="{'header-cart-button--disabled': !countProducts}"
    :to="localePath({ name: 'wishlist' })"
  >
    <svg-icon
      class="header-cart-button__icon"
      name="favourite-filled"
      height="24"
      width="24"
    />
    <span v-if="countProducts" class="header-cart-button__quantity overline">
      {{ countProducts }}
    </span>
  </NuxtLink>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Getter } from 'nuxt-property-decorator'

@Component({})
export default class ComponentHeaderLogo extends Vue {
  @Getter('favourite-products/favouriteProducts')
  public favouriteProducts!: number[]

  public get countProducts(): number {
    return this.favouriteProducts.length
  }
}
</script>

<style lang="scss" scoped>
.header-cart-button {
  position: relative;
  color: $color-golden;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  width: 48px;
  border: none;
  padding: 12px;

  &--disabled {
    pointer-events: none;
  }

  &__icon {
    margin-right: 0;
  }

  &__quantity {
    position: absolute;
    top: -1px;
    right: -1px;
    font-family: 'Avenir';
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $color-secondary;
    color: $color-white;
    border-radius: 50%;
    height: 16px;
    width: 16px;
    text-decoration: none;
  }
}

@include media-lg {
  .header-cart-button {
    border: 1px solid $color-golden;
    margin-left: 32px;
  }
}
</style>
