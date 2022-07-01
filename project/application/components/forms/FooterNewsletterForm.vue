<template>
  <form class="footer-newsletter-form" @submit.prevent="submitForm">
    <div class="footer-newsletter-form__row">
      <FormInput
        v-model="form.email"
        name="email"
        :disabled="formDisabled"
        :classes="'form-control--dark'"
        :invalid="$v.form.email.$dirty && $v.form.email.$invalid"
        :label="$sanitize($t('footer.newsletter.form.input_label'))"
        :validations="$v.form.email"
        @blur="touchField('email')"
      />
      <button
        class="footer-newsletter-form__btn-desktop btn btn--secondary"
        @click="submitForm"
      >
        <span
          class="btn-title"
          v-html="$sanitize($t('footer.newsletter.form.button'))"
        />
      </button>
    </div>
    <div class="form-item footer-newsletter-form__checkbox">
      <input
        id="agree_with"
        v-model="agreeWithTerms"
        class="form-checkbox form-checkbox--dark"
        name="agree_with"
        type="checkbox"
      />
      <label for="agree_with">
        <span v-html="$sanitize($t('footer.newsletter.form.checkbox_label'))" />
        <NuxtLink
          :to="{ path: `/${$t('routes.privacy_policy')}` }"
          class="footer-newsletter-form__link"
          href="#"
          v-html="$sanitize($t('footer.newsletter.form.privacy'))"
        />
      </label>
    </div>

    <FormControlErrors
      v-if="$v.agreeWithTerms.$dirty && $v.agreeWithTerms.$invalid"
      :validations="$v.agreeWithTerms"
    />

    <button
      class="footer-newsletter-form__btn-mobile btn btn--secondary"
      @click="submitForm"
    >
      <span
        class="btn-title"
        v-html="$sanitize($t('footer.newsletter.form.button'))"
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

import { FormInput, FormControlErrors } from '~/components/inputs'

import {
  TOKEN_FOOTER_NEWSLETTER_ERROR,
  TOKEN_FOOTER_NEWSLETTER_FORM,
  TOKEN_FOOTER_NEWSLETTER_STATUS,
  TOKEN_FOOTER_NEWSLETTER_SUBMIT,
} from '~/constants/tokens/footer-newsletter'
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
export default class ComponentFooterNewsletterForm extends mixins(
  validationMixin
) {
  public agreeWithTerms: boolean = false

  @Inject(TOKEN_FOOTER_NEWSLETTER_FORM)
  public readonly form!: { email: string }

  @Inject(TOKEN_FOOTER_NEWSLETTER_SUBMIT)
  public onSubmit!: () => Promise<void>

  @InjectReactive(TOKEN_FOOTER_NEWSLETTER_ERROR)
  public readonly formError!: Error

  @InjectReactive(TOKEN_FOOTER_NEWSLETTER_STATUS)
  public readonly formStatus!: EStatus

  public get formDisabled(): boolean {
    return this.formStatus === EStatus.PROCESSING
  }

  @Watch('formStatus')
  public handleStatus(status: EStatus): void {
    if (status === EStatus.SUCCESS) {
      this.$v.$reset()
    }
  }

  public async submitForm(): Promise<void> {
    if (this.formStatus === EStatus.PROCESSING || this.$v.$invalid) {
      this.$v.$touch()
      return
    }
    await this.onSubmit()
  }

  public touchField(fieldName: string): void {
    this.$v.form[fieldName]!.$touch()
  }
}
</script>

<style lang="scss" scoped>
.footer-newsletter-form {
  width: 100%;
  &__row {
    margin-bottom: 20px;
  }

  &__btn-desktop {
    display: none;
  }

  &__btn-mobile {
    margin: 0 auto;
  }

  &__link {
    text-decoration: underline;
    margin-left: 4px;
  }
}

@include media-lg {
  .footer-newsletter-form {
    max-width: 592px;
    &__row {
      display: grid;
      grid-template-columns: 1fr auto;
    }

    &__btn-desktop {
      display: flex;
      margin-left: 16px;
      height: 48px;
    }

    &__btn-mobile {
      display: none;
    }

    &__checkbox {
      margin-bottom: 20px;
      margin-left: 23px;
    }
  }
}
</style>
