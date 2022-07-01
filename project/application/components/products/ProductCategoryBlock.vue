<template>
  <div v-if="products && products.length" class="product-category-block">
    <NuxtLink
      :to="localePath({name: 'c-slug-subSlug', params: { slug: categorySlug, subSlug: subcategorySlug}})"
      class="product-category-block__header"
    >
      <div class="product-category-block__line" />
      <div class="product-category-block__title-container">
        <img v-if="subcategoryImage" class="product-category-block__img" :src="subcategoryImage" />
        <h2 class="h5 product-category-block__title">{{ categoryName }}</h2>
      </div>
      <div class="product-category-block__line" />
    </NuxtLink>
    <div class="product-category-block__grid">
      <ProductCard
        v-for="(product, i) in products"
        :key="i"
        :product="product"
        :with-shadow-on-mobile="false"
      />
    </div>
    <NuxtLink
      v-if="products && products.length >= 8"
      :to="localePath({name: 'c-slug-subSlug', params: { slug: categorySlug, subSlug: subcategorySlug}})"
      class="btn btn--secondary product-category-block__btn"
    >
      <span
        class="btn-title"
        v-html="$sanitize($t('common.buttons.view_all'))"
      />
    </NuxtLink>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import ProductCard from '~/components/cards/ProductCard.vue'
import {
  ICategoryPageProduct,
  ICategoryPageSubcategoryForLayout,
} from '~/types/category-page.interface'

@Component({
  components: {
    ProductCard,
  },
})
export default class ComponentProductCategoryBlock extends Vue {
  @Prop({ default: () => [] })
  public subcategory!: ICategoryPageSubcategoryForLayout

  public get categoryName(): string {
    return this.subcategory?.name || ''
  }

  public get categorySlug(): string {
    return this.subcategory?.slug || ''
  }

  public get subcategorySlug(): string {
    return this.subcategory?.subSlug || ''
  }

  public get products(): ICategoryPageProduct[] {
    return this.subcategory?.products || []
  }

  public get subcategoryImage(): string {
    return this.subcategory?.image || ''
  }
}
</script>

<style lang="scss" scoped>
.product-category-block {
  &__header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 88px 0 24px 0;
  }

  &__img {
    width: 56px;
  }

  &__line {
    display: none;
    height: 4px;
    background-color: $color-golden;
    width: 100%;
  }

  &__title-container {
    margin: 0 32px;
    padding: 24px 32px;
    cursor: pointer;
    transition: $transition;
    border-radius: 56px 0;
    display: flex;
    gap: 24px;
    justify-content: center;
    align-items: center;
    background-color: $color-golden-light;
    box-shadow: $shadow-100;

    &:hover {
      background-color: $color-golden-light;
      box-shadow: $shadow-100;
    }
  }

  &__title {
    text-align: center;
    white-space: nowrap;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  &__btn {
    display: flex;
    width: max-content;
    margin: 24px auto 0 auto;
  }
}

@include media-md {
  .product-category-block {
    &__header {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
    }
    &__line {
      display: block;
    }

    &__title-container {
      background-color: transparent;
      box-shadow: none;
    }

    &__grid {
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
    }
  }
}

@include media-lg {
  .product-category-block {
    &__img {
      width: 92px;
    }

    &__grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }
}
</style>
