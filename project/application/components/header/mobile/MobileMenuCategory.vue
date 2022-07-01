<template>
  <div class="mobile-menu-categories">
    <NuxtLink class="mobile-menu-categories__item" :to="localePath({name: 'c-slug', params: {slug: category && category.slug}})">
      <div class="mobile-menu-categories__img-container">
        <img
          v-if="category.image && category.image.length"
          :src="category.image[0] && category.image[0].absolute_path"
          class="mobile-menu-categories__img"
        />
      </div>
      <span class="body-text1 body-text1--bold">
        {{ category.name }}
      </span>
      <svg-icon
        class="mobile-menu-categories__arrow"
        name="chevron-right"
        height="24"
        width="24"
      />
    </NuxtLink>
    <div class="mobile-menu-categories__links">
      <NuxtLink
        v-for="(subcategory, i) in category.children"
        :key="i"
        class="mobile-menu-categories__link body-text1"
        :to="localePath({ name: 'c-slug-subSlug', params: { slug: category.slug, subSlug: subcategory.slug }})"
      >
        {{ subcategory.name }}
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import { ITaxon } from '~/types/taxons'

@Component({})
export default class ComponentMobileMenuCategory extends Vue {
  @Prop()
  public category!: ITaxon
}
</script>

<style lang="scss" scoped>
.mobile-menu-categories {
  &__item {
    display: flex;
    width: 100%;
    padding: 12px 16px;
    cursor: pointer;
    text-decoration: none;
    color: $color-primary-dark;
  }

  &__arrow {
    margin-left: auto;
  }

  &__links {
    display: flex;
    flex-direction: column;
  }

  &__link {
    padding: 12px 16px 12px 56px;
    text-decoration: none;
    color: $color-primary-light;
  }

  &__img-container {
    width: 24px;
    height: auto;
    overflow: hidden;
    margin-right: 16px;
  }

  &__img {
    object-fit: contain;
    width: 100%;
    height: auto;
  }
}
</style>
