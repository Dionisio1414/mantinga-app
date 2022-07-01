<template>
  <div class="page page-login">
    <div class="page__wrapper">
      <div class="page__container">
        <AuthHeader :title="$t('page_forgot_password.title')" />
        <ForgotPasswordForm />
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
} from 'nuxt-property-decorator'
import AuthHeader from '~/components/auth/AuthHeader.vue'
import ForgotPasswordForm from '~/components/forms/ForgotPasswordForm.vue'

import {
  TOKEN_FORGOT_PASSWORD_FORM_ERROR,
  TOKEN_FORGOT_PASSWORD_FORM_FORM,
  TOKEN_FORGOT_PASSWORD_FORM_STATUS,
  TOKEN_FORGOT_PASSWORD_FORM_SUBMIT,
} from '~/constants/tokens/forgot-password-form'
import storeFormMapper from '~/utils/store-form-mapper'
import { EStatus } from '~/constants/status'
import { EMessageTypes } from '~/constants/message-types'

@Component({
  middleware: ['auth-guest-only'],
  layout: 'managersLayout',
  components: {
    AuthHeader,
    ForgotPasswordForm,
  },
})
export default class PageForgotPassword extends Vue {
  public localePath: any

  @Getter('page-forgot-password/form')
  public form!: { email: string }

  @Getter('page-forgot-password/status')
  public formStatus!: EStatus

  @Getter('page-forgot-password/error')
  public formError!: any

  @Getter('page-forgot-password/message')
  public message!: string

  @Action('page-forgot-password/sendEmail')
  public sendEmail!: () => Promise<void>

  @Action('page-forgot-password/clearForm')
  public clearForm!: () => void

  @Provide(TOKEN_FORGOT_PASSWORD_FORM_FORM)
  public get formSignUp() {
    return storeFormMapper({
      store: this.$store,
      getter: 'page-forgot-password/form',
      action: 'page-forgot-password/updateFormField',
      fields: ['email'],
    })
  }

  @Provide(TOKEN_FORGOT_PASSWORD_FORM_SUBMIT)
  public async formSubmit(): Promise<void> {
    await this.sendEmail()

    switch (this.formStatus) {
      case EStatus.SUCCESS: {
        this.$notify({
          text: this.$t('page_forgot_password.mail_send').toString(),
          type: EMessageTypes.INFO,
        })

        this.$router.push(this.localePath({ name: 'login' }))
        this.clearForm()
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
            text:
              this.formError?.response?.data?.message ||
              this.$t('common.error').toString(),
            type: EMessageTypes.DANGER,
          })
        }
        break
      }
    }
  }

  @ProvideReactive(TOKEN_FORGOT_PASSWORD_FORM_ERROR)
  public get formSignUpError(): Error {
    return this.formError
  }

  @ProvideReactive(TOKEN_FORGOT_PASSWORD_FORM_STATUS)
  private get submitStatus(): EStatus {
    return this.formStatus
  }

  public destroyed(): void {
      this.clearForm()
  }
}
</script>

<style lang="scss" scoped>
.page {
  min-height: 100%;
}

.page-login {
  &__header {
    text-align: center;
  }

  &__title {
    margin-top: 8px;

    &--desktop {
      display: none;
    }
  }
}

@include media-lg {
  .page-login {
    &__title {
      &--desktop {
        display: block;
      }

      &--mobile {
        display: none;
      }
    }
  }
}
</style>
