<template>
  <div class="product-block">
    <div class="product-block__gallery-container">
      <CommonGallery
        :images="images"
        :video="video"
        :slider-options="sliderOptions"
        :thumbs-options="thumbsOptions"
      />
      <DownloadZip
        class="product-block__download-btn"
        :button-text="$t('product_inner.download_photos')"
        @downloadZip="downloadZip"
      />
    </div>
    <div class="product-block__content-container">
      <ProductAdditives :additives="productBadges" />

      <p class="product-block__name h5">
        {{ productName }}
      </p>
      <p class="product-block__description body-text1">
        {{ shortDescription }}
      </p>

      <div v-if="!isAuthorized" class="product-block__buttons">
        <button class="btn btn--secondary" type="button" @click="openInquiryModal">
          <span
            class="btn-title"
            v-html="$sanitize($t('product_inner.send_request'))"
          />
        </button>
        <button
          class="btn btn--transparent-with-border product-block__like-button"
          type="button"
          @click.prevent="updateFavouriteProducts(productId)"
        >
          <svg-icon
            :name="isLikedProduct ? 'favourite-filled' : 'favourite'"
            height="24"
            width="24"
          />
        </button>
      </div>

      <div
        class="product-block__buttons product-block__buttons--last"
      >
        <button
          class="btn btn--transparent-with-border"
          type="button"
          @click="downloadPresentation"
        >
          <span
            class="btn-title"
            v-html="$sanitize($t('product_inner.product_presentation'))"
          />
        </button>
      </div>
      <ProductInnerInfo :is-authorized="isAuthorized" :product="product" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Action, Component, Getter, Prop } from 'nuxt-property-decorator'
import DownloadZip from '~/components/common/DownloadZip.vue'
import ProductInnerInfo from '~/components/products/ProductInnerInfo.vue'
import ProductAdditives from '~/components/common/ProductAdditives.vue'
import CommonGallery from '~/components/gallery/CommonGallery.vue'

import {
  IProduct,
  IProductBadge,
  IProductImage,
} from '~/types/product.interface'
import { SwiperOptions } from 'swiper'

@Component({
  components: {
    DownloadZip,
    ProductInnerInfo,
    ProductAdditives,
    CommonGallery,
  },
  scrollToTop: true,
})
export default class PageProductBlock extends Vue {
  public $modal: any

  public sliderOptions: SwiperOptions = {
    loop: true,
    loopedSlides: 4,
  }

  public thumbsOptions: SwiperOptions = {
    loop: true,
    loopedSlides: 4,
  }

  @Prop({ default: () => {} })
  public product!: IProduct

  @Getter('favourite-products/favouriteProducts')
  public favouriteProductsIds!: number[]

  @Getter('auth/isAuthorized')
  public isAuthorized!: boolean

  @Action('favourite-products/updateFavouritesProducts')
  public updateFavouriteProducts!: (id: number) => void

  public get productName(): string {
    return this.product?.name || ''
  }

  public get productId(): number {
    return this.product?.id
  }

  public get shortDescription(): string {
    return this.product?.shortDescription || ''
  }

  public get images(): string[] {
    return (
      this.product?.images?.map((elem: IProductImage) => {
        return elem?.path?.original || ''
      }) || []
    )
  }

  public get video(): string {
    return this.product?.video || ''
  }

  public get downloadPdfLink(): string {
    return this.product?.pdf || ''
  }

  public get downloadPhotosLink(): string {
    return ''
  }

  public get isLikedProduct(): boolean {
    return this.favouriteProductsIds.includes(this.productId)
  }

  public get productBadges(): IProductBadge[] {
    return this.product?.productBadges.filter(
      (badge: IProductBadge) => !badge.primary
    )
  }

  public openInquiryModal(): void {
    const props = {
      image: (this.images && this.images[0]) || '',
      productId: this.product?.id,
    }

    this.$emit('openProductInquiry', props)
  }

  public downloadZip(): void {
    this.$emit('downloadZip', this.productId)
  }

  public downloadPresentation(): void {
    this.$emit('downloadPresentation', this.productId)
  }
}
</script>

<style lang="scss" scoped>
.product-block {
  width: 100%;

  &__content-container {
    margin-top: 68px;
  }

  &__name {
    margin-top: 16px;
  }

  &__description {
    margin-top: 16px;
    margin-bottom: 72px;
  }

  &__buttons {
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 80px;
    margin-bottom: 32px;
  }

  &__like-button {
    margin-left: 32px;
  }

  &__download-btn {
    margin-top: 10px;
  }
}

@include media-lg {
  .product-block {
    display: grid;
    grid-template-columns: 588px 1fr;
    gap: 24px;
    width: calc(100% - 24px);

    &__content-container {
      margin-top: 0;
    }

    &__buttons {
      display: flex;
      align-items: center;
      margin-bottom: 32px;

      &--last {
        margin-bottom: 42px;
      }
    }
  }
}
</style>
