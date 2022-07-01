<template>
  <div class="products-page">
    <ManagersTable
      class="products-page__table"
      :products="products"
      :selected-products-ids="selectedProductsIds"
      :pagination="pagination"
      :is-selected-all="true"
      @changePage="handleChangePage"
      @toggleRow="toggleProduct"
      @toggleAll="toggleAllProducts"
      @onClickProduct="openProductModal"
      @downloadPresentation="downloadPresentation"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Action, Component, Getter, Inject, Watch } from 'nuxt-property-decorator'
import ManagersTable from '~/components/tables/ManagersTable.vue'
import ManagerProductsFooter from '~/components/manager-products/ManagerProductsFooter.vue'
import ModalProduct from '~/components/modals/ModalProduct.vue'
import ManagerProductsTabs from '~/components/manager-products/ManagerProductsTabs.vue'
import ManagerProductsFilters from '~/components/manager-products/ManagerProductsFilters.vue'
import PageManagerProducts from '../products.vue'

import { IManagerTableRowToggle } from '~/types/manager-table.interface'
import { IManagerProduct, IManagerProductsGetParams } from '~/types/manager-products.interface'
import { PRODUCT_MODAL_CONFIG } from '~/constants/modals-config'
import { EStatus } from '~/constants/status'
import { IProduct } from '~/types/product.interface'

import { IUpdateFieldPayload } from '~/types/forms/update-field-payload.interface'
import { IPagination } from '~/types/pagination.interface'
import { IDictionary } from '~/types/dictionary.interface'
import { TOKEN_MANAGER_DOWNLOAD_PRESENTATION } from '~/constants/tokens/manager-products'
import { EMessageTypes } from '~/constants/message-types'

@Component({
  components: {
    ManagersTable,
    ManagerProductsFooter,
    ManagerProductsTabs,
    ManagerProductsFilters,
  },
  layout: 'managersLayout',
  middleware: ['auth-user-only'],
})
export default class PageManagerProductsFeatured extends Vue {
  public $modal: any
  public localePath: any

  @Getter('page-manager-featured-products/products')
  public products!: IManagerProduct[]

  @Getter('page-manager-featured-products/currentProduct')
  public currentProduct!: IProduct

  @Getter('page-manager-featured-products/pagination')
  public pagination!: IPagination

  @Getter('manager-selected-products/selectedProductsIds')
  public selectedProductsIds!: number[]

  @Getter('page-manager-featured-products/isSelectedAll')
  public isSelectedAll!: boolean

  @Getter('page-manager-products/params')
  public allProductsParams!: IManagerProductsGetParams

  @Action('page-manager-featured-products/fetchProductById')
  public fetchProductById!: (id: number) => Promise<void>

  @Action('page-manager-featured-products/fetchProducts')
  public fetchProducts!: () => Promise<void>

  @Action('page-manager-featured-products/updateFormField')
  public updateFormField!: (payload: IUpdateFieldPayload<any>) => void

  @Action('manager-selected-products/toggleProduct')
  public toggleProduct!: (payload: IManagerTableRowToggle) => void

  @Action('page-manager-featured-products/toggleAllProducts')
  public toggleAllProducts!: (payload: boolean) => void

  @Action('page-manager-products/setForm')
  public setForm!: (payload: IDictionary<string>) => void

  @Inject(TOKEN_MANAGER_DOWNLOAD_PRESENTATION)
  public downloadPresentation!: (id: number) => void

  @Watch('selectedProductsIds')
  public handleSelectedProducts(value: string[]): void {
    if(value.length) this.$router.push(this.localePath({ query: { id: [...value] } }))
    else this.$router.push(this.localePath({ name: 'manager-products', query: { ...this.allProductsParams} }))
  }

  @Watch('$route.query')
  public async handleRouteQueryChange(
    newValue: IDictionary<any>
  ): Promise<void> {
    const parsedForm: any = PageManagerProducts.routeQueryToFormValue(newValue)
    await this.setForm(parsedForm)
    this.fetchProducts()
  }

  public async asyncData({ store, error }: any) {
    try {
      const requestsList = [
        store.dispatch('page-manager-featured-products/fetchProducts'),
      ]

      await Promise.all(requestsList)

      const status: EStatus =
        store.getters['page-manager-featured-products/status']

      if (status === EStatus.ERROR) {
        const err: any = store.getters['page-manager-featured-products/error']
        throw err
      }
    } catch (err) {
      error(err)
    }
  }

  public async openProductModal(id: number): Promise<void> {
    await this.fetchProductById(id)
    
    if (this.currentProduct) {
      const props = {
        product: this.currentProduct,
      }

      this.$modal.show(ModalProduct, props, PRODUCT_MODAL_CONFIG)
    } else {
      this.$notify({
        type: EMessageTypes.DANGER,
        text: this.$t('common.error').toString()
      })
    }
  }

  public async handleChangePage(value: number): Promise<void> {
    this.updateFormField({ field: 'page', value })
    await this.fetchProducts()
  }
}
</script>

<style lang="scss" scoped>
.products-page {
  &__table {
    margin-top: 32px;
  }
}
</style>
