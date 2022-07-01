<template>
  <div class="news-slider">
    <div class="news-slider__container">
      <client-only>
        <swiper
          ref="products_swiper"
          class="news-slider__swiper"
          :options="sliderOptions"
        >
          <swiper-slide v-for="newsItem in newsList" :key="newsItem.id">
            <NewsCard :with-shadow="withShadow" :properties="newsItem" />
          </swiper-slide>
        </swiper>
      </client-only>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import NewsCard from '~/components/cards/NewsCard.vue'

import { IArticle } from '~/types/articles.interface'

@Component({
  components: {
    NewsCard,
  },
})
export default class ComponentNewsSlider extends Vue {
  @Prop()
  public newsList!: IArticle[]

  @Prop({ default: false })
  public withShadow!: boolean

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
.news-slider {
  &__container {
    max-width: 1200px;
    margin: 0 auto;
  }

  &__header {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  &__icon {
    display: none;
  }

  &__title {
    display: none;

    &--mobile {
      padding-bottom: 16px;
      text-align: center;
    }
  }

  &__swiper {
    padding: 0 4px;
    .swiper-slide {
      width: 282px;
      padding: 16px 0;

      &:first-child {
        width: 298px;
      }
    }
  }

  &__line {
    display: none;
  }
}

@include media-lg {
  .news-slider {
    position: relative;
    &__icon {
      display: inline;
    }

    &__title {
      display: block;
      padding-bottom: 32px;
      text-align: center;

      &--mobile {
        display: none;
      }
    }

    &__swiper {
      .swiper-slide {
        width: auto;

        &:first-child {
          padding-left: 0px;
          width: auto;
        }
      }
    }

    &__line {
      display: block;
      width: 100vw;
      position: absolute;
      top: 317px;
      z-index: 10;
      left: 0px;
      height: 4px;
      background-color: $color-golden;
    }
  }
}
</style>
