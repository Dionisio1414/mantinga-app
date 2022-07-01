<template>
  <div class="products-page">
    <ManagerProductsFilters
      class="products-page__filters"
      @filterChanged="handleChangeFilter"
    />
    <button
      class="products-page__filter-btn btn btn--alternative"
      type="button"
      @click="openFilterModal"
    >
      <span
        class="btn-title"
        v-html="$sanitize($t('page_manager_products.filter'))"
      />
    </button>
    <ManagersTable
      class="products-page__table"
      :products="products"
      :selected-products-ids="selectedProductsIds"
      :pagination="pagination"
      :is-selected-all="isSelectedAll"
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
import {
  Action,
  Component,
  Getter,
  Inject,
  Provide,
  ProvideReactive,
  Watch,
} from 'nuxt-property-decorator'
import ManagersTable from '~/components/tables/ManagersTable.vue'
import ManagerProductsFooter from '~/components/manager-products/ManagerProductsFooter.vue'
import ModalManagersProductsFilter from '~/components/modals/ModalManagersProductsFilter.vue'
import ModalProduct from '~/components/modals/ModalProduct.vue'
import ManagerProductsTabs from '~/components/manager-products/ManagerProductsTabs.vue'
import ManagerProductsFilters from '~/components/manager-products/ManagerProductsFilters.vue'
import PageManagerProducts from '../products.vue'

import { IManagerTableRowToggle } from '~/types/manager-table.interface'
import {
  IManagerFilters,
  IManagerProduct,
  IManagerProductsGetParams,
} from '~/types/manager-products.interface'
import {
  PRODUCT_MODAL_CONFIG,
  PRODUCT_FILTERS_MODAL_CONFIG,
} from '~/constants/modals-config'
import { IProduct } from '~/types/product.interface'
import storeFormMapper from '~/utils/store-form-mapper'

import {
  TOKEN_MANAGER_CHANGED_FILTERS,
  TOKEN_MANAGER_CLEAR_FILTERS,
  TOKEN_MANAGER_CLEAR_SEARCH,
  TOKEN_MANAGER_DOWNLOAD_PRESENTATION,
  TOKEN_MANAGER_FILTERS,
  TOKEN_MANAGER_FILTERS_CATEGORIES,
  TOKEN_MANAGER_FILTERS_SELECTS,
} from '~/constants/tokens/manager-products'
import { ITaxon } from '~/types/taxons'
import { IUpdateFieldPayload } from '~/types/forms/update-field-payload.interface'
import { IPagination } from '~/types/pagination.interface'
import { IDictionary } from '~/types/dictionary.interface'
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
export default class PageManagerProductsIndex extends Vue {
  public $modal: any

  @Getter('page-manager-products/products')
  public products!: IManagerProduct[]

  @Getter('page-manager-products/filters')
  public filters!: IManagerFilters[]

  @Getter('page-manager-products/currentProduct')
  public currentProduct!: IProduct

  @Getter('page-manager-products/categories')
  public categories!: ITaxon[]

  @Getter('page-manager-products/params')
  public params!: IManagerProductsGetParams

  @Getter('page-manager-products/pagination')
  public pagination!: IPagination

  @Getter('manager-selected-products/selectedProductsIds')
  public selectedProductsIds!: number[]

  @Getter('page-manager-products/isSelectedAll')
  public isSelectedAll!: boolean

  @Action('page-manager-products/fetchProductById')
  public fetchProductById!: (id: number) => Promise<void>

  @Action('page-manager-products/fetchProducts')
  public fetchProducts!: () => Promise<void>

  @Action('page-manager-products/clearFilters')
  public clearFilters!: () => void

  @Action('page-manager-products/clearSearch')
  public clearSearch!: () => void

  @Action('page-manager-products/updateFormField')
  public updateFormField!: (payload: IUpdateFieldPayload<any>) => void

  @Action('manager-selected-products/toggleProduct')
  public toggleProduct!: (payload: IManagerTableRowToggle) => void

  @Action('page-manager-products/toggleAllProducts')
  public toggleAllProducts!: (payload: boolean) => void

  @Action('page-manager-products/setForm')
  public setForm!: (payload: IDictionary<string>) => void

  @Inject(TOKEN_MANAGER_DOWNLOAD_PRESENTATION)
  public downloadPresentation!: (id: number) => void;

  @Provide(TOKEN_MANAGER_FILTERS)
  public get paramsFilters() {
    return storeFormMapper({
      store: this.$store,
      getter: 'page-manager-products/params',
      action: 'page-manager-products/updateFormField',
      fields: ['name', 'locale_codes', 'product_taxons', 'status'],
    })
  }

  @Provide(TOKEN_MANAGER_CLEAR_FILTERS)
  public providedClearFilters(): void {
    this.clearFilters()
  }

  @Provide(TOKEN_MANAGER_CLEAR_SEARCH)
  public providedClearSearch(): void {
    this.clearSearch()
  }

  @Provide(TOKEN_MANAGER_CHANGED_FILTERS)
  public providedChangedFilters(): void {
    this.fetchProducts()
  }

  @ProvideReactive(TOKEN_MANAGER_FILTERS_SELECTS)
  public get filtersSelects(): IManagerFilters[] {
    return this.filters
  }

  @ProvideReactive(TOKEN_MANAGER_FILTERS_CATEGORIES)
  public get filtersCategories(): ITaxon[] {
    return this.categories
  }

  @Watch('$route.query')
  public async handleRouteQueryChange(newValue: IDictionary<any>): Promise<void> {
    const parsedForm: any = PageManagerProducts.routeQueryToFormValue(newValue)
    await this.setForm(parsedForm)
    this.providedChangedFilters()
  }

  private get formValueToRouteQuery(): IDictionary<string> {
    const query: IDictionary<string> = {}

    Object.entries({ ...this.params }).forEach(([field, value]) => {
      if (value && typeof value !== 'object') {
        query[field] = JSON.stringify(value)
      }

      if (value && typeof value === 'object' && value.length) {
        query[field] = JSON.stringify(value)
      }

      if (value && typeof value === 'string') {
        query[field] = value
      }

      if (typeof value === 'number') {
        query[field] = value.toString()
      }
    })

    delete query.page

    return query
  }

  public openFilterModal(): void {
    const props = {
      handleChangeFilter: this.handleChangeFilter
    }

    this.$modal.show(
      ModalManagersProductsFilter,
      props,
      PRODUCT_FILTERS_MODAL_CONFIG
    )
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
    await this.fetchProducts();
  }

  public handleChangeFilter(): void {
    const query: IDictionary<string> = this.formValueToRouteQuery
    this.$router.push({ query })
  }
}
</script>

<style lang="scss" scoped>
.products-page {
  &__filter-btn {
    margin-top: 40px;
    width: 100%;
  }

  &__table {
    margin-top: 32px;
  }

  &__filters {
    display: none;
  }
}

@include media-lg {
  .products-page {
    &__filter-btn {
      display: none;
    }

    &__filters {
      display: block;
    }
  }
}
</style>
