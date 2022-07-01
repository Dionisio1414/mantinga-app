<template>
  <client-only>
    <swiper
      ref="recipes_swiper"
      class="recipes__swiper"
      :options="sliderOptions"
    >
      <swiper-slide v-for="(recipe, i) in recipes" :key="i">
        <div data-aos="fade-up" :data-aos-delay="(i++).toString() + '50'">
          <RecipeCard :recipe="recipe" />
        </div>
      </swiper-slide>
    </swiper>
  </client-only>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import ProductCard from '~/components/cards/ProductCard.vue'
import RecipeCard from '~/components/cards/RecipeCard.vue'
import { IRecipe } from '~/types/recipes.interface';

@Component({
  components: {
    ProductCard,
    RecipeCard,
  },
})
export default class ComponentProductsSlider extends Vue {
  @Prop()
  public recipes!: IRecipe[];

  public sliderOptions = {
    slidesPerView: 'auto',
    spaceBetween: 16,
    breakpoints: {
      992: {
        allowTouchMove: false,
        slidesPerView: '4',
      },
    },
  }

}
</script>

<style lang="scss" scoped>
.recipes {
  max-width: 1200px;
  margin: 0 auto;

  &__swiper {
    padding: 0 4px;
    .swiper-slide {
      width: 282px;
      padding: 16px 0;

      &:first-child {
        padding-left: 16px;
        width: 298px;
      }
    }
  }
}

@include media-lg {
  .recipes {
    &__swiper {
      .swiper-slide {
        width: auto;

        &:first-child {
          padding-left: 0px;
          width: auto;
        }
      }
    }
  }
}
</style>
