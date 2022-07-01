<template>
  <div class="manager-products-filters">
    <div class="manager-products-filters__inputs">
      <FormSearchInput
        v-model="filterParams.name"
        class="manager-products-filters__filter"
        :placeholder="$sanitize($t('page_manager_products.search_placeholder'))"
        @clean="clearSearch"
        @input="filterChanged"
      />
      <FormCategorySelect
        v-model="filterParams.product_taxons"
        class="manager-products-filters__filter"
        :label="$sanitize($t('page_manager_products.category_filter'))"
        :categories="categories"
        @input="filterChanged"
      />
      <FormSelect
        v-model="filterParams.locale_codes"
        class="manager-products-filters__filter"
        :options="localesOptions"
        :label="$sanitize($t('page_manager_products.select_translation'))"
        @input="filterChanged"
      />
      <FormSelect
        v-model="filterParams.status"
        class="manager-products-filters__filter"
        :label="$sanitize($t('page_manager_products.all_products'))"
        :options="statusCodes"
        :custom-label="statusCustomLabel"
        @input="filterChanged"
      />
    </div>
    <button
      class="manager-products-filters__btn btn btn--alternative"
      type="button"
      @click="handleClearFilters"
    >
      <span
        class="btn-title"
        v-html="$sanitize($t('common.buttons.clear_filter'))"
      />
      <svg-icon name="delete" width="24" height="24" />
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Inject, InjectReactive } from 'nuxt-property-decorator'
import FormSelect from '~/components/inputs/FormSelect.vue'
import FormSearchInput from '~/components/inputs/FormSearchInput.vue'
import FormCategorySelect from '~/components/inputs/FormCategorySelect.vue'

import {
  IManagerFilters,
  IManagerProductsGetParams,
} from '~/types/manager-products.interface'
import {
  TOKEN_MANAGER_CLEAR_FILTERS,
  TOKEN_MANAGER_CLEAR_SEARCH,
  TOKEN_MANAGER_FILTERS,
  TOKEN_MANAGER_FILTERS_CATEGORIES,
  TOKEN_MANAGER_FILTERS_SELECTS,
} from '~/constants/tokens/manager-products'
import { EProductStatus } from '~/constants/product-status'
import { ITaxon } from '~/types/taxons'

@Component({
  components: {
    FormSelect,
    FormSearchInput,
    FormCategorySelect,
  },
})
export default class ComponentManagerProductsFilters extends Vue {
  @Inject(TOKEN_MANAGER_FILTERS)
  public filterParams!: IManagerProductsGetParams

  @InjectReactive(TOKEN_MANAGER_FILTERS_SELECTS)
  public filters!: IManagerFilters

  @InjectReactive(TOKEN_MANAGER_FILTERS_CATEGORIES)
  public categories!: ITaxon[]

  @Inject(TOKEN_MANAGER_CLEAR_FILTERS)
  public clearFilters!: () => void

  @Inject(TOKEN_MANAGER_CLEAR_SEARCH)
  public clearSearch!: () => void

  public get localesOptions(): string[] {
    return this.filters?.locales.map((l) => l.code) || []
  }

  public get statusCodes(): number[] {
    return [EProductStatus.NEW, EProductStatus.ONLINE]
  }

  public statusCustomLabel(opt: number): string {
    switch (opt) {
      case EProductStatus.NEW:
        return this.$t(`common.statuses.${EProductStatus.NEW}`).toString()
      case EProductStatus.ONLINE:
        return this.$t(`common.statuses.${EProductStatus.ONLINE}`).toString()
      case EProductStatus.REMOVE:
        return this.$t(`common.statuses.${EProductStatus.REMOVE}`).toString()
      default:
        return ''
    }
  }

  public filterChanged(): void {
    this.$emit('filterChanged')
  }

  public handleClearFilters(): void {
    this.clearFilters();
    this.filterChanged()
  }
}
</script>

<style lang="scss" scoped>
.manager-products-filters {
  margin: 37px 0 56px 0;

  &__inputs {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__btn {
    display: none;
    margin-top: 24px;
  }
}

@include media-lg {
  .manager-products-filters {
    &__btn {
      display: flex;
    }

    &__inputs {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
    }
  }
}
</style>
