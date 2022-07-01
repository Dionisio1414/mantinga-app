<template>
  <form class="product-inquiry-form">
    <h2
      class="product-inquiry-form__title h5"
      v-html="$sanitize($t('wishlist_inquiry.title'))"
    />
    <p
      class="product-inquiry-form__description subtitle"
      v-html="$sanitize($t('wishlist_inquiry.description'))"
    ></p>
    <div class="product-inquiry-form__inputs">
      <div class="form-item">
        <FormInput
          v-model="form.name"
          :label="$sanitize($t('wishlist_inquiry.name'))"
          name="name"
          :disabled="formDisabled"
          :invalid="$v.form.name.$dirty && $v.form.name.$invalid"
          :validations="$v.form.name"
          @blur="touchField('name')"
        />
      </div>
      <div class="form-item">
        <FormInput
          v-model="form.phone"
          :label="$sanitize($t('wishlist_inquiry.phone'))"
          name="phone"
          :disabled="formDisabled"
          :invalid="$v.form.phone.$dirty && $v.form.phone.$invalid"
          :validations="$v.form.phone"
          @blur="touchField('phone')"
        />
      </div>
      <div class="form-item">
        <FormInput
          v-model="form.email"
          :label="$sanitize($t('wishlist_inquiry.email'))"
          name="email"
          :disabled="formDisabled"
          :invalid="$v.form.email.$dirty && $v.form.email.$invalid"
          :validations="$v.form.email"
          @blur="touchField('email')"
        />
      </div>
      <div class="form-item product-inquiry-form__textarea">
        <FormTextarea
          v-model="form.message"
          :label="$sanitize($t('wishlist_inquiry.message'))"
          name="message"
          :disabled="formDisabled"
          :invalid="$v.form.message.$dirty && $v.form.message.$invalid"
          :validations="$v.form.message"
          :rows="4"
          @blur="touchField('message')"
        />
      </div>
      <div class="product-inquiry-form__checkbox form-item">
        <input
          id="consent"
          v-model="consent"
          class="form-checkbox"
          name="consent"
          type="checkbox"
        />
        <label for="consent" v-html="$sanitize($t('wishlist_inquiry.gdpr'))" />
      </div>
      <FormControlErrors
        v-if="$v.consent.$dirty && $v.consent.$invalid"
        :validations="$v.consent"
      />
    </div>
    <button
      :disabled="formDisabled"
      class="product-inquiry-form__button btn btn--secondary"
      @click.prevent="submitForm"
    >
      <span
        class="btn-title"
        v-html="$sanitize($t('wishlist_inquiry.send_request'))"
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
import { FormInput, FormTextarea, FormControlErrors } from '~/components/inputs'
import { validationMixin } from 'vuelidate'

import {
  TOKEN_MODAL_WISHLIST_INQUIRY_ERROR,
  TOKEN_MODAL_WISHLIST_INQUIRY_FORM,
  TOKEN_MODAL_WISHLIST_INQUIRY_STATUS,
  TOKEN_MODAL_WISHLIST_INQUIRY_SUBMIT,
} from '~/constants/tokens/wishlist-inquiry'

import { EStatus } from '~/constants/status'
import { required, email } from 'vuelidate/lib/validators'
import { IProductInquiryRequest } from '~/types/product-inquiry.interface'

const validations: any = function (): any {
  return {
    form: {
      email: { email, required },
      name: { required },
      phone: {},
      message: { required },
    },
    consent: { agreeTo: (value: boolean) => value },
  }
}

@Component({
  validations,
  components: {
    FormInput,
    FormTextarea,
    FormControlErrors,
  },
})
export default class ComponentWishlistInquiryForm extends mixins(
  validationMixin
) {
  public consent: boolean = false

  @Inject(TOKEN_MODAL_WISHLIST_INQUIRY_FORM)
  public readonly form!: IProductInquiryRequest

  @Inject(TOKEN_MODAL_WISHLIST_INQUIRY_SUBMIT)
  public onSubmit!: () => Promise<void>

  @InjectReactive(TOKEN_MODAL_WISHLIST_INQUIRY_ERROR)
  public readonly formError!: Error

  @InjectReactive(TOKEN_MODAL_WISHLIST_INQUIRY_STATUS)
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
.form-item {
  margin-bottom: 48px;
}

.product-inquiry-form {
  width: 100%;
  padding: 48px 16px 8px 16px;

  &__title {
    margin-bottom: 16px;
    text-align: center;
  }

  &__description {
    margin-bottom: 24px;
    text-align: center;
  }

  &__button {
    margin: 35px auto 32px auto;
  }

  &__checkbox {
    margin-left: 18px;
    margin-bottom: 0;
  }

  &__textarea {
    margin-bottom: 24px;
  }
}

@include media-lg {
  .product-inquiry-form {
    padding: 0;

    &__title {
      margin-bottom: 16px;
      text-align: left;
    }

    &__description {
      margin-bottom: 24px;
      text-align: left;
    }

    &__button {
      margin: 35px 0 32px 0;
    }
  }
}
</style>
