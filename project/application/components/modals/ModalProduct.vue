<template>
  <div class="modal-product">
    <button class="modal-product__close-btn" @click="closeModal">
      <svg-icon name="close" width="24" height="24" />
    </button>
    <ProductBlock
      :product="product"
      @openProductInquiry="openInquiryModal"
      @downloadZip="downloadImagesZip"
      @downloadPresentation="generatePdf"
    />
  </div>
</template>

<script lang="ts">
import {
  Action,
  Component,
  Getter,
  mixins,
  Prop,
  Watch,
} from 'nuxt-property-decorator'
import ProductBlock from '~/components/products/ProductBlock.vue'
import ModalProductInquiry from '~/components/modals/ModalProductInquiry.vue'
import ModalInfoLoader from '~/components/modals/ModalInfoLoader.vue'

import { IProduct } from '~/types/product.interface'

import MixinModal from '~/mixins/modalMixin'
import {
  CONFIRMATION_MODAL_CONFIG,
  PRODUCT_INQUIRY_MODAL_CONFIG,
} from '~/constants/modals-config'
import { EStatus } from '~/constants/status'
import { EMessageTypes } from '~/constants/message-types'

@Component({
  components: {
    ProductBlock,
  },
})
export default class ComponentModalProduct extends mixins(MixinModal) {
  public $modal: any
  public generateModalName: string = 'modal_progress_generate'

  @Prop()
  public product!: IProduct

  @Getter('page-product-inner/status')
  public status!: EStatus

  @Getter('page-product-inner/generatingStatus')
  public generatingStatus!: EStatus

  @Action('page-product-inner/downloadImagesZip')
  public downloadImagesZip!: (id: number) => Promise<void>

  @Action('page-product-inner/downloadPresentation')
  public downloadPresentation!: (id: number) => Promise<void>

  @Watch('generatingStatus')
  public handleIsGenerating(): void {
    if (this.generatingStatus === EStatus.SUCCESS || this.generatingStatus === EStatus.ERROR) {
      this.$modal.hide(this.generateModalName)
      this.showPresentationNotifications()
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

  public closeModal(): void {
    this.$emit('close')
  }
}
</script>

<style lang="scss" scoped>
.modal-product {
  width: 100%;
  overflow: auto;
  padding: 56px 32px;
  position: relative;

  &__close-btn {
    position: absolute;
    top: 32px;
    right: 32px;
    z-index: 1200;
  }
}
</style>
