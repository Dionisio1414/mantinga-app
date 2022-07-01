<template>
  <div class="page page-wishlist">
    <Breadcrumbs :breadcrumbs="breadcrumbs" />
    <div class="page__wrapper">
      <div class="page__container">
        <div class="page-wishlist__grid">
          <WishlistProducts
            :products="productsList"
            @deleteProduct="deleteProduct"
            @generatePdf="generatePdf"
          />
          <WishlistInquiryForm />
        </div>
        <WishlistFooter />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  Action,
  Component,
  Getter,
  Provide,
  ProvideReactive,
  Watch,
} from 'nuxt-property-decorator'
import Breadcrumbs from '~/components/common/Breadcrumbs.vue'
import WishlistProducts from '~/components/wishlist/WishlistProducts.vue'
import WishlistFooter from '~/components/wishlist/WishlistFooter.vue'
import WishlistInquiryForm from '~/components/forms/WishlistInquiryForm.vue'
import ModalInfoLoader from '~/components/modals/ModalInfoLoader.vue'

import { IBreadcrumb } from '~/types/breadcrumb.interface'

import {
  TOKEN_MODAL_WISHLIST_INQUIRY_ERROR,
  TOKEN_MODAL_WISHLIST_INQUIRY_FORM,
  TOKEN_MODAL_WISHLIST_INQUIRY_STATUS,
  TOKEN_MODAL_WISHLIST_INQUIRY_SUBMIT,
} from '~/constants/tokens/wishlist-inquiry'
import { EStatus } from '~/constants/status'
import { EMessageTypes } from '~/constants/message-types'
import storeFormMapper from '~/utils/store-form-mapper'
import { CONFIRMATION_MODAL_CONFIG } from '~/constants/modals-config'

import { IManagerProduct } from '~/types/manager-products.interface'

@Component({
  components: {
    Breadcrumbs,
    WishlistProducts,
    WishlistInquiryForm,
    WishlistFooter,
  },
})
export default class PageWishlist extends Vue {
  public $t: any
  public $modal: any
  public generateModalName: string = 'modal_progress_generate'
  public localePath: any

  @Getter('page-wishlist/productsList')
  public productsList!: IManagerProduct[]

  @Getter('favourite-products/favouriteProducts')
  public favouriteProducts!: number[]

  @Getter('page-wishlist/form')
  public form!: any

  @Getter('page-wishlist/status')
  public formStatus!: EStatus

  @Getter('page-wishlist/error')
  public formError!: any

  @Getter('page-wishlist/message')
  public message!: string

  @Getter('page-wishlist/generatingStatus')
  public generatingStatus!: EStatus

  @Action('favourite-products/updateFavouritesProducts')
  public updateFavouriteProducts!: (id: number) => void

  @Action('page-wishlist/fetchProducts')
  public fetchProducts!: () => Promise<void>

  @Action('page-wishlist/productInquiry')
  public productInquiry!: () => Promise<void>

  @Action('page-wishlist/clearForm')
  public clearForm!: () => void

  @Action('page-wishlist/updateProductsList')
  public updateProductsList!: (productId: number) => void

  @Action('page-wishlist/downloadPresentation')
  public downloadPresentation!: () => void

  @Action('favourite-products/clearFavouriteProducts')
  public clearFavouriteProducts!: () => void

  @Provide(TOKEN_MODAL_WISHLIST_INQUIRY_FORM)
  public get formProvide() {
    return storeFormMapper({
      store: this.$store,
      getter: 'page-wishlist/form',
      action: 'page-wishlist/updateFormField',
      fields: ['email', 'name', 'phone', 'message', 'consent'],
    })
  }

  @Provide(TOKEN_MODAL_WISHLIST_INQUIRY_SUBMIT)
  public async formSubmit(): Promise<void> {
    await this.productInquiry()

    switch (this.formStatus) {
      case EStatus.SUCCESS: {
        this.$notify({
          type: EMessageTypes.SUCCESS,
          text: this.$t('page_wishlist.form_success').toString(),
        })
        this.clearForm();
        this.clearFavouriteProducts();
        this.$router.push(this.localePath({ name: 'index' }))

        break
      }
      case EStatus.ERROR: {
        if (this.formError?.errors?.length) {
          this.formError?.errors.forEach((error: string) => {
            this.$notify({
              text: error,
              type: EMessageTypes.DANGER,
            })
          })
        } else {
          this.$notify({
            type: EMessageTypes.DANGER,
            text: this.$t('page_wishlist.form_error').toString(),
          })
        }
        break
      }
    }
  }

  @ProvideReactive(TOKEN_MODAL_WISHLIST_INQUIRY_ERROR)
  public get error(): Error {
    return this.formError
  }

  @ProvideReactive(TOKEN_MODAL_WISHLIST_INQUIRY_STATUS)
  private get status(): EStatus {
    return this.formStatus
  }

  @Watch('favouriteProducts')
  public handleProductsLength(products: number[]): void {
    if (!products.length) this.$router.push(this.localePath({ name: 'index' }))
  }

  @Watch('generatingStatus')
  public handleIsGenerating(): void {
    if (this.generatingStatus === EStatus.SUCCESS || this.generatingStatus === EStatus.ERROR) {
      this.$modal.hide(this.generateModalName)
      this.showPresentationNotifications()
    }
  }

  public get breadcrumbs(): IBreadcrumb[] {
    return [
      {
        key: this.$route.params.pathMatch,
        title: this.$t('breadcrumbs.wishlist').toString(),
        link: this.$route.params.pathMatch,
      },
    ]
  }

  public async asyncData({ store, error }: any) {
    try {
      const requestList = [store.dispatch('page-wishlist/fetchProducts')]

      await Promise.all(requestList)

      const status: EStatus = store.getters['page-wishlist/status']

      if (status === EStatus.ERROR) {
        const err: any = store.getters['page-wishlist/error']
        throw err
      }
    } catch (err) {
      error(err)
    }
  }

  public deleteProduct(productId: number): void {
    this.updateFavouriteProducts(productId)
    this.updateProductsList(productId)
  }

  public generatePdf(): void {
    const props = {
      message: this.$t('page_wishlist.presentation_generating').toString(),
    }

    this.$modal.show(ModalInfoLoader, props, {
      ...CONFIRMATION_MODAL_CONFIG,
      name: this.generateModalName,
    })

    this.downloadPresentation()
  }

  public showPresentationNotifications(): void {
    if (this.generatingStatus === EStatus.SUCCESS) {
      this.$notify({
        type: EMessageTypes.SUCCESS,
        text: this.$t('page_wishlist.presentation_success').toString(),
      })
    } else if (this.generatingStatus === EStatus.ERROR) {
      this.$notify({
        type: EMessageTypes.DANGER,
        text: this.$t('page_wishlist.presentation_error').toString(),
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.page__wrapper {
  padding: 0px 0 48px 0;
}

.breadcrumbs {
  padding-top: 10px;
}

@include media-lg {
  .page__wrapper {
    padding: 32px 120px 90px 120px;
  }

  .breadcrumbs {
    padding-top: 0px;
  }

  .page-wishlist {
    &__grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
    }
  }
}
</style>
