<template>
  <div>
    <div class="breadcrumbs-mobile">
      <NuxtLink
        :to="localePath({name: 'news-list-type', params: {type: news && news.type}})"
        class="breadcrumbs-mobile__link"
      >
        <svg-icon name="chevron-left" width="24" height="24" />
        <span
          class="body-text1 body-text1--bold"
          v-html="$sanitize($t('common.buttons.back'))"
        />
      </NuxtLink>
    </div>
    <div class="breadcrumbs-desktop">
      <Breadcrumbs :breadcrumbs="breadcrumbs" />
    </div>
    <div class="page__wrapper">
      <div class="page__container">
        <div class="news-inner">
          <p class="news-inner__date subtitle" v-html="$sanitize(date)" />
          <div class="news-inner__name h4" v-html="$sanitize(name)" />
          <NewsShareBlock
            :news-url="newsUrl"
            :news-title="name"
            :news-description="description"
            :hashtags="metaKeywords"
            :media="imageSrc"
          />
          <img v-if="imageSrc" class="news-inner__img" :src="imageSrc" />
        </div>
      </div>
    </div>
    <div>
      <ContentTypeRoot
        v-for="(contentType, index) in contentTypes"
        :key="index"
        :content-type="contentType"
        class="content-type"
      />
    </div>

    <div class="page__wrapper">
      <div class="page__container">
        <NewsShareBlock
          align="center"
          :news-url="newsUrl"
          :news-title="name"
          :news-description="description"
          :hashtags="metaKeywords"
          :media="imageSrc"
        />
        <button
          class="news-inner__button-to-top btn btn--secondary"
          @click.prevent="goToTop"
        >
          <span
            class="btn-title"
            v-html="$sanitize($t('news_page.button_to_top'))"
          ></span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Getter } from 'nuxt-property-decorator'
import NewsShareBlock from '~/components/common/NewsShareBlock.vue'
import ContentTypeRoot from '~/components/content-types/ContentTypeRoot.vue'
import Breadcrumbs from '~/components/common/Breadcrumbs.vue'

import { EStatus } from '~/constants/status'
import { IArticle, IArticleTranslation } from '~/types/articles.interface'

import { IContentType } from '~/types/content-type.interface'
import { IBreadcrumb } from '~/types/breadcrumb.interface'
import { NEWS_TYPE } from '~/constants/news'
import { INewsMeta } from '~/types/news.interface'

@Component({
  components: {
    NewsShareBlock,
    ContentTypeRoot,
    Breadcrumbs,
  },
  scrollToTop: true,
})
export default class PageNewsInnerIndex extends Vue {
  @Getter('page-news-inner/news')
  public news!: IArticle

  public head(): INewsMeta {
    return {
      title: this.name,
      meta: [
        {
          property: 'og:title',
          content: this.name,
        },
        {
          property: 'og:image',
          content: this.imageSrc,
        },
        {
          property: 'og:description',
          content: this.news?.metaDesctiption || '',
        },
        {
          property: 'og:url',
          content: process.client ? window?.location?.href : '',
        },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary',
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: this.imageSrc,
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: this.name,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.news?.metaDesctiption || '',
        },
      ],
    }
  }

  public async asyncData({ store, error, params }: any) {
    try {
      const { slug } = params
      if (slug) {
        await store.dispatch('page-news-inner/fetchNewsById', slug)

        const status: EStatus = store.getters['page-news-inner/status']
        if (status === EStatus.ERROR) {
          const err: any = store.getters['page-news-inner/error']

          error(err)
        }
      }
    } catch (err) {
      error(err)
    }
  }

  public $i18n: any
  public $t: any
  public localePath: any;

  public get locale(): string {
    return this.$i18n.locale || 'lt'
  }

  public get translationNews(): IArticleTranslation {
    return this.news?.translations[this.$i18n.locale] || {}
  }

  public get contentTypes(): IContentType[] {
    return this.translationNews?.contentType || []
  }

  public get date(): string {
    return this.$dayjs(this.news?.date)
      .locale(this.locale)
      .format('MMMM D, YYYY')
  }

  public get name(): string {
    return this.translationNews?.name || ''
  }

  public get imageSrc(): string {
    return this.news?.image || ''
  }

  public get description(): string {
    return this.translationNews?.shortDescription || ''
  }

  public get newsUrl(): string {
    return (process.client && window?.location?.href) || ''
  }

  public get metaKeywords(): string {
    return this.translationNews?.metaKeywords || ''
  }

  public get newsTypeTitle(): string {
    switch (this.news?.type?.toString()) {
      case NEWS_TYPE.PRODUCT_NEWS:
        return this.$t('news_page.product_news')
      case NEWS_TYPE.COMPANY_NEWS:
        return this.$t('news_page.company_news')
      default:
        return ''
    }
  }

  public get breadcrumbs(): IBreadcrumb[] {
    return [
      {
        key: 'news',
        title: this.$t('breadcrumbs.news'),
        link: this.localePath({ name: 'news' }),
      },
      {
        key: 'news-list',
        title: this.newsTypeTitle,
        link: this.localePath({ name: 'news-list-type', params: { type: this.news?.type }}),
      },
      {
        key: 'news-item',
        title: this.name,
        link: '/',
      },
    ]
  }

  public goToTop(): void {
    window.scrollTo(0, 0)
  }
}
</script>

<style lang="scss" scoped>
.content-type {
  &:not(:first-child) {
    margin-top: 40px;
  }
}

.breadcrumbs-mobile {
  margin-top: 12px;
  margin-left: 16px;

  &__link {
    padding: 12px 8px;
    display: flex;
    align-items: center;
  }

  &__icon {
    margin-right: 8px;
  }
}

.breadcrumbs-desktop {
  display: none;
}

.news-inner {
  &__date {
    text-align: center;
    color: $color-primary-light;
  }

  &__name {
    text-align: center;
    margin: 16px 0 21px 0;
  }

  &__share {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  &__share-text {
    color: $color-primary-light;
  }

  &__icon {
    margin-left: 24px;
    color: $color-golden;
  }

  &__img {
    margin-top: 21px;
    width: 100%;
    border-radius: 8px;
  }

  &__button-to-top {
    margin: 48px auto 0 auto;
  }
}

@include media-lg {
  .breadcrumbs-desktop {
    display: block;
  }

  .breadcrumbs-mobile {
    display: none;
  }

  .news-inner {
    &__latest-news {
      &:not(:last-child) {
        margin-bottom: 88px;
      }
    }

    &__button-to-top {
      display: none;
    }
  }
}
</style>
