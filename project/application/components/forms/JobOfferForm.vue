<template>
  <form class="job-offer-form">
    <div class="form-item">
      <FormInput
        v-model="form.name"
        :label="$sanitize($t('job_offer_form.name'))"
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
        :label="$sanitize($t('job_offer_form.phone'))"
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
        :label="$sanitize($t('job_offer_form.email'))"
        name="email"
        :disabled="formDisabled"
        :invalid="$v.form.email.$dirty && $v.form.email.$invalid"
        :validations="$v.form.email"
        @blur="touchField('email')"
      />
    </div>
    <div class="form-item job-offer-form__textarea">
      <FormTextarea
        v-model="form.message"
        :label="$sanitize($t('job_offer_form.message'))"
        name="message"
        :rows="3"
        :disabled="formDisabled"
        :invalid="$v.form.message.$dirty && $v.form.message.$invalid"
        :validations="$v.form.message"
        @blur="touchField('message')"
      />
    </div>
    <FileInput
      v-model="form.file"
      class="job-offer-form__file"
      accept-files=".doc, .docx, .odt, .pdf"
    />

    <div class="job-offer-form__checkbox form-item">
      <input
        id="consent1"
        v-model="consent1"
        class="form-checkbox"
        name="consent1"
        type="checkbox"
      />
      <label
        for="consent1"
        class="subtitle"
        v-html="$sanitize($t('job_offer_form.consent1'))"
      />
    </div>
    <FormControlErrors
      v-if="$v.consent1.$dirty && $v.consent1.$invalid"
      :validations="$v.consent1"
    />
    <div class="job-offer-form__checkbox form-item">
      <input
        id="consent2"
        v-model="consent2"
        class="form-checkbox"
        name="consent2"
        type="checkbox"
      />
      <label
        for="consent2"
        class="subtitle"
        v-html="$sanitize($t('job_offer_form.consent2'))"
      />
    </div>
    <FormControlErrors
      v-if="$v.consent2.$dirty && $v.consent2.$invalid"
      :validations="$v.consent2"
    />

    <p
      class="body-text3 job-offer-form__text"
      v-html="$sanitize($t('job_offer_form.text'))"
    />

    <button
      :disabled="formDisabled"
      class="job-offer-form__button btn btn--secondary"
      @click.prevent="submitForm"
    >
      <span
        class="btn-title"
        v-html="$sanitize($t('job_offer_form.send_request'))"
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
import {
  FormInput,
  FormTextarea,
  FormControlErrors,
  FileInput,
} from '~/components/inputs'
import { validationMixin } from 'vuelidate'

import {
  TOKEN_JOB_OFFER_INQUIRY_ERROR,
  TOKEN_JOB_OFFER_INQUIRY_FORM,
  TOKEN_JOB_OFFER_INQUIRY_STATUS,
  TOKEN_JOB_OFFER_INQUIRY_SUBMIT,
} from '~/constants/tokens/job-offer-inquiry'

import { EStatus } from '~/constants/status'
import { required, email } from 'vuelidate/lib/validators'
import { IJobForm } from '~/types/job.interface'

const validations: any = function (): any {
  return {
    form: {
      email: { email, required },
      name: { required },
      phone: {},
      message: { required },
      file: {},
    },
    consent1: { agreeTo: (value: boolean) => value },
    consent2: { agreeTo: (value: boolean) => value },
  }
}

@Component({
  validations,
  components: {
    FormInput,
    FormTextarea,
    FormControlErrors,
    FileInput,
  },
})
export default class ComponentJobOfferForm extends mixins(validationMixin) {
  public consent1: boolean = false
  public consent2: boolean = false

  @Inject(TOKEN_JOB_OFFER_INQUIRY_FORM)
  public readonly form!: IJobForm

  @Inject(TOKEN_JOB_OFFER_INQUIRY_SUBMIT)
  public onSubmit!: () => Promise<void>

  @InjectReactive(TOKEN_JOB_OFFER_INQUIRY_ERROR)
  public readonly formError!: Error

  @InjectReactive(TOKEN_JOB_OFFER_INQUIRY_STATUS)
  public readonly formStatus!: EStatus

  public get formDisabled(): boolean {
    return this.formStatus === EStatus.PROCESSING
  }

  @Watch('formStatus')
  public handleStatus(status: EStatus): void {
    if (status === EStatus.INIT) {
      this.$v.$reset()
      this.consent1 = this.consent2 = false
      this.$forceUpdate()
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

.job-offer-form {
  width: 100%;

  &__button {
    margin: 16px auto 32px auto;
  }

  &__checkbox {
    margin-left: 18px;
    margin-top: 32px;
    margin-bottom: 0;
  }

  &__textarea {
    margin-bottom: 24px;
  }

  &__file {
    margin: 40px 0 16px 0;
  }

  &__text {
    margin-top: 28px;
  }
}

@include media-lg {
  .job-offer-form {
    &__button {
      margin: 12px auto 32px auto;
    }
  }
}
</style>
