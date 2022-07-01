<template>
  <div class="common-gallery">
    <div class="common-gallery__slider">
      <client-only>
        <div v-swiper:slider="internalSliderOptions" class="main-swiper">
          <div class="swiper-wrapper">
            <GallerySlide
              v-for="(slide, i) in slides"
              :key="`main-slide-${i}`"
              :slide="slide.img"
              :youtube-url="slide.youtubeUrl"
              :youtube-thumbnail="slide.youtubeThumbnail"
            />
          </div>
        </div>
      </client-only>
    </div>

    <div class="common-gallery__thumbs">
      <client-only>
        <button class="swiper-button-prev">
          <svg-icon
            class="swiper__icon"
            name="chevron-left"
            width="48"
            height="48"
          />
        </button>
        <div v-swiper:thumbs="internalThumbsOptions" class="thumbs-swiper">
          <div class="swiper-wrapper">
            <GallerySlide
              v-for="(slide, i) in slides"
              :key="`thumb-${i}`"
              :is-thumb="true"
              :slide="slide.img"
              :youtube-url="slide.youtubeUrl"
              :youtube-thumbnail="slide.youtubeThumbnail"
            />
          </div>
        </div>

        <button class="swiper-button-next">
          <svg-icon
            class="swiper__icon"
            name="chevron-right"
            width="48"
            height="48"
          />
        </button>
      </client-only>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import GallerySlide from './GallerySlide.vue'
import Swiper, { SwiperOptions } from 'swiper'
import { IGallerySlide } from '~/types/gallery.interface'

@Component({
  components: {
    GallerySlide,
  },
})
export default class ComponentCommonGallery extends Vue {
  @Prop({ default: () => [] })
  public images!: string[]

  @Prop({ default: '' })
  public video!: string

  @Prop({ default: '' })
  public videoThumbnail!: string

  @Prop({ default: () => {} })
  public sliderOptions!: SwiperOptions

  @Prop({ default: () => {} })
  public thumbsOptions!: SwiperOptions

  public thumbs!: Swiper
  public slider!: Swiper

  public get internalSliderOptions(): SwiperOptions {
    return {
      initialSlide: 0,
      preventClicks: false,
      preventClicksPropagation: false,
      slideToClickedSlide: true,
      thumbs: {
        swiper: this.thumbs,
      },
      ...this.sliderOptions,
    }
  }

  public get internalThumbsOptions(): SwiperOptions {
    return {
      slidesPerView: 4,
      initialSlide: 0,
      slideToClickedSlide: true,
      noSwiping: true,
      updateOnWindowResize: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      thumbs: {
        swiper: this.slider,
      },
      ...this.thumbsOptions,
    }
  }

  public get slides(): IGallerySlide[] {
    return [
      ...this.images?.map((elem: string) => {
        return {
          img: elem || '',
        }
      }),
      ...(this.video
        ? [
            {
              youtubeUrl: this.video || '',
              youtubeThumbnail: this.videoThumbnail || '',
            },
          ]
        : []),
    ]
  }

  public mounted(): void {
    if (process.client) {
      this.$nextTick(() => {
        if (this.slider?.controller && this.thumbs?.controller) {
          this.slider.controller.control = this.thumbs
          this.thumbs.controller.control = this.slider
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.common-gallery {
  width: 100%;

  &__slider {
    min-width: 0;
  }

  &__thumbs {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    height: calc(56px + 16px);
  }
}

.main-swiper {
  margin-bottom: 24px;

  .swiper-slide {
    height: 320px;
    overflow: hidden;
  }
}

.thumbs-swiper {
  height: 100%;
}

.swiper-button-next,
.swiper-button-prev {
  width: 48px;
  height: 48px;
  position: relative;
  color: $color-primary-regular;
  margin-top: 2px;

  &:after {
    display: none;
    color: $color-primary-regular;
  }
}

.swiper-button-next {
  right: 0;
  top: 0;
}

.swiper-button-prev {
  left: 0;
  top: 0;
}
@include media-sm {
  .common-gallery__thumbs {
    height: 103px;
    gap: 16px;
  }

  .main-swiper {
    margin-bottom: 0;

    .swiper-slide {
      height: 588px;
    }
  }
}

@include media-lg {
  .common-gallery {
    grid-template-columns: 50% 50%;
  }
}
</style>
