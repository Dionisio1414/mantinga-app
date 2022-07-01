<template>
  <div>
    <Breadcrumbs :breadcrumbs="breadcrumbs" />
    <div class="page__wrapper">
      <div class="page__container">
        <div class="news-page">
          <LatestNewsBlock
            class="news-page__latest-news"
            :title="$t('news_page.company_news')"
            :news-list="companyNews"
            :news-type="newsTypes.company"
          />
          <LatestNewsBlock
            class="news-page__latest-news"
            :title="$t('news_page.product_news')"
            :news-list="productNews"
            :news-type="newsTypes.product"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Getter } from 'nuxt-property-decorator'
import LatestNewsBlock from '~/components/news/LatestNewsBlock.vue'
import Breadcrumbs from '~/components/common/Breadcrumbs.vue'

import { EStatus } from '~/constants/status'
import { IArticle } from '~/types/articles.interface'
import { NEWS_TYPE } from '~/constants/news'
import { IDictionary } from '~/types/dictionary.interface'
import { IBreadcrumb } from '~/types/breadcrumb.interface'
import { IMetaInfo } from '~/types/meta.interface'

import getRouteForFetchPage  from '~/utils/get-route-for-fetch-page'

@Component({
  components: {
    LatestNewsBlock,
    Breadcrumbs,
  },
})
export default class PageNewsIndex extends Vue {
  @Getter('page-news/productNews')
  public productNews!: IArticle[]

  @Getter('page-news/companyNews')
  public companyNews!: IArticle[]

  @Getter('page-news/metaInfo')
  public metaInfo!: IMetaInfo

  public $t: any

  public head(): any {
        return {
            title: this.metaInfo?.title || 'Mantinga',
            meta: [
                {
                hid: 'description',
                name: 'description',
                content: this.metaInfo?.metaDescription || ''
                },
                {
                hid: 'keywords',
                name: 'keywords',
                content: this.metaInfo?.metaKeywords || ''
                },
            ],
        }
    }

  public get newsTypes(): IDictionary<string> {
    return {
      product: NEWS_TYPE.PRODUCT_NEWS,
      company: NEWS_TYPE.COMPANY_NEWS,
    }
  }

  public get breadcrumbs(): IBreadcrumb[] {
    return [
      {
        key: this.$route.params.pathMatch,
        title: this.$t('breadcrumbs.news').toString(),
        link: this.$route.params.pathMatch,
      },
    ]
  }

  public async asyncData({ store, error, route }: any) {
    const slug = getRouteForFetchPage(route.path);
    
    try {
      const requestList = [
        store.dispatch('page-news/fetchNewsPage', slug),
        store.dispatch('page-news/fetchLatestProductNews'),
        store.dispatch('page-news/fetchLatestCompanyNews'),
      ]

      await Promise.all(requestList)

      const status: EStatus = store.getters['page-news/status']

      if (status === EStatus.ERROR) {
        const err: any = store.getters['page-home/error']
        throw err
      }
    } catch (err) {
      error(err)
    }
  }
}
</script>

<style lang="scss" scoped>
.news-page {
  &__latest-news {
    &:not(:last-child) {
      margin-bottom: 48px;
    }
  }
}

@include media-lg {
  .news-page {
    &__latest-news {
      &:not(:last-child) {
        margin-bottom: 88px;
      }
    }
  }
}
</style>
