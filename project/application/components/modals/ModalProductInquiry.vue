<template>
  <div class="modal-inquiry">
    <button class="modal-inquiry__icon" @click="close">
      <svg-icon name="close" width="24" height="24" />
    </button>
    <h2
      class="modal-inquiry__heading h5"
      v-html="$sanitize($t('modal_inquiry.header'))"
    />
    <p
      class="modal-inquiry__message h6"
      v-html="$sanitize($t('modal_inquiry.subheader'))"
    />

    <ProductInquiryForm :image="image" />

    <div class="modal-inquiry__footer">
      <span
        class="body-text2 body-text2--bold"
        v-html="$sanitize($t('modal_inquiry.customer_service'))"
      />
      <span
        class="modal-inquiry__desktop-item body-text2"
        v-html="$sanitize($t('modal_inquiry.tel'))"
      />
      <span
        class="modal-inquiry__desktop-item body-text2"
        v-html="$sanitize($t('modal_inquiry.open_from'))"
      />
      <span
        class="modal-inquiry__desktop-item body-text2"
        v-html="$sanitize($t('modal_inquiry.not_working'))"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {
  Action,
  Component,
  Getter,
  mixins,
  Prop,
  Provide,
  ProvideReactive,
} from 'nuxt-property-decorator'
import ProductInquiryForm from '~/components/forms/ProductInquiryForm.vue'
import { EMessageTypes } from '~/constants/message-types'
import { EStatus } from '~/constants/status'

import MixinModal from '~/mixins/modalMixin'
import storeFormMapper from '~/utils/store-form-mapper'

import {
  TOKEN_MODAL_PRODUCT_INQUIRY_ERROR,
  TOKEN_MODAL_PRODUCT_INQUIRY_FORM,
  TOKEN_MODAL_PRODUCT_INQUIRY_STATUS,
  TOKEN_MODAL_PRODUCT_INQUIRY_SUBMIT,
} from '~/constants/tokens/modal-product-inquiry'

@Component({
  components: {
    ProductInquiryForm,
  },
})
export default class ComponentModalProductInquiry extends mixins(MixinModal) {
  @Prop()
  public image!: string

  @Prop()
  public productId!: number

  @Getter('modal-product-inquiry/form')
  public form!: { email: string }

  @Getter('modal-product-inquiry/status')
  public formStatus!: EStatus

  @Getter('modal-product-inquiry/error')
  public formError!: any

  @Getter('modal-product-inquiry/message')
  public message!: string

  @Action('modal-product-inquiry/productInquiry')
  public productInquiry!: (id: number) => Promise<void>

  @Action('modal-product-inquiry/clearForm')
  public clearForm!: () => void

  public $t: any

  @Provide(TOKEN_MODAL_PRODUCT_INQUIRY_FORM)
  public get formProvide() {
    return storeFormMapper({
      store: this.$store,
      getter: 'modal-product-inquiry/form',
      action: 'modal-product-inquiry/updateFormField',
      fields: ['email', 'name', 'phone', 'message', 'consent'],
    })
  }

  @Provide(TOKEN_MODAL_PRODUCT_INQUIRY_SUBMIT)
  public async formSubmit(): Promise<void> {
    await this.productInquiry(this.productId)

    switch (this.formStatus) {
      case EStatus.SUCCESS: {
        this.$notify({
          text: this.$t('modal_inquiry.success_send'),
          type: EMessageTypes.SUCCESS,
        })
        this.close()
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
            text: this.$t('common.error'),
            type: EMessageTypes.DANGER,
          })
        }
        break
      }
    }
  }

  @ProvideReactive(TOKEN_MODAL_PRODUCT_INQUIRY_ERROR)
  public get formSignUpError(): Error {
    return this.formError
  }

  @ProvideReactive(TOKEN_MODAL_PRODUCT_INQUIRY_STATUS)
  private get submitStatus(): EStatus {
    return this.formStatus
  }

  public close(): void {
    this.$emit('close')
  }

  public destroyed(): void {
    this.clearForm();
  }
}
</script>

<style lang="scss" scoped>
.modal-inquiry {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px;

  &__icon {
    color: $color-black;
    margin-left: auto;
  }

  &__message {
    margin-top: 16px;
    text-align: center;
  }

  &__footer {
    display: flex;
    gap: 24px;
    align-items: center;
  }

  &__desktop-item {
    display: none;
  }
}

@include media-lg {
  .modal-inquiry {
    &__desktop-item {
      display: inline-block;
    }
  }
}
</style>
