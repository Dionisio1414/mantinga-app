<template>
  <div class="wishlist-product">
    <div class="wishlist-product__img-container">
      <img
        class="wishlist-product__img"
        :src="productImage"
      />
    </div>
    <div class="wishlist-product__name body-text1">
      {{ productName }}
    </div>
    <button
      class="wishlist-product__cross"
      type="button"
      @click="deleteProduct"
    >
      <svg-icon name="close" width="24" height="24" />
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import { IManagerProduct } from '~/types/manager-products.interface';

@Component({})
export default class ComponentWishlistProduct extends Vue {
  @Prop()
  public product!: IManagerProduct;
  
  public deleteProduct(): void {
    this.$emit('deleteProduct')
  }

  public get locale(): string {
    return this.$i18n.locale;
  }

  public get productImage(): string {
    return this.product.image || ''
  }

  public get productName(): string {
    return this.product.name || ''
  }
}
</script>

<style lang="scss" scoped>
.wishlist-product {
  padding: 0 16px 0 8px;
  display: grid;
  grid-template-columns: 96px auto 24px;
  align-items: center;
  gap: 16px;
  box-shadow: $shadow-100;
  border-radius: 8px;
  background-color: white;

  &:not(:last-child) {
    margin-bottom: 8px;
  }

  &__img-container {
    overflow: hidden;
    width: 96px;
    height: 96px;
  }

  &__img {
    object-fit: cover;
    object-position: center;
    width: 100%;
    height: 100%;
  }

  &__name {
    max-width: 166px;
  }

  &__cross {
    align-self: flex-start;
    padding-top: 16px;
  }
}

@include media-lg {
  .wishlist-product {
    padding: 0 16px;
    grid-template-columns: 120px auto 24px;

    &:not(:last-child) {
      margin-bottom: 16px;
    }

    &__img-container {
      width: 120px;
      height: 120px;
    }

    &__name {
      max-width: 100%;
    }
  }
}
</style>
