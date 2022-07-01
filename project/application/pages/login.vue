<template>
  <div class="page page-login">
    <div class="page__wrapper">
      <div class="page__container">
        <AuthHeader :title="$t('page_login.title')" />
        <LoginForm />
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
import LoginForm from '~/components/forms/LoginForm.vue'
import AuthHeader from '~/components/auth/AuthHeader.vue'

import {
  TOKEN_LOGIN_FORM_ERROR,
  TOKEN_LOGIN_FORM_FORM,
  TOKEN_LOGIN_FORM_STATUS,
  TOKEN_LOGIN_FORM_SUBMIT,
} from '~/constants/tokens/login-form'
import storeFormMapper from '~/utils/store-form-mapper'
import { EStatus } from '~/constants/status'
import { EMessageTypes } from '~/constants/message-types'
import { IUserInfo } from '~/types/user-info.interface'

@Component({
  middleware: ['auth-guest-only'],
  layout: 'managersLayout',
  components: {
    LoginForm,
    AuthHeader
  },
})
export default class PageLogin extends Vue {
  public localePath: any
  
  @Getter('page-login/form')
  public form!: { email: string }

  @Getter('page-login/status')
  public formStatus!: EStatus

  @Getter('page-login/error')
  public formError!: any

  @Getter('page-login/message')
  public message!: string

  @Getter('user-info/userInfo')
  public userInfo!: IUserInfo

  @Action('page-login/login')
  public login!: () => Promise<void>

  @Action('page-login/clearForm')
  public clearForm!: () => void

  @Action('user-info/fetchUserInfo')
  public fetchUserInfo!: () => Promise<void>

  @Provide(TOKEN_LOGIN_FORM_FORM)
  public get formSignUp() {
    return storeFormMapper({
      store: this.$store,
      getter: 'page-login/form',
      action: 'page-login/updateFormField',
      fields: ['email', 'password'],
    })
  }

  @Provide(TOKEN_LOGIN_FORM_SUBMIT)
  public async formSubmit(): Promise<void> {
    await this.login()

    switch (this.formStatus) {
      case EStatus.SUCCESS: {
        this.$notify({
          text: this.$t('page_login.success_login').toString(),
          type: EMessageTypes.SUCCESS,
        })

        await this.fetchUserInfo()
        this.$router.push(this.localePath({name: 'manager-products' }))
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

  @ProvideReactive(TOKEN_LOGIN_FORM_ERROR)
  public get formSignUpError(): Error {
    return this.formError
  }

  @ProvideReactive(TOKEN_LOGIN_FORM_STATUS)
  private get submitStatus(): EStatus {
    return this.formStatus
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
