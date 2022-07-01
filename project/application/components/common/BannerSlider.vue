<template>
  <div
    class="banner-slider"
    :class="{ 'banner-slider--minimized': !isMinimizedHeader && !watchHeaderMinimize, 'banner-slider--min': isMin }"
  >
    <client-only>
      <swiper ref="banner-slider" class="swiper" :options="sliderOptions">
        <BannerSlide v-for="(slide, i) in slides" :key="i" :slide="slide" />
        <div slot="pagination" class="swiper-pagination" />
      </swiper>
      <div v-if="!isMin" class="swiper-button-prev">
        <svg-icon
          class="swiper__icon"
          name="chevron-left"
          width="48"
          height="48"
        />
      </div>
      <div v-if="!isMin" class="swiper-button-next">
        <svg-icon
          class="swiper__icon"
          name="chevron-right"
          width="48"
          height="48"
        />
      </div>
    </client-only>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Getter, Prop } from 'nuxt-property-decorator'
import BannerSlide from './BannerSlide.vue'

import {
  IContentTypeSliderProperties,
  ISlideProperties,
} from '~/types/content-type-slider.interface'

@Component({
  components: {
    BannerSlide,
  },
})
export default class ComponentBannerSlider extends Vue {
  @Getter('header/isMinimizedHeader')
  public readonly isMinimizedHeader!: boolean

  @Prop() public readonly properties!: IContentTypeSliderProperties
  @Prop({ default: false }) public readonly watchHeaderMinimize!: boolean
  @Prop({ default: false }) public isMin!: boolean

  public sliderOptions: any = {
    grabCursor: true,
    autoplay: this.autoplaySpeed ?  {
      delay: this.autoplaySpeed,
      disableOnInteraction: true
    } : false,
    disableOnInteraction: false,
    centeredSlides: true,
    slidesPerView: '1',
    initialSlide: 1,
    slideToClickedSlide: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  }

  public get slides(): ISlideProperties[] {
    return this.properties?.image_blocks?.value || []
  }

  public get autoplaySpeed(): number {
    let speedInSeconds: any = this.properties?.autoplay_speed?.value || null;

    if(speedInSeconds) {
      speedInSeconds = +speedInSeconds * 1000;
    }

    return speedInSeconds
  }
}
</script>

<style lang="scss" scoped>
.banner-slider {
  position: relative;
  background-color: $color-primary-dark;
  width: 100%;
  height: calc(100vh - $header-height-mobile);
  display: flex;
  justify-content: center;
  align-items: center;
  color: $color-white;

  &--min {
    height: 466px;
  }

  .swiper-button-next,
  .swiper-button-prev {
    display: none;
    width: 48px;
    height: 48px;
    margin: 0 120px;

    &:after {
      display: none;
      color: $color-white;
    }
  }

  .swiper-button-next {
    margin-right: 120px;
  }

  .swiper-button-prev {
    margin-left: 120px;
  }
}

.swiper {
  height: 100%;
  width: 100%;

  &__icon {
    color: $color-white;
    width: 48px;
    height: 48px;
  }

  .swiper-pagination {
    width: fit-content;
    margin: 0;
    position: absolute;
    top: 48px;
    left: 22px;

    ::v-deep {
      .swiper-pagination-bullet.swiper-pagination-bullet-active {
        background-color: $color-white;
      }

      .swiper-pagination-bullet {
        background-color: rgba($color-white, 0.5);
      }
    }
  }
}

@include media-lg {
  .banner-slider {
    height: calc(100vh - $header-height-desktop-min);
    transition: transform 200ms;

    &--min {
      height: 466px;
    }

    &--minimized {
      height: calc(100vh - $header-height-desktop);
    }

    .swiper-button-next,
    .swiper-button-prev {
      display: block;
      z-index: 49;
    }

    .swiper-button-disabled {
      opacity: 0 !important;
    }
  }

  .swiper {
    .swiper-pagination {
      margin: 0 122px 50px 122px;
      top: unset;
      left: unset;
    }
  }
}
</style>
