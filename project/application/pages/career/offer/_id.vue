<template>
  <div class="page page-offer">
    <Breadcrumbs :breadcrumbs="breadcrumbs" />

    <div class="page__wrapper">
      <div class="page__container">
        <h2 class="page-offer__heading h4" v-html="$sanitize(offerName)" />
      </div>
    </div>
    <ContentTypeRoot
      v-for="(contentType, index) in contentTypes"
      :key="index"
      :content-type="contentType"
    />
    <div class="page__wrapper">
      <div class="page__container">
        <h5
          class="h5 page-offer__form-name page-offer__form-name--desktop"
          v-html="$sanitize($t('page_offer.form_name'))"
        />
        <h5
          class="h6 page-offer__form-name page-offer__form-name--mobile"
          v-html="$sanitize($t('page_offer.form_name'))"
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
import ContentTypeRoot from '~/components/content-types/ContentTypeRoot.vue'
import JobOfferForm from '~/components/forms/JobOfferForm.vue'

import storeFormMapper from '~/utils/store-form-mapper'

import { IContentType } from '~/types/content-type.interface'
import { IBreadcrumb } from '~/types/breadcrumb.interface'
import { EStatus } from '~/constants/status'
import { EMessageTypes } from '~/constants/message-types'
import {
  IJobForm,
  IOfferResponse,
  IOfferTranslation,
} from '~/types/job.interface'
import {
  TOKEN_JOB_OFFER_INQUIRY_ERROR,
  TOKEN_JOB_OFFER_INQUIRY_FORM,
  TOKEN_JOB_OFFER_INQUIRY_STATUS,
  TOKEN_JOB_OFFER_INQUIRY_SUBMIT,
} from '~/constants/tokens/job-offer-inquiry'

@Component({
  components: {
    Breadcrumbs,
    ContentTypeRoot,
    JobOfferForm,
  },
})
export default class PageOffer extends Vue {
  public $t: any
  public $i18n: any
  public localePath: any;

  @Getter('page-offer/offer')
  public offer!: IOfferResponse

  @Getter('page-offer/form')
  public form!: IJobForm

  @Getter('page-offer/status')
  public status!: EStatus

  @Getter('page-offer/error')
  public error!: any

  @Getter('page-offer/message')
  public message!: string

  @Action('page-offer/sendJobInquiry')
  public sendJobInquiry!: () => Promise<void>

  @Action('page-offer/clearForm')
  public clearForm!: () => void

  @Provide(TOKEN_JOB_OFFER_INQUIRY_FORM)
  public get formSignUp() {
    return storeFormMapper({
      store: this.$store,
      getter: 'page-offer/form',
      action: 'page-offer/updateFormField',
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
        title: this.$t('breadcrumbs.career').toString(),
        link: this.localePath({ name: 'career' }),
      },
      {
        key: this.$route.params.pathMatch,
        title: this.offerName,
        link: this.$route.params.pathMatch,
      },
    ]
  }

  public get locale(): string {
    return this.$i18n?.locale || 'lt'
  }

  public get contentTypes(): IContentType[] {
    return this.offer?.translations?.[this.locale]?.contentType || []
  }

  public get offerTranslation(): IOfferTranslation {
    return this.offer?.translations?.[this.locale]
  }

  public get offerName(): string {
    return this.offerTranslation?.name || ''
  }

  public async asyncData({ store, error, params }: any) {
    const { id } = params

    try {
      const requestsList = [store.dispatch('page-offer/fetchOffer', id)]

      await Promise.all(requestsList)

      const status: EStatus = store.getters['page-offer/status']

      if (status === EStatus.ERROR) {
        const err: any = store.getters['page-offer/error']
        throw err
      }
    } catch (err) {
      error(err)
    }
  }
}
</script>

<style lang="scss" scoped>
.page__wrapper {
  padding-top: 30px;
  padding-bottom: 20px;
}

.page__container {
  max-width: 588px;
}
.page-offer {
  &__heading {
    text-align: center;
  }

  &__form-name {
    margin-bottom: 24px;

    &--desktop {
      display: none;
    }
  }
}

@include media-lg {
  .page-offer {
    &__form-name {
      &--desktop {
        display: inline-block;
      }
      &--mobile {
        display: none;
      }
    }
  }
}
</style>
