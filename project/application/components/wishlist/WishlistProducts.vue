<template>
  <div class="wishlist-products">
    <div class="wishlist-products__header">
      <div
        v-html="
          $sanitize($t('page_wishlist.wishlist_count', { n: products.length }))
        "
      />
      <button
        v-if="products.length"
        class="btn btn--transparent-with-border"
        type="button"
        @click="generatePdf"
      >
        <span
          class="btn-title"
          v-html="$sanitize($t('page_wishlist.generate_presentation'))"
        />
      </button>
    </div>
    <div v-if="products && products.length" class="wishlist-products__list">
      <WishlistProduct
        v-for="product in products"
        :key="product && product.id"
        :product="product"
        @deleteProduct="deleteProduct(product && product.id)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import WishlistProduct from '~/components/wishlist/WishlistProduct.vue'
import { IManagerProduct } from '~/types/manager-products.interface'

@Component({
  components: {
    WishlistProduct,
  },
})
export default class ComponentWishlistProducts extends Vue {
  @Prop({ default: () => [] })
  public products!: IManagerProduct[]

  public deleteProduct(productId: number): void {
    this.$emit('deleteProduct', productId)
  }

  public generatePdf(): void {
    this.$emit('generatePdf')
  }
}
</script>

<style lang="scss" scoped>
.wishlist-products {
  padding: 15px 16px 16px;
  background-color: $color-primary-100;
  max-height: 680px;
  overflow: auto;

  &__header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 40px;
    margin-bottom: 16px;
  }
}

@include media-lg {
  .wishlist-products {
    padding: 16px 24px;
    border-radius: 8px;

    &__header {
      justify-content: space-between;
    }
  }
}
</style>
