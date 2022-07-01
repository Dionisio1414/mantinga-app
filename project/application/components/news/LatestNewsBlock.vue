<template>
  <div class="latest-news">
    <div class="latest-news__header">
      <div class="latest-news__line"></div>
      <h5 class="latest-news__headline h5">{{ title }}</h5>
      <div class="latest-news__line"></div>
    </div>
    <div class="latest-news__cards">
      <NewsCard
        v-for="(news, i) in newsList"
        :key="i"
        :with-shadow="true"
        :properties="news"
        class="latest-news__card"
      />
    </div>
    <div class="latest-news__btn-container">
      <NuxtLink :to="localePath({name: 'news-list-type', params: {type: newsType}})" class="btn btn--secondary">
        <span
          class="latest-news__btn btn-title"
          v-html="$sanitize($t('common.buttons.view_all'))"
        />
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'

import NewsSlider from '~/components/common/NewsSlider.vue'
import NewsCard from '~/components/cards/NewsCard.vue'
import { IArticle } from '~/types/articles.interface'
import { NEWS_TYPE } from '~/constants/news'

@Component({
  components: {
    NewsSlider,
    NewsCard,
  },
})
export default class ComponentLatestNewsBlock extends Vue {
  @Prop()
  public newsList!: IArticle[]

  @Prop()
  public title!: string

  @Prop({ default: NEWS_TYPE.PRODUCT_NEWS })
  public newsType!: string
}
</script>

<style lang="scss" scoped>
.latest-news {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }

  &__line {
    display: none;
    border-top: 4px solid $color-golden;
    height: 1px;
    width: 100%;
  }

  &__headline {
    white-space: nowrap;
    padding: 24px 32px;
    margin: 0 auto;
    text-align: center;
    background: linear-gradient(
        0deg,
        rgba(210, 180, 103, 0.04),
        rgba(210, 180, 103, 0.04)
      ),
      $color-white;
    box-shadow: $shadow-100;
    border-radius: 56px 0;
  }

  &__btn-container {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 24px;
  }

  &__btn {
    margin: 0 auto;
  }

  &__cards {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }

  &__card {
    &:not(:last-child) {
      margin-bottom: 16px;
    }
  }
}

@include media-md {
  .latest-news {
    &__header {
      margin-bottom: 56px;
    }

    &__headline {
      box-shadow: none;
      background: none;
      margin: 0 32px;
    }

    &__cards {
      flex-direction: row;
    }

    &__card {
      flex-basis: 282px;

      &:not(:last-child) {
        margin-bottom: 0;
        margin-right: 16px;
      }
    }

    &__line {
      display: block;
    }

    &__btn-container {
      margin-top: 32px;
    }
  }
}
</style>
