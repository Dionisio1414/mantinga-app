<template>
  <div class="page">
    <div class="page__wrapper">
      <div class="page__container">
        <div class="products-page">
          <ManagerProductsTabs
            :selected-products-ids="selectedProductsIds"
            :total-items="pagination.totalItems"
            :all-products-params="allProductsParams"
          />
          <NuxtChild />
        </div>
      </div>
    </div>
    <ManagerProductsFooter
      :selected-products-ids="selectedProductsIds"
      :matched-locales="featuredProductsMatchedLocales"
      :selected-locale="selectedLocale"
      @selectLocale="selectLocale"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  Action,
  Component,
  Getter,
  Provide,
  Watch,
} from 'nuxt-property-decorator'
import ManagerProductsFooter from '~/components/manager-products/ManagerProductsFooter.vue'
import ManagerProductsTabs from '~/components/manager-products/ManagerProductsTabs.vue'
import ModalInfoLoader from '~/components/modals/ModalInfoLoader.vue'

import { IPagination } from '~/types/pagination.interface'
import { EStatus } from '~/constants/status'
import { IManagerProductsGetParams } from '~/types/manager-products.interface'
import { IDictionary } from '~/types/dictionary.interface'
import { TOKEN_MANAGER_DOWNLOAD_PRESENTATION } from '~/constants/tokens/manager-products'
import { CONFIRMATION_MODAL_CONFIG } from '~/constants/modals-config'
import { EMessageTypes } from '~/constants/message-types'

@Component({
  components: {
    ManagerProductsFooter,
    ManagerProductsTabs,
  },
  layout: 'managersLayout',
  middleware: ['auth-user-only'],
})
export default class PageManagerProducts extends Vue {
  public $modal: any
  public generateModalName: string = 'generate_modal_name'

  @Getter('page-manager-products/params')
  public allProductsParams!: IManagerProductsGetParams

  @Getter('page-manager-products/pagination')
  public pagination!: IPagination

  @Getter('manager-selected-products/selectedProductsIds')
  public selectedProductsIds!: number[]

  @Getter('page-manager-products/generatingStatus')
  public generatingStatus!: EStatus

  @Getter('manager-selected-products/matchedLocales')
  public featuredProductsMatchedLocales!: string[]

  @Getter('manager-selected-products/selectedLocale')
  public selectedLocale!: string

  @Action('page-manager-products/downloadPresentation')
  public downloadPresentation!: (id: number) => Promise<void>

  @Action('manager-selected-products/selectLocale')
  public selectLocale!: (locale: string) => void

  @Action('manager-selected-products/resetSelectedLocale')
  public resetSelectedLocale!: () => void

  @Provide(TOKEN_MANAGER_DOWNLOAD_PRESENTATION)
  public providedDownloadPresentation(id: number): void {
    const props = {
      message: this.$t('product_inner.presentation_generating').toString(),
    }

    this.$modal.show(ModalInfoLoader, props, {
      ...CONFIRMATION_MODAL_CONFIG,
      name: this.generateModalName,
    })

    this.downloadPresentation(id)
  }

  @Watch('generatingStatus')
  public handleIsGenerating(): void {
    if (
      this.generatingStatus === EStatus.SUCCESS ||
      this.generatingStatus === EStatus.ERROR
    ) {
      this.$modal.hide(this.generateModalName)
      this.showPresentationNotifications()
    }
  }

  @Watch('featuredProductsMatchedLocales')
  public handleMatchedLocales(): void {
    this.resetSelectedLocale();
  }

  public showPresentationNotifications(): void {
    if (this.generatingStatus === EStatus.SUCCESS) {
      this.$notify({
        type: EMessageTypes.SUCCESS,
        text: this.$t('product_inner.presentation_success').toString(),
      })
    } else if (this.generatingStatus === EStatus.ERROR) {
      this.$notify({
        type: EMessageTypes.DANGER,
        text: this.$t('product_inner.presentation_error').toString(),
      })
    }
  }

  public static routeQueryToFormValue(
    query: IDictionary<string>
  ): IDictionary<string> {
    const formValue: any = {}

    Object.entries(query).forEach(([field, value]) => {
      try {
        if (field === 'status') formValue[field] = +value
        else formValue[field] = value
      } catch (err) {
        console.warn(`Can't parse field '${field}'`)
      }
    })

    return formValue
  }

  public async asyncData({ store, error, query }: any) {
    try {
      const parsedForm: IManagerProductsGetParams =
        PageManagerProducts.routeQueryToFormValue(query as IDictionary<string>)

      await store.dispatch('page-manager-products/updateForm', parsedForm)

      const requestsList = [
        store.dispatch('page-manager-products/fetchProducts'),
      ]

      await Promise.all(requestsList)

      const status: EStatus = store.getters['page-manager-products/status']

      if (status === EStatus.ERROR) {
        const err: any = store.getters['page-manager-products/error']
        throw err
      }
    } catch (err) {
      error(err)
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  min-height: calc(100vh - $header-height-desktop-min);
}

.page__wrapper {
  padding-top: 40px;
}
</style>
