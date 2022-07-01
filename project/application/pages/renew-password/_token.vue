<template>
  <div class="page page-renew-password">
    <div class="page__wrapper">
      <div class="page__container">
        <AuthHeader :title="$t('page_renew_password.title')" />
        <ResetPasswordForm />
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
import ResetPasswordForm from '~/components/forms/ResetPasswordForm.vue'

import {
  TOKEN_RESET_PASSWORD_FORM_ERROR,
  TOKEN_RESET_PASSWORD_FORM_FORM,
  TOKEN_RESET_PASSWORD_FORM_STATUS,
  TOKEN_RESET_PASSWORD_FORM_SUBMIT,
} from '~/constants/tokens/reset-password-form'
import storeFormMapper from '~/utils/store-form-mapper'
import { EStatus } from '~/constants/status'
import { EMessageTypes } from '~/constants/message-types'

@Component({
  middleware: ['auth-guest-only'],
  layout: 'managersLayout',
  components: {
    AuthHeader,
    ResetPasswordForm,
  },
})
export default class PageRenewPassword extends Vue {
  public token!: string
  public localePath: any

  @Getter('page-reset-password/form')
  public form!: { email: string }

  @Getter('page-reset-password/status')
  public formStatus!: EStatus

  @Getter('page-reset-password/error')
  public formError!: any

  @Getter('page-reset-password/message')
  public message!: string

  @Action('page-reset-password/resetPassword')
  public resetPassword!: () => Promise<void>

  @Action('page-reset-password/clearForm')
  public clearForm!: () => void

  @Provide(TOKEN_RESET_PASSWORD_FORM_FORM)
  public get formSignUp() {
    return storeFormMapper({
      store: this.$store,
      getter: 'page-reset-password/form',
      action: 'page-reset-password/updateFormField',
      fields: ['password', 'passwordConfirmation'],
    })
  }

  @Provide(TOKEN_RESET_PASSWORD_FORM_SUBMIT)
  public async formSubmit(): Promise<void> {
    await this.resetPassword()

    switch (this.formStatus) {
      case EStatus.SUCCESS: {
        this.$notify({
          text: this.$t('page_reset_password.success_send').toString(),
          type: EMessageTypes.SUCCESS,
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

  @ProvideReactive(TOKEN_RESET_PASSWORD_FORM_ERROR)
  public get formSignUpError(): Error {
    return this.formError
  }

  @ProvideReactive(TOKEN_RESET_PASSWORD_FORM_STATUS)
  private get submitStatus(): EStatus {
    return this.formStatus
  }

  public async asyncData({ store, error, params, redirect, app }: any) {
    try {
      const token: string = params.token

      if (!token) redirect(app.localePath({ name: 'login'}))

      await store.dispatch('page-reset-password/setToken', token)
    } catch (err) {
      error(err)
    }
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
</style>
