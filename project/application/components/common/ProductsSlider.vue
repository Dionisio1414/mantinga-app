<template>
  <client-only>
    <swiper
      ref="products_swiper"
      class="products-slider__swiper"
      :options="sliderOptions"
    >
      <swiper-slide v-for="(product, i) in products" :key="i">
        <div
          class="products-slider__product-wrapper"
          data-aos="fade-up"
          :data-aos-delay="(i++).toString() + '50'"
        >
          <ProductCard :product="product" />
        </div>
      </swiper-slide>
    </swiper>
  </client-only>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import ProductCard from '~/components/cards/ProductCard.vue'
import { IProductCard } from '~/types/product.interface'

@Component({
  components: {
    ProductCard,
  },
})
export default class ComponentProductsSlider extends Vue {
  @Prop()
  public products!: IProductCard[]

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
.products-slider {
  max-width: 1200px;
  margin: 0 auto;

  &__product-wrapper {
    height: 100%;
  }

  &__swiper {
    padding: 0 4px;
    .swiper-slide {
      width: 282px;
      padding: 16px 0;
      height: auto;

      &:first-child {
        padding-left: 16px;
        width: 298px;
      }
    }
  }
}

@include media-lg {
  .products-slider {
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
