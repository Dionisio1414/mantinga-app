<template>
  <form
    autocomplete="new-password"
    class="forgot-password-form"
    @submit.prevent="submitForm"
  >
    <input
      type="search"
      name="hidden"
      autocomplete="new-password"
      style="display: none"
    />
    <p class="forgot-password-form__description subtitle" v-html="$sanitize($t('page_forgot_password.description'))" />

    <div class="form-item">
      <FormInput
        v-model="form.email"
        name="email"
        :disabled="formDisabled"
        :invalid="$v.form.email.$dirty && $v.form.email.$invalid"
        :validations="$v.form.email"
        class="forgot-password-form__input"
        :label="$sanitize($t('page_login.email'))"
        @blur="touchField('email')"
      />
    </div>
    <button class="btn btn--secondary forgot-password-form__btn" type="submit">
      <span class="btn-title" v-html="$sanitize($t('common.buttons.send'))" />
    </button>
  </form>
</template>

<script lang="ts">
import {
  Component,
  Inject,
  InjectReactive,
  mixins,
  Watch,
} from 'nuxt-property-decorator'

import {
  FormInput,
  FormControlErrors,
  FormSwitchablePassword,
} from '~/components/inputs'

import {
  TOKEN_FORGOT_PASSWORD_FORM_ERROR,
  TOKEN_FORGOT_PASSWORD_FORM_FORM,
  TOKEN_FORGOT_PASSWORD_FORM_STATUS,
  TOKEN_FORGOT_PASSWORD_FORM_SUBMIT,
} from '~/constants/tokens/forgot-password-form'
import { EStatus } from '~/constants/status'

import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'

const validations: any = function (): any {
  return {
    form: {
      email: { email, required },
    },
  }
}

@Component({
  validations,
  components: {
    FormInput,
    FormSwitchablePassword,
    FormControlErrors,
  },
})
export default class ComponentModalLoginForm extends mixins(validationMixin) {
  @Inject(TOKEN_FORGOT_PASSWORD_FORM_FORM)
  public readonly form!: { email: string }

  @Inject(TOKEN_FORGOT_PASSWORD_FORM_SUBMIT)
  public onSubmit!: () => Promise<void>

  @InjectReactive(TOKEN_FORGOT_PASSWORD_FORM_ERROR)
  public readonly formError!: Error

  @InjectReactive(TOKEN_FORGOT_PASSWORD_FORM_STATUS)
  public readonly formStatus!: EStatus

  public get formDisabled(): boolean {
    return this.formStatus === EStatus.PROCESSING
  }

  @Watch('formStatus')
  public handleStatus(): void {
    if (this.formStatus === EStatus.SUCCESS) this.$v.$reset()
  }

  public submitForm(): void {
    if (this.formStatus === EStatus.PROCESSING || this.$v.$invalid) {
      this.$v.$touch()
      return
    }
    this.onSubmit()
  }

  public touchField(fieldName: string): void {
    this.$v.form[fieldName]!.$touch()
  }
}
</script>

<style lang="scss" scoped>
.forgot-password-form {
  max-width: 384px;
  margin: 24px auto 0 auto;

  &__btn {
    margin: 36px auto 0 auto;
  }

  &__input {
    margin-bottom: 55px;
  }

  &__description {
      padding-bottom: 24px;
      text-align: center;
  }
}
</style>
