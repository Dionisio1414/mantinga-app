<template>
  <div class="mobile-menu-categories">
    <div
      v-for="(category, i) in categories"
      :key="i"
      class="mobile-menu-categories__item"
      @click="selectCategory(category)"
    >
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
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import { ITaxon } from '~/types/taxons'

@Component({})
export default class ComponentMobileMenuCategories extends Vue {
  @Prop({ default: () => [] })
  public categories!: ITaxon[]

  public selectCategory(category: ITaxon): void {
    this.$emit('select-category', category)
  }
}
</script>

<style lang="scss" scoped>
.mobile-menu-categories {
  &__item {
    display: flex;
    width: 100%;
    padding: 12px 16px;
    cursor: pointer;
    color: $color-primary-dark;
  }

  &__arrow {
    margin-left: auto;
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
  }
}
</style>
