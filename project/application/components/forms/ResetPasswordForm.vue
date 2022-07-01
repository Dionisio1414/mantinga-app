<template>
  <form
    autocomplete="new-password"
    class="reset-password-form"
    @submit.prevent="submitForm"
  >
    <input
      type="search"
      name="hidden"
      autocomplete="new-password"
      style="display: none"
    />
    <div class="form-item">
      <FormSwitchablePassword
        v-model="form.password"
        name="password"
        :disabled="formDisabled"
        :invalid="$v.form.password.$dirty && $v.form.password.$invalid"
        :label="$sanitize($t('page_reset_password.new_password'))"
        :validations="$v.form.password"
        class="reset-password-form__input"
        @blur="touchField('password')"
      />
    </div>
    <div class="form-item">
      <FormSwitchablePassword
        v-model="form.passwordConfirmation"
        name="password_confirmation"
        :disabled="formDisabled"
        :invalid="
          $v.form.passwordConfirmation.$dirty &&
          $v.form.passwordConfirmation.$invalid
        "
        :label="$sanitize($t('page_reset_password.repeat_password'))"
        :validations="$v.form.passwordConfirmation"
        @blur="touchField('passwordConfirmation')"
      />
    </div>
    <button class="btn btn--secondary reset-password-form__btn" type="submit">
      <span
        class="btn-title"
        v-html="$sanitize($t('common.buttons.confirm'))"
      />
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

import { FormSwitchablePassword } from '~/components/inputs'

import {
  TOKEN_RESET_PASSWORD_FORM_ERROR,
  TOKEN_RESET_PASSWORD_FORM_FORM,
  TOKEN_RESET_PASSWORD_FORM_STATUS,
  TOKEN_RESET_PASSWORD_FORM_SUBMIT,
} from '~/constants/tokens/reset-password-form'
import { EStatus } from '~/constants/status'

import { validationMixin } from 'vuelidate'
import { required, sameAs } from 'vuelidate/lib/validators'

const validations: any = function (): any {
  return {
    form: {
      password: { required },
      passwordConfirmation: { required, sameAs: sameAs('password') },
    },
  }
}

@Component({
  validations,
  components: {
    FormSwitchablePassword,
  },
})
export default class ComponentModalLoginForm extends mixins(validationMixin) {
  @Inject(TOKEN_RESET_PASSWORD_FORM_FORM)
  public readonly form!: { email: string }

  @Inject(TOKEN_RESET_PASSWORD_FORM_SUBMIT)
  public onSubmit!: () => Promise<void>

  @InjectReactive(TOKEN_RESET_PASSWORD_FORM_ERROR)
  public readonly formError!: Error

  @InjectReactive(TOKEN_RESET_PASSWORD_FORM_STATUS)
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
.reset-password-form {
  max-width: 384px;
  margin: 34px auto 0 auto;

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
