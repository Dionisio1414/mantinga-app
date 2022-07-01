<template>
  <footer class="footer">
    <div class="footer__wrapper">
      <div class="footer__container">
        <FooterNewsletter />
        <div class="footer__links">
          <FooterCategories :title="$sanitize('Produktai')" :categories="categories" />
          <FooterLinks
            :category="$sanitize('Nuorodos')"
            :nav-items="footerNav"
          />
          <FooterSocialLinks :items="footerSocials" />
        </div>
      </div>
    </div>
    <FooterInfo />
  </footer>
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

import FooterNewsletter from './FooterNewsletter.vue'
import FooterLinks from './FooterLinks.vue'
import FooterSocialLinks from './FooterSocialLinks.vue'
import FooterInfo from './FooterInfo.vue'
import FooterCategories from './FooterCategories.vue'

import { IMenuItem } from '~/types/menu.interface'
import { EStatus } from '~/constants/status'

import {
  TOKEN_FOOTER_NEWSLETTER_ERROR,
  TOKEN_FOOTER_NEWSLETTER_FORM,
  TOKEN_FOOTER_NEWSLETTER_STATUS,
  TOKEN_FOOTER_NEWSLETTER_SUBMIT,
} from '~/constants/tokens/footer-newsletter'

import storeFormMapper from '~/utils/store-form-mapper'
import { EMessageTypes } from '~/constants/message-types'
import { ITaxon } from '~/types/taxons'

@Component({
  components: {
    FooterNewsletter,
    FooterLinks,
    FooterSocialLinks,
    FooterInfo,
    FooterCategories
  },
})
export default class ComponentFooter extends Vue {
  public $t: any;

  @Getter('menu/footerNav')
  public footerNav!: IMenuItem[]

  @Getter('menu/footerSocials')
  public footerSocials!: IMenuItem[]

  @Getter('footer-newsletter/form')
  public form!: { email: string }

  @Getter('footer-newsletter/status')
  public formStatus!: EStatus

  @Getter('footer-newsletter/error')
  public formError!: any

  @Getter('footer-newsletter/message')
  public message!: string

  @Getter('categories-list/allCategories')
  public categories!: ITaxon[]

  @Action('footer-newsletter/subscribeToNewsletter')
  public subscribeToNewsletter!: () => Promise<void>

  @Action('footer-newsletter/clearForm')
  public clearForm!: () => void

  @Provide(TOKEN_FOOTER_NEWSLETTER_FORM)
  public get formSignUp() {
    return storeFormMapper({
      store: this.$store,
      getter: 'footer-newsletter/form',
      action: 'footer-newsletter/updateFormField',
      fields: ['email'],
    })
  }

  @Provide(TOKEN_FOOTER_NEWSLETTER_SUBMIT)
  public async formSubmit(): Promise<void> {
    await this.subscribeToNewsletter()

    switch (this.formStatus) {
      case EStatus.SUCCESS: {
        this.$notify({
          text: this.message,
          type: EMessageTypes.SUCCESS,
        })

        this.clearForm();
        break
      }
      case EStatus.ERROR: {
        if (this.formError?.errors?.length) {
          this.formError?.errors.forEach((error: string) => {
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

  @ProvideReactive(TOKEN_FOOTER_NEWSLETTER_ERROR)
  public get formSignUpError(): Error {
    return this.formError
  }

  @ProvideReactive(TOKEN_FOOTER_NEWSLETTER_STATUS)
  private get submitStatus(): EStatus {
    return this.formStatus
  }
}
</script>

<style lang="scss" scoped>
.footer {
  margin-top: auto;
  background-color: $color-primary-regular;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 8px solid $color-golden;

  &__wrapper {
    padding: 64px 16px 48px 16px;
    width: 100%;
  }

  &__container {
    max-width: 1200px;
    margin: 0 auto;
  }
}

@include media-lg {
  .footer {
    border-top: none;

    &__wrapper {
      padding: 96px 120px;
    }

    &__links {
      padding: 15px 0px;
      width: 100%;
      display: flex;
      column-gap: 35px;
    }
  }
}
</style>
