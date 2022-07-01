<template>
  <div class="latest-news">
    <div class="latest-news__header">
      <svg-icon class="latest-news__icon" name="leafs" height="40" />
      <h2
        v-if="title"
        class="latest-news__title h4"
        v-html="$sanitize(title)"
      />
      <h2
        v-if="title"
        class="latest-news__title--mobile h5"
        v-html="$sanitize(title)"
      />
    </div>
    <NewsSlider ref="newsSlider" :news-list="latestNews" />
    <div class="latest-news__line" :style="{ left: lineLeftPosition }" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Action, Component, Getter, Prop } from 'nuxt-property-decorator'
import NewsCard from '~/components/cards/NewsCard.vue'
import NewsSlider from '~/components/common/NewsSlider.vue'

import { IContentTypeNewsProperties } from '~/types/content-type-news.interface'
import { IArticle, IArticleGetParams } from '~/types/articles.interface'
import { EStatus } from '~/constants/status'
import { NEWS_TYPE } from '~/constants/news'

@Component({
  components: {
    NewsCard,
    NewsSlider,
  },
})
export default class ComponentContentTypeLatestNews extends Vue {
  @Action('latest-news-block/fetchLatestNews')
  public fetchLatestNews!: (payload: IArticleGetParams) => Promise<void>

  @Prop()
  public properties!: IContentTypeNewsProperties

  @Getter('latest-news-block/latestNews')
  public latestNews!: IArticle[]

  @Getter('latest-news-block/status')
  public status!: EStatus

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

  public lineLeftPosition: string = '0'

  public get title(): string | null {
    return this.properties?.title?.value || null
  }

  public mounted(): void {
    if (this.status === EStatus.PROCESSING) return

    this.fetchLatestNews({
      itemsPerPage: 4,
      page: 1,
      'order[date]': 'desc',
      'order[id]': 'desc',
      'date[before]': this.$dayjs().format('YYYY-MM-DD HH:mm:ss'),
      type: NEWS_TYPE.COMPANY_NEWS
    })

    if (process.client) {
      this.calculateLinePosition()

      window.addEventListener('resize', this.calculateLinePosition)
    }
  }

  public destroyed(): void {
    window.removeEventListener('resize', this.calculateLinePosition)
  }

  public calculateLinePosition(): void {
    // @ts-ignore
    const rect = this.$refs?.newsSlider?.$el.getBoundingClientRect()
    this.lineLeftPosition = `-${rect.left}px`
  }
}
</script>

<style lang="scss" scoped>
.latest-news {
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
    .swiper-slide {
      width: 282px;
      padding: 16px 0;

      &:first-child {
        padding-left: 16px;
        width: 298px;
      }
    }
  }

  &__line {
    display: none;
  }
}

@include media-lg {
  .latest-news {
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
      height: 4px;
      background-color: $color-golden;
    }
  }
}
</style>
