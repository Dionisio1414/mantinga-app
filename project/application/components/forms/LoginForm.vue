<template>
  <form
    autocomplete="new-password"
    class="login-form"
    @submit.prevent="submitForm"
  >
    <input
      type="search"
      name="hidden"
      autocomplete="new-password"
      style="display: none"
    />
    <div class="form-item">
      <FormInput
        v-model="form.email"
        name="email"
        :disabled="formDisabled"
        :invalid="$v.form.email.$dirty && $v.form.email.$invalid"
        :validations="$v.form.email"
        class="login-form__input"
        :label="$sanitize($t('page_login.email'))"
        @blur="touchField('email')"
      />
    </div>
    <div class="form-item">
      <FormSwitchablePassword
        v-model="form.password"
        name="password"
        :disabled="formDisabled"
        :invalid="$v.form.password.$dirty && $v.form.password.$invalid"
        :label="$sanitize($t('page_login.password'))"
        :validations="$v.form.password"
        @blur="touchField('password')"
      />
    </div>
    <NuxtLink to="/forgot-password"
      class="login-form__link body-text1 body-text1--link"
      v-html="$sanitize($t('page_login.forgot_password'))"
    />
    <button class="btn btn--secondary login-form__btn" type="submit">
      <span class="btn-title" v-html="$sanitize($t('common.buttons.login'))" />
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
  TOKEN_LOGIN_FORM_ERROR,
  TOKEN_LOGIN_FORM_FORM,
  TOKEN_LOGIN_FORM_STATUS,
  TOKEN_LOGIN_FORM_SUBMIT,
} from '~/constants/tokens/login-form'
import { EStatus } from '~/constants/status'

import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'

const validations: any = function (): any {
  return {
    form: {
      email: { email, required },
      password: { required },
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
  @Inject(TOKEN_LOGIN_FORM_FORM)
  public readonly form!: { email: string }

  @Inject(TOKEN_LOGIN_FORM_SUBMIT)
  public onSubmit!: () => Promise<void>

  @InjectReactive(TOKEN_LOGIN_FORM_ERROR)
  public readonly formError!: Error

  @InjectReactive(TOKEN_LOGIN_FORM_STATUS)
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
.login-form {
  max-width: 384px;
  margin: 34px auto 0 auto;

  &__link {
    display: block;
    text-align: right;
  }

  &__btn {
    margin: 36px auto 0 auto;
  }

  &__input {
    margin-bottom: 55px;
  }
}
</style>
