<template>
  <form class="modal-newsletter-form" @submit.prevent="submitForm">
    <div class="modal-newsletter-form__form-item form-item">
      <FormInput
        v-model="form.email"
        name="email"
        :disabled="formDisabled"
        :invalid="$v.form.email.$dirty && $v.form.email.$invalid"
        :validations="$v.form.email"
        :label="$sanitize($t('modal_newsletter.input_label'))"
        @blur="touchField('email')"
      />
    </div>
    <div class="modal-newsletter-form__checkbox form-item">
      <input
        id="agree_terms"
        v-model="agreeWithTerms"
        class="form-checkbox"
        name="agree_terms"
        type="checkbox"
      />
      <label for="agree_terms">
        <span
          class="subtitle"
          v-html="$sanitize($t('modal_newsletter.checkbox_label'))"
        />
        <NuxtLink
          :to="{ path: `/${$t('routes.privacy_policy')}` }"
          class="modal-newsletter-form__link subtitle subtitle--link"
          v-html="$sanitize($t('modal_newsletter.checkbox_label_link'))"
        />
      </label>
    </div>
    <FormControlErrors
      v-if="$v.agreeWithTerms.$dirty && $v.agreeWithTerms.$invalid"
      :validations="$v.agreeWithTerms"
    />
    <div class="modal-newsletter-form__buttons">
      <button
        class="modal-newsletter-form__button btn btn--white"
        @click.prevent="cancel"
      >
        <span
          class="btn-title"
          v-html="$sanitize($t('modal_newsletter.cancel_btn'))"
        />
      </button>
      <button
        type="submit"
        class="modal-newsletter-form__button btn btn--secondary"
      >
        <span
          class="btn-title"
          v-html="$sanitize($t('modal_newsletter.submit_btn'))"
        />
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import {
  Component,
  Inject,
  InjectReactive,
  mixins,
} from 'nuxt-property-decorator'

import { FormInput, FormControlErrors } from '~/components/inputs'

import {
  TOKEN_MODAL_NEWSLETTER_ERROR,
  TOKEN_MODAL_NEWSLETTER_FORM,
  TOKEN_MODAL_NEWSLETTER_STATUS,
  TOKEN_MODAL_NEWSLETTER_SUBMIT,
} from '~/constants/tokens/modal-newsletter'
import { EStatus } from '~/constants/status'

import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'

const validations: any = function (): any {
  return {
    form: {
      email: { email, required },
    },
    agreeWithTerms: { agreeTo: (value: boolean) => value },
  }
}

@Component({
  validations,
  components: {
    FormInput,
    FormControlErrors,
  },
})
export default class ComponentModalNewsletterForm extends mixins(
  validationMixin
) {
  public agreeWithTerms: boolean = false

  @Inject(TOKEN_MODAL_NEWSLETTER_FORM)
  public readonly form!: { email: string }

  @Inject(TOKEN_MODAL_NEWSLETTER_SUBMIT)
  public onSubmit!: () => Promise<void>

  @InjectReactive(TOKEN_MODAL_NEWSLETTER_ERROR)
  public readonly formError!: Error

  @InjectReactive(TOKEN_MODAL_NEWSLETTER_STATUS)
  public readonly formStatus!: EStatus

  public get formDisabled(): boolean {
    return this.formStatus === EStatus.PROCESSING
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

  public cancel() {
    this.$emit('cancel')
  }
}
</script>

<style lang="scss" scoped>
.modal-newsletter-form {
  margin-top: 30px;
  width: 100%;

  &__form-item {
    margin-bottom: 25px;
  }

  &__checkbox {
    margin-left: 16px;
    margin-bottom: 20px;
  }

  &__buttons {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  &__button {
    &:first-child {
      margin-right: 12px;
    }

    &:last-child {
      margin-left: 12px;
    }
  }

  &__link {
    margin-left: 4px;
  }
}
</style>
