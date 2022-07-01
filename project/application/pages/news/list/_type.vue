<template>
  <div>
    <Breadcrumbs :breadcrumbs="breadcrumbs" />
    <div class="page__wrapper">
      <div class="page__container">
        <div class="news-list-page">
          <div class="news-list-page__header h4">
            {{ title }}
          </div>
          <div class="news-list-page__grid">
            <NewsCard
              v-for="(news, i) in newsList"
              :key="i"
              :properties="news"
              :with-shadow="true"
            />
          </div>
          <div class="news-list-page__footer">
            <button
              v-if="isShowLoadMoreButton"
              class="news-list-page__btn btn btn--secondary"
              @click="loadMore"
            >
              <span
                class="btn-title"
                v-html="$sanitize($t('news_page.load_more'))"
              />
            </button>
            <p class="news-list-page__pagination body-text1">
              <span> {{ $t('news_page.product_view') }}</span
              >: <b>{{ currentItemQuantity }}</b>
              <span>{{ $t('news_page.of') }}</span> {{ totalItems }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Action, Component, Getter } from 'nuxt-property-decorator'
import LatestNewsBlock from '~/components/news/LatestNewsBlock.vue'
import NewsCard from '~/components/cards/NewsCard.vue'
import Breadcrumbs from '~/components/common/Breadcrumbs.vue'

import { NEWS_TYPE } from '~/constants/news'
import { IArticle, IArticleGetParams } from '~/types/articles.interface'
import { IPagination } from '~/types/pagination.interface'
import { IBreadcrumb } from '~/types/breadcrumb.interface'

@Component({
  components: {
    LatestNewsBlock,
    NewsCard,
    Breadcrumbs,
  },
  scrollToTop: true,
})
export default class PageNewsIndex extends Vue {
  @Getter('page-news-list/news')
  public newsList!: IArticle[]

  @Getter('page-news-list/currentType')
  public currentType!: string | null

  @Getter('page-news-list/pagination')
  public pagination!: IPagination

  @Action('page-news-list/loadMore')
  public loadMore!: () => Promise<void>

  public $t: any
  public localePath: any;

  public get title(): string {
    switch (this.currentType) {
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
        title: this.$t('breadcrumbs.news').toString(),
        link: this.localePath({ name:'news' }),
      },
      {
        key: 'news-list',
        title: this.title,
        link: this.localePath({ name: 'news-list-type', params: { type: this.currentType }}),
      },
    ]
  }

  public get currentItemQuantity(): number {
    return this.newsList?.length || 0
  }

  public get totalItems(): number {
    return this.pagination?.totalItems || 0
  }

  public get isShowLoadMoreButton(): boolean {
    return this.currentItemQuantity < this.totalItems
  }

  public async asyncData({ store, error, route, redirect, from, $dayjs, app }: any) {
    const newsType = route?.params?.type
    if (
      newsType === NEWS_TYPE.PRODUCT_NEWS ||
      newsType === NEWS_TYPE.COMPANY_NEWS
    ) {
      const fromFullPath = from?.fullPath || ''
      const fromSlug = from?.params?.slug || ''
      const newsList = store.getters['page-news-list/news']

      if (fromFullPath !== `/news/${fromSlug}` || !newsList.length) {
        try {
          const params: IArticleGetParams = {
            type: newsType,
            itemsPerPage: 28,
            page: 1,
            'order[date]': 'desc',
            'order[id]': 'desc',
            'date[before]': $dayjs().format('YYYY-MM-DD HH:mm:ss'),
          }

          await store.dispatch('page-news-list/fetchNewsByType', params)
        } catch (err) {
          error(err)
        }
      }
    } else {
      redirect(app.localePath({name: 'index' }))
    }
  }

  public loadMoreHandler(): void {
    this.loadMore()
  }
}
</script>

<style lang="scss" scoped>
.news-list-page {
  &__header {
    text-align: center;
    margin-bottom: 40px;
  }

  &__grid {
    display: grid;
    grid-template-columns: 100%;
    gap: 16px;
    padding: 4px;
  }

  &__footer {
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  &__btn {
    width: max-content;
  }

  &__pagination {
    margin-top: 24px;
  }
}

@include media-md {
  .news-list-page {
    &__grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}

@include media-lg {
  .news-list-page {
    &__grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
    }
  }
}
</style>
