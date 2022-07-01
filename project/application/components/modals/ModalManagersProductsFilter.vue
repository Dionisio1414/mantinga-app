<template>
  <div class="modal-filters">
    <div class="modal-filters__body">
      <p
        class="modal-filters__heading h6"
        v-html="$sanitize($t('modal_products_filter.header'))"
      />
      <button class="modal-filters__close" @click="closeModal">
        <svg-icon name="close" width="24" height="24" />
      </button>

      <ManagerProductsFilters @filterChanged="filterChanged" />
    </div>

    <div class="modal-filters__footer">
      <button class="btn btn--white-with-border" @click="clearFilters">
        <span
          class="btn-title"
          v-html="$sanitize($t('common.buttons.clear'))"
        />
        <svg-icon name="delete" width="24" height="24" />
      </button>
      <button class="btn btn--alternative" @click="closeModal">
        <span
          class="btn-title"
          v-html="$sanitize($t('common.buttons.filter'))"
        />
        <svg-icon name="filter" width="24" height="24" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Action,
  Component,
  Getter,
  mixins,
  Prop,
  Provide,
  ProvideReactive,
} from 'nuxt-property-decorator'
import ModalNewsletterForm from '~/components/forms/ModalNewsletterForm.vue'
import FormSelect from '~/components/inputs/FormSelect.vue'
import FormSearchInput from '~/components/inputs/FormSearchInput.vue'
import FormCategorySelect from '~/components/inputs/FormCategorySelect.vue'
import ManagerProductsFilters from '~/components/manager-products/ManagerProductsFilters.vue'

import MixinModal from '~/mixins/modalMixin'
import {
  TOKEN_MANAGER_CLEAR_FILTERS,
  TOKEN_MANAGER_CLEAR_SEARCH,
  TOKEN_MANAGER_FILTERS,
  TOKEN_MANAGER_FILTERS_CATEGORIES,
  TOKEN_MANAGER_FILTERS_SELECTS,
} from '~/constants/tokens/manager-products'
import {
  IManagerFilters,
  IManagerProductsGetParams,
} from '~/types/manager-products.interface'
import storeFormMapper from '~/utils/store-form-mapper'
import { ITaxon } from '~/types/taxons'
import PageManagerProductsIndex from '~/pages/manager/products/index.vue'

@Component({
  components: {
    ModalNewsletterForm,
    FormSelect,
    FormSearchInput,
    FormCategorySelect,
    ManagerProductsFilters
  },
})
export default class ComponentModalManagersProductFilter extends mixins(
  MixinModal
) {
  public $t: any

  @Prop()
  public handleChangeFilter?: () => void

  @Getter('page-manager-products/filters')
  public filters!: IManagerFilters[]

  @Getter('page-manager-products/categories')
  public categories!: ITaxon[]

  @Getter('page-manager-products/params')
  public params!: IManagerProductsGetParams

  @Action('page-manager-products/clearFilters')
  public clearFilters!: () => void

  @Action('page-manager-products/clearSearch')
  public clearSearch!: () => void

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

  @ProvideReactive(TOKEN_MANAGER_FILTERS_SELECTS)
  public get filtersSelects(): IManagerFilters[] {
    return this.filters
  }

  @ProvideReactive(TOKEN_MANAGER_FILTERS_CATEGORIES)
  public get filtersCategories(): ITaxon[] {
    return this.categories
  }

  public closeModal(): void {
    this.$emit('close')
  }

  public filterChanged(): void {
    this.handleChangeFilter && this.handleChangeFilter();
  }
}
</script>

<style lang="scss" scoped>
.modal-filters {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  height: 100%;

  &__body {
    padding: 16px;
    width: 100%;
  }

  &__close {
    position: absolute;
    top: 20px;
    right: 16px;
  }

  &__heading {
    text-align: center;
  }

  &__filters {
    width: 100%;
    margin-top: 32px;
  }

  &__filter {
    &:not(:last-child) {
      margin-bottom: 32px;
    }
  }

  &__footer {
    display: flex;
    justify-content: center;
    align-content: center;
    padding: 12px;
    box-shadow: $shadow-100;
    gap: 24px;
    width: 100%;
    margin-top: auto;
  }
}
</style>
