<template>
  <form class="product-inquiry-form">
    <div class="product-inquiry-form__grid">
      <div class="product-inquiry-form__inputs">
        <div class="form-item">
          <FormInput
            v-model="form.name"
            :label="$sanitize($t('modal_inquiry.name'))"
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
            :label="$sanitize($t('modal_inquiry.phone'))"
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
            :label="$sanitize($t('modal_inquiry.email'))"
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
            :label="$sanitize($t('modal_inquiry.message'))"
            name="message"
            :disabled="formDisabled"
            :invalid="$v.form.message.$dirty && $v.form.message.$invalid"
            :validations="$v.form.message"
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
          <label for="consent" v-html="$sanitize($t('modal_inquiry.gdpr'))" />
        </div>
        <FormControlErrors
          v-if="$v.consent.$dirty && $v.consent.$invalid"
          :validations="$v.consent"
        />
      </div>

      <div class="product-inquiry-form__img-container">
        <img
          class="product-inquiry-form__img"
          :src="image"
          alt="Product image"
        />
      </div>
    </div>
    <button
      :disabled="formDisabled"
      class="product-inquiry-form__button btn btn--secondary"
      @click.prevent="submitForm"
    >
      <span
        class="btn-title"
        v-html="$sanitize($t('modal_inquiry.send_request'))"
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
  Prop,
} from 'nuxt-property-decorator'
import { FormInput, FormTextarea, FormControlErrors } from '~/components/inputs'
import { validationMixin } from 'vuelidate'

import {
  TOKEN_MODAL_PRODUCT_INQUIRY_ERROR,
  TOKEN_MODAL_PRODUCT_INQUIRY_FORM,
  TOKEN_MODAL_PRODUCT_INQUIRY_STATUS,
  TOKEN_MODAL_PRODUCT_INQUIRY_SUBMIT,
} from '~/constants/tokens/modal-product-inquiry'

import { EStatus } from '~/constants/status'
import { required, email } from 'vuelidate/lib/validators'

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
export default class ComponentProductInquiryForm extends mixins(
  validationMixin
) {
  @Prop()
  public image!: string

  public consent: boolean = false

  @Inject(TOKEN_MODAL_PRODUCT_INQUIRY_FORM)
  public readonly form!: any

  @Inject(TOKEN_MODAL_PRODUCT_INQUIRY_SUBMIT)
  public onSubmit!: () => Promise<void>

  @InjectReactive(TOKEN_MODAL_PRODUCT_INQUIRY_ERROR)
  public readonly formError!: Error

  @InjectReactive(TOKEN_MODAL_PRODUCT_INQUIRY_STATUS)
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

  public cancel(): void {
    this.$emit('cancel')
  }

  public close(): void {
    this.$emit('close')
  }
}
</script>

<style lang="scss" scoped>
.product-inquiry-form {
  width: 100%;

  &__grid {
    display: grid;
    margin-top: 32px;
  }

  &__img-container {
    display: none;
    overflow: hidden;
    margin-left: 24px;
    max-height: 512px;
  }

  &__img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    object-position: center;
  }

  &__button {
    margin: 24px auto 32px auto;
  }

  &__checkbox {
    margin-left: 18px;
  }

  &__textarea {
    margin-bottom: 24px;
  }
}

@include media-lg {
  .product-inquiry-form {
    &__img-container {
      display: block;
    }

    &__grid {
      grid-template-columns: 1fr 1fr;
    }
  }
}
</style>
