<template>
  <div class="products-recipes">
    <div class="products-recipes__wrapper">
      <h2 class="products-recipes__title h4" v-html="$sanitize('Receptai')" />
      <h2
        class="products-recipes__title--mobile h5"
        v-html="$sanitize('Receptai')"
      />
      <RecipesSlider :recipes="recipes" />
      <button v-if="recipes && recipes.length > 4" class="btn btn--secondary products-recipes__btn">
        <span
          class="btn-title"
          v-html="$sanitize($t('common.buttons.view_all'))"
        />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import ProductCard from '~/components/cards/ProductCard.vue'
import RecipesSlider from '~/components/common/RecipesSlider.vue'
import { IRecipe } from '~/types/recipes.interface'

@Component({
  components: {
    ProductCard,
    RecipesSlider,
  },
})
export default class ComponentProductsRecipes extends Vue {
  @Prop()
  public recipes!: IRecipe[]
}
</script>

<style lang="scss" scoped>
.products-recipes {
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

  &__btn {
    margin: 32px auto 0 auto;
  }
}

@include media-lg {
  .products-recipes {
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
