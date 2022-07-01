<template>
  <div class="page page-general-offer">
    <Breadcrumbs :breadcrumbs="breadcrumbs" />

    <div class="page__wrapper">
      <div class="page__container">
        <h2
          class="
            page-general-offer__heading page-general-offer__heading--desktop
            h4
          "
          v-html="$sanitize($t('page_general_offer.title'))"
        />
        <h2
          class="
            page-general-offer__heading page-general-offer__heading--mobile
            h5
          "
          v-html="$sanitize($t('page_general_offer.title'))"
        />
        <p
          class="page-general-offer__description subtitle"
          v-html="$sanitize($t('page_general_offer.description'))"
        />
        <JobOfferForm />
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
import Breadcrumbs from '~/components/common/Breadcrumbs.vue'
import JobOfferForm from '~/components/forms/JobOfferForm.vue'

import storeFormMapper from '~/utils/store-form-mapper'

import { IBreadcrumb } from '~/types/breadcrumb.interface'
import { EStatus } from '~/constants/status'
import { EMessageTypes } from '~/constants/message-types'
import { IJobForm } from '~/types/job.interface'
import {
  TOKEN_JOB_OFFER_INQUIRY_ERROR,
  TOKEN_JOB_OFFER_INQUIRY_FORM,
  TOKEN_JOB_OFFER_INQUIRY_STATUS,
  TOKEN_JOB_OFFER_INQUIRY_SUBMIT,
} from '~/constants/tokens/job-offer-inquiry'

@Component({
  components: {
    Breadcrumbs,
    JobOfferForm,
  },
})
export default class PageGeneralOffer extends Vue {
  public $t: any
  public localePath: any

  @Getter('page-general-offer/form')
  public form!: IJobForm

  @Getter('page-general-offer/status')
  public status!: EStatus

  @Getter('page-general-offer/error')
  public error!: any

  @Getter('page-general-offer/message')
  public message!: string

  @Action('page-general-offer/sendJobInquiry')
  public sendJobInquiry!: () => Promise<void>

  @Action('page-general-offer/clearForm')
  public clearForm!: () => void

  @Provide(TOKEN_JOB_OFFER_INQUIRY_FORM)
  public get formSignUp() {
    return storeFormMapper({
      store: this.$store,
      getter: 'page-general-offer/form',
      action: 'page-general-offer/updateFormField',
      fields: ['email', 'name', 'phone', 'message', 'file'],
    })
  }

  @Provide(TOKEN_JOB_OFFER_INQUIRY_SUBMIT)
  public async formSubmit(): Promise<void> {
    await this.sendJobInquiry()

    switch (this.status) {
      case EStatus.SUCCESS: {
        this.$notify({
          text: this.$t('job_offer_form.success_send'),
          type: EMessageTypes.SUCCESS,
        })

        this.clearForm()
        break
      }
      case EStatus.ERROR: {
        if (this.error?.errors?.length) {
          this.error?.errors.forEach((error: string) => {
            this.$notify({
              text: error,
              type: EMessageTypes.DANGER,
            })
          })
        } else {
          this.$notify({
            text: this.$t('common.error'),
            type: EMessageTypes.DANGER,
          })
        }
        break
      }
    }
  }

  @ProvideReactive(TOKEN_JOB_OFFER_INQUIRY_ERROR)
  public get formError(): Error {
    return this.error
  }

  @ProvideReactive(TOKEN_JOB_OFFER_INQUIRY_STATUS)
  private get submitStatus(): EStatus {
    return this.status
  }

  public get breadcrumbs(): IBreadcrumb[] {
    return [
      {
        key: 'career',
        title: this.$t('breadcrumbs.career'),
        link: this.localePath({ name:'career' }),
      },
      {
        key: this.$route.params.pathMatch,
        title: this.$t('page_general_offer.title'),
        link: this.$route.params.pathMatch,
      },
    ]
  }

  public destroyed(): void {
    this.clearForm()
  }
}
</script>

<style lang="scss" scoped>
.page__wrapper {
  padding-top: 30px;
}

.page__container {
  max-width: 588px;
}

.page-general-offer {
  &__heading {
    text-align: center;

    &--desktop {
      display: none;
    }
  }

  &__description {
    margin: 32px 0 24px 0;
  }
}

@include media-lg {
  .page-general-offer {
    &__heading {
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
