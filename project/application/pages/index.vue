<template>
  <div class="page page-home">
    <BannerSlider
      class="page-home__banner"
      :properties="contentTypeBanner.properties"
    />

    <div class="page__wrapper">
      <div class="page__container">
        <ContentTypeRoot
          v-for="(contentType, index) in contentTypesForContainer"
          :key="index"
          :content-type="contentType"
          class="page-home__content-type"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Getter } from 'nuxt-property-decorator'
import BannerSlider from '~/components/common/BannerSlider.vue'

import ContentTypeRoot from '~/components/content-types/ContentTypeRoot.vue'

import { EContentTypes } from '~/constants/content-types'
import { IContentType } from '~/types/content-type.interface'
import { EStatus } from '~/constants/status'
import { IMetaInfo } from '~/types/meta.interface'

@Component({
  components: {
    BannerSlider,
    ContentTypeRoot,
  },
})
export default class PageIndex extends Vue {
  @Getter('page-home/contentTypes')
  public contentTypes!: IContentType[]

  @Getter('page-home/metaInfo')
  public metaInfo!: IMetaInfo

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

  public get contentTypeBanner(): IContentType {
    return (
      this.contentTypes?.filter(
        (elem: IContentType) => elem.code === EContentTypes.SLIDER
      )[0] || {}
    )
  }

  public get contentTypesForContainer(): IContentType[] {
    return (
      this.contentTypes?.filter(
        (elem: IContentType) => elem.code !== EContentTypes.SLIDER
      ) || []
    )
  }

  public async asyncData({ store, error }: any) {
    try {
      await store.dispatch('page-home/fetchHomepage')

      const status: EStatus = store.getters['page-home/status']

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
.page-home {
  &__content-type {
    &:not(:last-child) {
      margin-bottom: 56px;
    }
  }
}

@include media-lg {
  .page {
    &__wrapper {
      padding: 128px 0px;
    }
  }

  .page-home {
    &__content-type {
      margin: 0 auto;
      &:not(:last-child) {
        margin-bottom: 128px;
      }
    }
  }
}
</style>
