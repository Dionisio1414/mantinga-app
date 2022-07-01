<template>
  <div class="page page-career">
    <Breadcrumbs :breadcrumbs="breadcrumbs" />
    <h2
      class="page-career__title page-career__title--desktop h4"
      v-html="$sanitize($t('career_page.title'))"
    />
    <h2
      class="page-career__title page-career__title--mobile h5"
      v-html="$sanitize($t('career_page.title'))"
    />

    <ContentTypeRoot
      v-for="(contentType, index) in contentTypes"
      :key="index"
      :content-type="contentType"
    />
    <div class="page__wrapper">
      <div class="page__container">
        <CareerPositionsList :jobs="jobs" />
        <div class="page-career__divider"></div>
        <CareerInfoBlock />
        <CareerAdvantagesBlock class="page-career__advantages" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Getter } from 'nuxt-property-decorator'
import Breadcrumbs from '~/components/common/Breadcrumbs.vue'
import ContentTypeRoot from '~/components/content-types/ContentTypeRoot.vue'
import CareerPositionsList from '~/components/career/CareerPositionsList.vue'
import CareerInfoBlock from '~/components/career/CareerInfoBlock.vue'
import CareerAdvantagesBlock from '~/components/career/CareerAdvangesBlock.vue'

import { IContentType } from '~/types/content-type.interface'
import { EStatus } from '~/constants/status'
import { IBreadcrumb } from '~/types/breadcrumb.interface'
import { IJob } from '~/types/job.interface'
import { IMetaInfo } from '~/types/meta.interface'

import getRouteForFetchPage  from '~/utils/get-route-for-fetch-page'

@Component({
  components: {
    Breadcrumbs,
    ContentTypeRoot,
    CareerPositionsList,
    CareerInfoBlock,
    CareerAdvantagesBlock,
  },
})
export default class PageCareer extends Vue {
  public $t: any

  @Getter('page-career/contentTypes')
  public contentTypes!: IContentType[]

  @Getter('page-career/jobs')
  public jobs!: IJob[]

  @Getter('page-career/metaInfo')
  public metaInfo!: IMetaInfo

  public get breadcrumbs(): IBreadcrumb[] {
    return [
      {
        key: this.$route.params.pathMatch,
        title: this.$t('breadcrumbs.career').toString(),
        link: this.$route.params.pathMatch,
      },
    ]
  }

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

  public async asyncData({ store, error, route }: any) {
    try {
      const routeForFetch = getRouteForFetchPage(route.path);

      const requestsList = [
        store.dispatch('page-career/fetchCareerPage', routeForFetch ),
        store.dispatch('page-career/fetchJobs'),
      ]

      await Promise.all(requestsList)

      const status: EStatus = store.getters['page-career/status']

      if (status === EStatus.ERROR) {
        const err: any = store.getters['page-career/error']
        throw err
      }
    } catch (err) {
      error(err)
    }
  }
}
</script>

<style lang="scss" scoped>
.page-career {
  &__title {
    text-align: center;
    margin-top: 30px;

    &--desktop {
      display: none;
    }
  }

  &__divider {
    width: 100%;
    height: 4px;
    background-color: $color-golden;
    margin: 64px 0;
  }

  &__advantages {
    margin-top: 88px;
  }
}

@include media-lg {
  .page__wrapper {
    padding-top: 60px;
  }

  .page-career {
    &__title {
      &--desktop {
        display: inline;
      }

      &--mobile {
        display: none;
      }
    }
  }
}
</style>
