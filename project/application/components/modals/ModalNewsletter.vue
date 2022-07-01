<template>
  <div class="modal-newsletter">
    <svg-icon
      class="modal-newsletter__icon"
      name="email"
      width="32"
      height="32"
    />
    <h2
      class="modal-newsletter__heading h5"
      v-html="$sanitize($t('modal_newsletter.header'))"
    />
    <p
      class="modal-newsletter__message body-text1"
      v-html="$sanitize($t('modal_newsletter.message'))"
    />

    <ModalNewsletterForm @cancel="closeModal" />
  </div>
</template>

<script lang="ts">
import {
  Action,
  Component,
  Getter,
  mixins,
  Provide,
  ProvideReactive,
} from 'nuxt-property-decorator'
import ModalNewsletterForm from '~/components/forms/ModalNewsletterForm.vue'

import MixinModal from '~/mixins/modalMixin'

import { EStatus } from '~/constants/status'

import {
  TOKEN_MODAL_NEWSLETTER_ERROR,
  TOKEN_MODAL_NEWSLETTER_FORM,
  TOKEN_MODAL_NEWSLETTER_STATUS,
  TOKEN_MODAL_NEWSLETTER_SUBMIT,
} from '~/constants/tokens/modal-newsletter'

import storeFormMapper from '~/utils/store-form-mapper'
import { saveTimeAfterSubscription } from '~/store-utils/newsletter'
import { EMessageTypes } from '~/constants/message-types'

@Component({
  components: {
    ModalNewsletterForm,
  },
})
export default class ComponentModalNewsletter extends mixins(MixinModal) {
  public $t: any;
  
  @Getter('modal-newsletter/form')
  public form!: { email: string }

  @Getter('modal-newsletter/status')
  public formStatus!: EStatus

  @Getter('modal-newsletter/error')
  public formError!: any

  @Getter('modal-newsletter/message')
  public message!: string

  @Action('modal-newsletter/subscribeToNewsletter')
  public subscribeToNewsletter!: () => Promise<void>

  @Action('modal-newsletter/clearForm')
  public clearForm!: () => void

  @Provide(TOKEN_MODAL_NEWSLETTER_FORM)
  public get formSignUp() {
    return storeFormMapper({
      store: this.$store,
      getter: 'modal-newsletter/form',
      action: 'modal-newsletter/updateFormField',
      fields: ['email'],
    })
  }

  @Provide(TOKEN_MODAL_NEWSLETTER_SUBMIT)
  public async formSubmit(): Promise<void> {
    await this.subscribeToNewsletter()

    switch (this.formStatus) {
      case EStatus.SUCCESS: {
        this.clearForm()
        this.$notify({
          text: this.message,
          type: EMessageTypes.SUCCESS,
        })
        this.closeModal()
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

  @ProvideReactive(TOKEN_MODAL_NEWSLETTER_ERROR)
  public get formSignUpError(): Error {
    return this.formError
  }

  @ProvideReactive(TOKEN_MODAL_NEWSLETTER_STATUS)
  private get submitStatus(): EStatus {
    return this.formStatus
  }

  public closeModal(): void {
    this.$emit('close')
  }

  public destroyed(): void {
    saveTimeAfterSubscription()
  }
}
</script>

<style lang="scss" scoped>
.modal-newsletter {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 16px;

  &__icon {
    color: $color-golden;
  }

  &__heading {
    margin-top: 16px;
    text-align: center;
  }

  &__message {
    margin-top: 16px;
    text-align: center;
  }
}
</style>
