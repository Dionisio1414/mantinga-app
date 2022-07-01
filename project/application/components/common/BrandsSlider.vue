<template>
  <div class="brands-slider">
    <h2
      class="brands-slider__heading brands-slider__heading--desktop h4"
      v-html="$sanitize(titleValue)"
    />
    <h2
      class="brands-slider__heading brands-slider__heading--mobile h5"
      v-html="$sanitize(titleValue)"
    />

    <div class="brands-slider__swiper-container">
      <client-only>
        <swiper
          ref="brands_swiper"
          class="brands-slider__swiper"
          :options="sliderOptions"
        >
          <swiper-slide v-for="(brand, i) in brandList" :key="i">
            <BrandCard :src="brand.images[0].path" />
          </swiper-slide>
        </swiper>
      </client-only>
      <template v-if="brandList.length > slidesPerViewDesktop">
        <div class="swiper-button-prev">
          <svg-icon
            class="swiper__icon"
            name="chevron-left"
            width="24"
            height="24"
          />
        </div>
        <div class="swiper-button-next">
          <svg-icon
            class="swiper__icon"
            name="chevron-right"
            width="24"
            height="24"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import BrandCard from '~/components/cards/BrandCard.vue'

import {
  IBrandProperties,
  IContentTypeBrandsProperties,
} from '~/types/content-type-brands.interface'

@Component({
  components: {
    BrandCard,
  },
})
export default class ComponentBrandsSlider extends Vue {
  @Prop()
  public properties!: IContentTypeBrandsProperties

  public slidesPerViewDesktop: number = 4

  public sliderOptions = {
    slidesPerView: 'auto',
    spaceBetween: 16,
    slideToClickedSlide: true,
    breakpoints: {
      992: {
        allowTouchMove: true,
        slidesPerView: this.slidesPerViewDesktop,
        spaceBetween: 0,
      },
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  }

  public get brandList(): IBrandProperties[] {
    return this.properties?.brands.value
  }

  public get titleValue(): string {
    return this.properties?.title?.value || ''
  }
}
</script>

<style lang="scss" scoped>
.brands-slider {
  max-width: 1200px;
  margin: 0px auto;

  &__heading {
    text-align: center;
    margin-bottom: 24px;
    &--desktop {
      display: none;
    }
  }

  &__swiper-container {
    position: relative;
    width: 100%;
    height: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    display: none;
    color: black;
    z-index: 100;
    width: 24px;
    height: 24px;

    &:after {
      display: none;
    }
  }

  &__swiper {
    .swiper-slide {
      width: 240px;
      height: 160px;
      display: flex;
      justify-content: center;
      align-items: center;

      &:first-child {
        padding-left: 16px;
      }
    }
  }
}

@include media-lg {
  .brands-slider {
    &__heading {
      &--desktop {
        display: block;
      }

      &--mobile {
        display: none;
      }
    }
    .swiper-button-next,
    .swiper-button-prev {
      display: block;
      color: black;
      top: 59%;

      &:after {
        display: none;
      }
    }

    .swiper-button-disabled {
      opacity: 0;
    }

    &__swiper {
      .swiper-slide {
        width: 288px;

        &:first-child {
          padding-left: 0px;
        }
      }
    }
  }
}
</style>
