<template>
  <div class="latest-products">
    <div class="latest-products__wrapper">
      <h2 class="latest-products__title h4" v-html="$sanitize(titleValue)" />
      <h2
        class="latest-products__title--mobile h5"
        v-html="$sanitize(titleValue)"
      />
      <ProductsSlider :products="products" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import ProductCard from '~/components/cards/ProductCard.vue'
import ProductsSlider from '~/components/common/ProductsSlider.vue'

import { IContentTypeLatestProductProperties } from '~/types/content-type-latest-products.interface'
import { IProductCard } from '~/types/product.interface'

@Component({
  components: {
    ProductCard,
    ProductsSlider,
  },
})
export default class ComponentLatestProducts extends Vue {
  @Prop()
  public properties!: IContentTypeLatestProductProperties

  public get titleValue(): string {
    return this.properties?.title?.value || ''
  }

  public get products(): IProductCard[] {
    return this.properties?.products?.value || []
  }
}
</script>

<style lang="scss" scoped>
.latest-products {
  max-width: 1200px;
  margin: 0 auto;

  &__title {
    display: none;

    &--mobile {
      padding-bottom: 16px;
      text-align: center;
    }
  }
}

@include media-lg {
  .latest-products {
    &__title {
      display: block;
      padding-bottom: 16px;
      text-align: center;

      &--mobile {
        display: none;
      }
    }
  }
}
</style>
