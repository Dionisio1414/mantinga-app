<template>
  <div class="recipe-card">
    <div class="recipe-card__img-container">
      <img class="recipe-card__img" :src="require('@/assets/images/recipes/recipe_1.png')" >
      <button class="recipe-card__play-button">
        <div class="recipe-card__icon">
          <svg-icon name="play" width="36" height="36" />
        </div>
      </button>
    </div>
    <div class="recipe-card__content">
      <p
        class="recipe-card__title subtitle truncate truncate--3-lines"
        v-html="$sanitize('Burokėlių, ledededų, imbiero smoothie su grill ananaso griežinėliu')"
      >
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component({})
export default class ComponentRecipeCard extends Vue {}
</script>

<style lang="scss" scoped>
.recipe-card {
  box-shadow: $shadow-100;
  border-radius: 8px;
  width: auto;
  cursor: pointer;

  &__img-container {
    max-height: 259px;
    position: relative;
    overflow: hidden;
  }

  &__img {
    object-fit: cover;
    object-position: center;
    width: 100%;
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
