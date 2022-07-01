<template>
  <div class="recipe-card">
    <div class="recipe-card__img-container">
      <img class="recipe-card__img" :src="image" />
      <button class="recipe-card__play-button">
        <div class="recipe-card__icon">
          <svg-icon name="play" width="36" height="36" />
        </div>
      </button>
    </div>
    <div class="recipe-card__content">
      <p
        :title="name"
        class="recipe-card__title subtitle truncate truncate--3-lines"
        v-html="$sanitize(name)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import { IRecipe } from '~/types/recipes.interface'

@Component({})
export default class ComponentProductCard extends Vue {
  @Prop()
  public recipe!: IRecipe

  public $i18n: any

  public get locale(): string {
    return this.$i18n.locale || 'lt'
  }

  public get name(): string {
    return this.recipe?.translations[this.locale]?.name || ''
  }

  public get image(): string {
    return this.recipe?.images[0] || ''
  }
}
</script>

<style lang="scss" scoped>
.recipe-card {
  box-shadow: $shadow-100;
  border-radius: 8px;
  width: auto;
  cursor: pointer;
  overflow: hidden;

  &__img-container {
    height: 259px;
    position: relative;
    overflow: hidden;
  }

  &__img {
    object-fit: cover;
    object-position: center;
    width: 100%;
    height: 100%;
  }

  &__play-button {
    position: absolute;
    display: flex;
    bottom: 16px;
    left: 16px;
  }

  &__icon {
    border-radius: 50%;
    height: 48px;
    width: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $color-golden-light;
    color: $color-golden;
  }

  &__content {
    padding: 16px 24px;
    min-height: 130px;
  }
}

@include media-lg {
  .recipe-card {
    transition: 200ms;

    &:hover {
      box-shadow: $shadow-200;
    }
  }
}
</style>
