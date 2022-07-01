<template>
  <div
    v-if="isShow"
    v-masonry="'container_id-2'"
    :fit-width="true"
    :horizontal-order="true"
    item-selector=".product-categories__block"
    class="product-categories__body"
    gutter="0"
  >
    <div
      v-for="(category, i) in categories"
      :key="i"
      v-masonry-tile
      class="product-categories__block"
    >
      <div class="product-categories__img-container">
        <img
          v-if="category.image && category.image.length"
          :src="category.image[0] && category.image[0].absolute_path"
          class="product-categories__img"
        />
      </div>
      <div class="product-categories__list">
        <NuxtLink
          :to="localePath({name: 'c-slug', params: { slug: category.slug }})"
          class="product-categories__header h6"
        >
          {{ category.name }}
        </NuxtLink>
        <NuxtLink
          v-for="(subcategory) in category.children"
          :key="subcategory.id"
          :to="localePath({name: 'c-slug-subSlug', params: { slug: category.slug, subSlug: subcategory.slug }})"
          class="product-categories__item body-text1"
        >
          {{ subcategory.name }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Getter, Prop, Watch } from 'nuxt-property-decorator'
import { ITaxon } from '~/types/taxons'

@Component({})
export default class ComponentProductCategories extends Vue {
  @Prop({ default: () => [] })
  public categories!: ITaxon[]

  @Getter('header/isShowProductsCategories')
  public isShowCategories!: boolean

  @Watch('isShowCategories')
  public handleCategories(value: boolean): void {
    if (!value) this.redraw()
  }

  public isShow: boolean = true

  public redraw(): void {
    this.isShow = false

    this.$nextTick(() => {
      this.isShow = true
    })
  }
}
</script>

<style lang="scss" scoped>
@include media-lg {
  .product-categories {
    &__block {
      display: grid;
      grid-template-columns: 48px 1fr;
      width: 300px;
      margin-bottom: 48px;
    }

    &__icon {
      color: $color-golden;
    }

    &__list {
      display: flex;
      flex-direction: column;
      margin-left: 16px;
    }

    &__header {
      margin-bottom: 16px;
      color: $color-primary-dark;
    }

    &__item {
      color: $color-primary-dark;
      cursor: pointer;

      &:not(:last-child) {
        margin-bottom: 16px;
      }
    }

    &__img-container {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      width: 48px;
      height: auto;
      overflow: hidden;
    }

    &__img {
      object-fit: contain;
      width: 100%;
      max-height: 48px;
    }
  }
}
</style>
