<template>
  <div class="similar-products">
    <div class="similar-products__wrapper">
      <h2
        class="similar-products__title h4"
        v-html="$sanitize('Panašūs produktai')"
      />
      <h2
        class="similar-products__title--mobile h5"
        v-html="$sanitize('Panašūs produktai')"
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
import { IProductCard } from '~/types/product.interface'

@Component({
  components: {
    ProductCard,
    ProductsSlider,
  },
})
export default class ComponentSimilarProducts extends Vue {
  @Prop()
  public products!: IProductCard[]
}
</script>

<style lang="scss" scoped>
.similar-products {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;

  &__title {
    display: none;

    &--mobile {
      padding-bottom: 16px;
      text-align: center;
    }
  }
}

@include media-lg {
  .similar-products {
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
