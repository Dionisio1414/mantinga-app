<template>
  <component :is="componentName" :properties="contentType.properties" />
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'

import BannerSlider from '~/components/common/BannerSlider.vue'
import BrandsSlider from '~/components/common/BrandsSlider.vue'
import CatalogBanner from '~/components/common/CatalogBanner.vue'
import LatestProducts from '~/components/common/LatestProducts.vue'
import HeroPrimaryBlock from '~/components/common/HeroPrimaryBlock.vue'
import H2Block from '~/components/common/H2Block.vue'
import HeroSecondaryBlock from '~/components/common/HeroSecondaryBlock.vue';
import ContentCard from '~/components/common/ContentCard.vue';
import ImageBlock from '~/components/common/ImageBlock.vue'
import H1Title from '~/components/common/H1Title.vue'
import ContentTypeText from '~/components/common/ContentTypeText.vue'
import SecondaryInfoBlock from '~/components/common/SecondaryInfoBlock.vue'
import PrimaryInfoBlock from '~/components/common/PrimaryInfoBlock.vue'
import ContentTypeAccordion from '~/components/common/ContentTypeAccordion.vue'
import ContentTypeLatestNews from '~/components/common/ContentTypeLatestNews.vue'
import ContentTypeCards from '~/components/common/ContentTypeCards.vue'
import ContentTypeCardList from '~/components/common/ContentTypeCardList.vue';
import ContentTypeInteractiveCatalogue from '~/components/common/ContentTypeInteractiveCatalogue.vue';
import ContentTypeYoutube from '~/components/common/ContentTypeYoutube.vue';
import ContentTypeImageTitle from '~/components/common/ContentTypeImageTitle.vue'
import ContentTypeJobUnit from '~/components/common/ContentTypeJobUnit.vue'
import ContentTypeImageWithHeadline from '~/components/common/ContentTypeImageWithHeadline.vue'
import ContentTypeFeaturesList from '~/components/common/ContentTypeFeaturesList.vue'
import ContentTypeFactsList from '~/components/common/ContentTypeFactsList.vue'
import ContentTypeSliderMin from '~/components/common/ContentTypeSliderMin.vue'
import ContentTypeHistory from '~/components/common/ContentTypeHistory.vue'
import ContentTypeProjectsBlock from '~/components/common/ContentTypeProjectsBlock.vue'
import ContentTypeMainContacts from '~/components/common/ContentTypeMainContacts.vue'
import ContentTypeSalesContacts from '~/components/common/ContentTypeSalesContacts.vue'

import { EContentTypes } from '~/constants/content-types'
import { IContentType } from '~/types/content-type.interface'

@Component({
  components: {
    BannerSlider,
    BrandsSlider,
    CatalogBanner,
    LatestProducts,
    HeroPrimaryBlock,
    H2Block,
    HeroSecondaryBlock,
    ContentCard,
    ImageBlock,
    H1Title,
    ContentTypeText,
    SecondaryInfoBlock,
    PrimaryInfoBlock,
    ContentTypeAccordion,
    ContentTypeLatestNews,
    ContentTypeCards,
    ContentTypeCardList,
    ContentTypeInteractiveCatalogue,
    ContentTypeYoutube,
    ContentTypeImageTitle,
    ContentTypeJobUnit,
    ContentTypeImageWithHeadline,
    ContentTypeFeaturesList,
    ContentTypeFactsList,
    ContentTypeSliderMin,
    ContentTypeHistory,
    ContentTypeProjectsBlock,
    ContentTypeMainContacts,
    ContentTypeSalesContacts
  },
})
export default class ComponentContentTypeRoot extends Vue {
  @Prop()
  public readonly contentType!: IContentType

  public get componentName(): string | null {
    switch (this.contentType.code) {
      case EContentTypes.TEXT_BLOCK: {
        return 'ContentTypeText'
      }
      case EContentTypes.SLIDER: {
        return 'BannerSlider'
      }
      case EContentTypes.PRODUCT_LIST_BLOCK: {
        return 'LatestProducts'
      }
      case EContentTypes.NEWS_BLOCK: {
        return 'ContentTypeLatestNews'
      }
      case EContentTypes.BRAND_LIST_BLOCK: {
        return 'BrandsSlider'
      }
      case EContentTypes.HERO_PRIMARY_BLOCK: {
        return 'HeroPrimaryBlock'
      }
      case EContentTypes.H1_BLOCK: {
        return 'H2Block'
      }
      case EContentTypes.H1_TITLE: {
        return 'H1Title'
      }
      case EContentTypes.HERO_SECONDARY_BLOCK: {
        return 'HeroSecondaryBlock'
      }
      case EContentTypes.CONTENT_CARD: {
        return 'ContentCard'
      }
      case EContentTypes.IMAGE_BLOCK: {
        return 'ImageBlock'
      }
      case EContentTypes.SECONDARY_INFO_BLOCK: {
        return 'SecondaryInfoBlock'
      }
      case EContentTypes.PRIMARY_INFO_BLOCK: {
        return 'PrimaryInfoBlock'
      }
      case EContentTypes.ACCORDION: {
        return 'ContentTypeAccordion'
      }
      case EContentTypes.CARDS: {
        return 'ContentTypeCards'
      }
      case EContentTypes.CARD_LIST: {
        return 'ContentTypeCardList'
      }
      case EContentTypes.BANNER_WIDGET_BLOCK: {
         return 'CatalogBanner'
      }
      case EContentTypes.INTERECTIVE_CATALOGUE: {
        return 'ContentTypeInteractiveCatalogue'
      }
      case EContentTypes.YOUTUBE: {
        return 'ContentTypeYoutube'
      }
      case EContentTypes.IMAGE_TITLE_50_50: {
        return 'ContentTypeImageTitle'
      }
      case EContentTypes.JOB_UNIT: {
        return 'ContentTypeJobUnit'
      }
      case EContentTypes.IMAGE_BLOCK_WITH_HEADLINE: {
        return 'ContentTypeImageWithHeadline'
      }
      case EContentTypes.FEATURES: {
        return 'ContentTypeFeaturesList'
      }
      case EContentTypes.FACTS: {
        return 'ContentTypeFactsList';
      }
      case EContentTypes.SLIDER_MIN: {
        return 'ContentTypeSliderMin'
      }
      case EContentTypes.HISTORY: {
        return 'ContentTypeHistory';
      }
      case EContentTypes.PROJECTS_BLOCK: {
        return 'ContentTypeProjectsBlock'
      }
      case EContentTypes.MAIN_CONTACTS: {
        return 'ContentTypeMainContacts'
      }
      case EContentTypes.SALES_CONTACTS: {
        return 'ContentTypeSalesContacts';
      }
      default: {
        return null
      }
    }
  }
}
</script>
