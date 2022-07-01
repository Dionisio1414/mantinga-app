<template>
  <div class="page-static">
    <Breadcrumbs
      class="mb-23"
      :class="{ 'breadcrumbs--set-absolute': isFirstSliderMin }"
      :breadcrumbs="breadcrumbs"
    />
    <div
      class="page-static__wrapper"
      :class="{ 'page-static__wrapper--reset-padding': isFirstSliderMin }"
    >
      <div class="page-static__container">
        <ContentTypeRoot
          v-for="(contentType, index) in contentTypes"
          :key="index"
          :content-type="contentType"
          class="page-static__content-type"
        />
      </div>
      <button
        v-if="isPrivacyPolicyPage"
        class="page-static__btn btn btn--secondary"
        type="button"
        @click="goToTop"
      >
        <span
          class="btn-title"
          v-html="$sanitize($t('common.buttons.back_to_top'))"
        ></span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Action, Component, Getter, Provide } from 'nuxt-property-decorator'

import Breadcrumbs from '~/components/common/Breadcrumbs.vue'
import ContentTypeRoot from '~/components/content-types/ContentTypeRoot.vue'

import { IContentType } from '~/types/content-type.interface'
import { EStatus } from '~/constants/status'
import { IBreadcrumb } from '~/types/breadcrumb.interface'
import { EContentTypes } from '~/constants/content-types'

import { CONTENT_TYPE_PAGE_NAME } from '~/constants/tokens/content-types-page-name'
import { IMetaInfo } from '~/types/meta.interface'
import { IDictionary } from '~/types/dictionary.interface'

@Component({
  components: {
    ContentTypeRoot,
    Breadcrumbs,
  },
})
export default class PageStatic extends Vue {
  @Getter('page-static/contentTypes')
  public contentTypes!: IContentType[]

  @Getter('page-static/pageName')
  public pageName!: string

  @Getter('page-static/pageCode')
  public pageCode!: string

  @Getter('page-static/metaInfo')
  public metaInfo!: IMetaInfo

  @Action('page-static/clearPage')
  public clearPage!: () => void

  public get breadcrumbs(): IBreadcrumb[] {
    return [
      {
        key: this.$route.params.pathMatch,
        title: this.pageName,
        link: this.$route.params.pathMatch,
      },
    ]
  }

  @Provide(CONTENT_TYPE_PAGE_NAME)
  public get providePageName(): string {
    return this.pageName ?? ''
  }

  public head(): any {
    return {
      title: this.metaInfo?.title || this.pageName || 'Mantinga',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.metaInfo?.metaDescription || '',
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.metaInfo?.metaKeywords || '',
        },
      ],
    }
  }

  public get isFirstSliderMin(): boolean {
    const isFirstSliderMin = [...this.contentTypes].shift()
    return isFirstSliderMin?.code === EContentTypes.SLIDER_MIN
  }

  public get isPrivacyPolicyPage(): boolean {
    return this.pageCode === 'privacy-policy'
  }

  public goToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  public async asyncData({ params, store, error }: any) {
    const slug: string = params.pathMatch
    try {
      await store.dispatch('page-static/fetchPage', slug)
      const translations = store.getters['page-static/pageTranslations']
      const translatedParams: IDictionary<{ pathMatch: string }> = {}

      for (const code in translations) {
        translatedParams[code] = {
          pathMatch: translations[code].slug,
        }
      }
      await store.dispatch('i18n/setRouteParams', translatedParams)

      const status: EStatus = store.getters['page-static/status']

      if (status === EStatus.ERROR) {
        const err: any = store.getters['page-static/error']
        throw err
      }
    } catch (err) {
      error(err)
    }
  }
}
</script>

<style lang="scss" scoped>
.page-static {
  display: flex;
  font-weight: bold;
  flex-direction: column;
  font-size: 18px;
  min-height: 100vh;

  &__wrapper {
    position: relative;
    padding: 56px 0px;
    &--reset-padding {
      padding-top: 0;
    }
  }

  &__content-type {
    &:not(:last-child) {
      margin-bottom: 56px;
    }
  }

  &__btn {
    margin: 0 auto;
  }
}

@include media-lg {
  .page-static {
    &__wrapper {
      padding: 100px 0px;
      &--reset-padding {
        padding-top: 0;
      }
    }

    &__container {
      margin: 0 auto;
      overflow: hidden;
    }

    &__content-type {
      margin: 0 auto;
      &:not(:last-child) {
        margin-bottom: 128px;
      }
    }
  }
}
</style>
