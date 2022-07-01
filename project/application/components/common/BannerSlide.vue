<template>
  <swiper-slide>
    <div class="swiper-slide__text-container">
      <h2 v-if="textOneValue" class="h2 swiper-slide__heading">
        {{ textOneValue }}
      </h2>
      <p v-if="textTwoValue" class="h5 swiper-slide__text">
        {{ textTwoValue }}
      </p>
    </div>
    <template v-if="imageUrl && !youtubeUrl">
      <img class="swiper-slide__img" :src="imageUrl" :alt="imageAlt" />
    </template>

    <template v-if="youtubeUrl">
      <YoutubeVideoSlide :mobile-src="imageMobileUrl" :src="youtubeUrl" />
    </template>
  </swiper-slide>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import YoutubeVideoSlide from './YoutubeVideoSlide.vue'
import { ISlideProperties } from '~/types/content-type-slider.interface'

@Component({
  components: {
    YoutubeVideoSlide,
  },
})
export default class ComponentBannerSlide extends Vue {
  @Prop()
  public readonly slide!: ISlideProperties

  public get textOneValue(): string | null {
    return this.slide?.text_one?.value || null
  }

  public get imageAlt(): string | null {
    return this.slide?.alt?.value || null
  }

  public get textTwoValue(): string | null {
    return this.slide?.text_two?.value || null
  }

  public get imageUrl(): string | null {
    return this.slide?.image?.url || null
  }

  public get youtubeUrl(): string | null {
    return this.slide?.youtube_url?.value || null
  }

  public get imageMobileUrl(): string | null {
    return this.slide?.image_mobile?.url || null
  }
}
</script>

<style lang="scss" scoped>
.swiper {
  height: 100%;
  width: 100%;

  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    color: $color-white;
    overflow: hidden;
    max-width: 100%;

    &__text-container {
      position: absolute;
      left: 22px;
      top: 92px;
      color: $color-white;
    }

    &__heading {
      position: relative;
      font-weight: 300;
      z-index: 101;
      @include h4;
    }

    &__text {
      position: relative;
      z-index: 101;
      margin-top: 16px;
      color: $color-golden-light;
    }

    &__img {
      object-fit: cover;
      object-position: center;
      width: 100%;
      height: 100%;
    }
  }
}

@include media-lg {
  .swiper {
    .swiper-slide {
      &__text-container {
        left: 120px;
        top: 96px;
      }

      &__heading {
        @include h2;
      }
    }
  }
}
</style>
