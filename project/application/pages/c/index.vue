<template>
  <div class="page__wrapper">
    <div class="page__container">
      <div class="products-page">
        <h2
          class="products-page__title products-page__title--desktop h4"
          v-html="$sanitize($t('products_page.all_products'))"
        />
        <h2
          class="products-page__title products-page__title--mobile h5"
          v-html="$sanitize($t('products_page.all_products'))"
        />
        <div
          class="products-page__categories products-page__categories--desktop"
        >
          <ProductCategories :categories="allCategories" />
        </div>
        <div
          class="products-page__categories products-page__categories--mobile"
        >
          <ProductCategoriesMobile :categories="allCategories" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Getter } from 'nuxt-property-decorator'
import ProductCategories from '~/components/products/ProductCategories.vue'
import ProductCategoriesMobile from '~/components/products/ProductCategoriesMobile.vue'
import { ITaxon } from '~/types/taxons'
import { EStatus } from '~/constants/status'

@Component({
  components: {
    ProductCategories,
    ProductCategoriesMobile,
  },
  scrollToTop: true
})
export default class PageProductsIndex extends Vue {
  @Getter('categories-list/allCategories')
  public allCategories!: ITaxon[]
  
  public async asyncData({ store, error }: any) {
    try {
      await store.dispatch('categories-list/fetchCategories')

      const status: EStatus = store.getters['categories-list/status']

      if (status === EStatus.ERROR) {
        const err: any = store.getters['categories-list/error']
        throw err
      }
    } catch (err) {
      error(err)
    }
  }
}
</script>

<style lang="scss" scoped>
.products-page {
  &__title {
    text-align: center;
    color: $color-primary-dark;

    &--desktop {
      display: none;
    }
  }

  &__categories {
    margin-top: 48px;

    &--desktop {
      display: none;
    }

    &--mobile {
      margin-top: 32px;
    }
  }
}

@include media-lg {
  .products-page {
    &__title {
      &--desktop {
        display: block;
      }

      &--mobile {
        display: none;
      }
    }

    &__categories {
      &--desktop {
        display: block;
      }

      &--mobile {
        display: none;
      }
    }
  }
}
</style>
