<template>
  <div class="page">
    <MobileBackButton :link="linkForBackButton" />
    <Breadcrumbs class="product-breadcrumbs" :breadcrumbs="breadcrumbs" />
    <div class="page__wrapper">
      <div class="page__container">
        <div class="product-inner">
          <ProductBlock
            :product="product"
            @openProductInquiry="openInquiryModal"
            @downloadZip="downloadImagesZip"
            @downloadPresentation="generatePdf"
          />
        </div>
        <SimilarProducts
          v-if="similarProducts && similarProducts.length"
          :products="similarProducts"
          class="product-inner__similar-products"
        />
        <ProductsRecipes
          v-if="recipes && recipes.length"
          :recipes="recipes"
          class="product-inner__products-recipes"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Action, Component, Getter, Watch } from 'nuxt-property-decorator'
import ModalProductInquiry from '~/components/modals/ModalProductInquiry.vue'
import SimilarProducts from '~/components/products/SimilarProducts.vue'
import ProductsRecipes from '~/components/products/ProductsRecipes.vue'
import Breadcrumbs from '~/components/common/Breadcrumbs.vue'
import ProductBlock from '~/components/products/ProductBlock.vue'
import ModalInfoLoader from '~/components/modals/ModalInfoLoader.vue'
import MobileBackButton from '~/components/common/MobileBackButton.vue'

import {
  CONFIRMATION_MODAL_CONFIG,
  PRODUCT_INQUIRY_MODAL_CONFIG,
} from '~/constants/modals-config'
import { IBreadcrumb } from '~/types/breadcrumb.interface'

import { IProduct, IProductCard } from '~/types/product.interface'
import { EStatus } from '~/constants/status'
import { IRecipe } from '~/types/recipes.interface'
import { EMessageTypes } from '~/constants/message-types'
import { ITaxon } from '~/types/taxons'

import { RawLocation } from 'vue-router';

@Component({
  components: {
    SimilarProducts,
    ProductsRecipes,
    Breadcrumbs,
    ProductBlock,
    MobileBackButton,
  },
  scrollToTop: true,
})
export default class PageProductInner extends Vue {
  public $modal: any
  public generateModalName: string = 'modal_progress_generate'
  public localePath: any

  @Getter('page-product-inner/product')
  public product!: IProduct

  @Getter('page-product-inner/recipes')
  public recipes!: IRecipe[]

  @Getter('page-product-inner/similarProducts')
  public similarProducts!: IProductCard[]

  @Getter('page-product-inner/generatingStatus')
  public generatingStatus!: EStatus

  @Getter('page-product-inner/status')
  public status!: EStatus

  @Getter('categories-list/allCategories')
  public allCategories!: ITaxon[]

  @Action('page-product-inner/downloadImagesZip')
  public downloadImagesZip!: (id: number) => Promise<void>

  @Action('page-product-inner/downloadPresentation')
  public downloadPresentation!: (id: number) => Promise<void>

  @Watch('generatingStatus')
  public handleIsGenerating(): void {
    if (
      this.generatingStatus === EStatus.SUCCESS ||
      this.generatingStatus === EStatus.ERROR
    ) {
      this.$modal.hide(this.generateModalName)
      this.showPresentationNotifications()
    }
  }

  public get productSubcategory(): any {
    return this.product?.category || null
  }

  public get productCategory(): any {
    return this.allCategories.find(
      (c: ITaxon) => c.id === this.productSubcategory.parentId
    )
  }

  public get linkToSubcategory(): RawLocation {
    return this.localePath({
      name: 'c-slug-subSlug',
      params: {
        slug: this.productCategory?.slug,
        subSlug: this.productSubcategory?.slug,
      },
    })
  }

  public get linkToCategory(): RawLocation {
    return this.localePath({
      name: 'c-slug',
      params: { slug: this.productCategory?.slug },
    })
  }

  public get breadcrumbs(): IBreadcrumb[] {
    return [
      {
        key: 'category',
        title: this.productCategory?.name || '',
        link: this.linkToCategory
      },
      {
        key: 'subcategory',
        title: this.productSubcategory?.name || '',
        link: this.linkToSubcategory
      },
      {
        key: 'product',
        title: this.product?.name || '',
        link: '/',
      },
    ]
  }

  public get linkForBackButton(): string {
    let result = this.localePath({ name: 'index' })

    if (this.productSubcategory && this.productCategory) {
      result = this.linkToCategory
    } else if (this.productCategory && !this.productSubcategory) {
      result = this.linkToSubcategory
    }

    return result
  }

  public async asyncData({ store, error, params }: any) {
    try {
      const { slug } = params

      await store.dispatch('page-product-inner/fetchProduct', slug)

      const id = store.getters['page-product-inner/product']?.id
      const requestsList = [
        store.dispatch('page-product-inner/fetchSimilarProducts', id),
        store.dispatch('page-product-inner/fetchRecipes', id),
      ]

      if (id) {
        await Promise.all(requestsList)
      }

      const status: EStatus = store.getters['page-product-inner/status']

      if (status === EStatus.ERROR) {
        const err: any = store.getters['page-product-inner/error']
        throw err
      }
    } catch (err) {
      error(err)
    }
  }

  public openInquiryModal(props: any): void {
    this.$modal.show(ModalProductInquiry, props, PRODUCT_INQUIRY_MODAL_CONFIG)
  }

  public generatePdf(id: number): void {
    const props = {
      message: this.$t('product_inner.presentation_generating').toString(),
    }

    this.$modal.show(ModalInfoLoader, props, {
      ...CONFIRMATION_MODAL_CONFIG,
      name: this.generateModalName,
    })

    this.downloadPresentation(id)
  }

  public showPresentationNotifications(): void {
    if (this.generatingStatus === EStatus.SUCCESS) {
      this.$notify({
        type: EMessageTypes.SUCCESS,
        text: this.$t('product_inner.presentation_success').toString(),
      })
    } else if (this.generatingStatus === EStatus.ERROR) {
      this.$notify({
        type: EMessageTypes.DANGER,
        text: this.$t('product_inner.presentation_error').toString(),
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.product-breadcrumbs {
  display: none;
}
.product-inner {
  width: 100%;

  &__similar-products {
    margin-top: 128px;
  }

  &__products-recipes {
    margin-top: 128px;
  }
}

@include media-lg {
  .product-breadcrumbs {
    display: block;
  }
}
</style>
