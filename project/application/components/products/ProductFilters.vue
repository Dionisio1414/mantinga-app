<template>
  <div class="product-filters">
    <div class="product-filters__row">
      <div
        v-for="(filter, key, index) in internalFilters"
        :key="key"
        class="product-filters__filter"
      >
        <FormSelect
          v-if="index < 5 || (index >= 5 && isShowAllFilters)"
          v-model="filtersForm[filter.name]"
          :label="filter.name"
          :options="getOptionsForFilter(filter.values)"
          @input="handleUpdateFilter"
        />
      </div>
    </div>
    <button
      v-if="isShowFiltersButton"
      class="product-filters__btn btn btn--secondary"
      type="button"
      @click="toggleAllFilters"
    >
      <span 
        class="btn-title" 
        v-html="
          isShowAllFilters 
          ? $sanitize($t('page_subcategory.less_attributes')) 
          : $sanitize($t('page_subcategory.more_attributes'))" 
        />
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Inject, InjectReactive } from 'nuxt-property-decorator'
import Multiselect from 'vue-multiselect'
import FormSelect from '~/components/inputs/FormSelect.vue'
import { ISubcategoryPageFilter, ISubcategoryPageFilterValue } from '~/types/subcategory-page.interface'
import { IDictionary } from '~/types/dictionary.interface'
import { TOKEN_SUBCATEGORY_PAGE_FILTERS, TOKEN_SUBCATEGORY_PAGE_FORM, TOKEN_SUBCATEGORY_PAGE_UPDATE } from '~/constants/tokens/subcategory-page'

@Component({
  components: {
    Multiselect,
    FormSelect,
  },
})
export default class ComponentProductFilters extends Vue {
  @InjectReactive(TOKEN_SUBCATEGORY_PAGE_FORM)
  public filtersForm!: IDictionary<string>; 

  @Inject(TOKEN_SUBCATEGORY_PAGE_FILTERS)
  public filters!: IDictionary<ISubcategoryPageFilter>

  @Inject(TOKEN_SUBCATEGORY_PAGE_UPDATE)
  public handleUpdateFilter!: () => Promise<void>

  public isShowAllFilters: boolean = false

  public toggleAllFilters(): void {
    this.isShowAllFilters = !this.isShowAllFilters
  }

  public getOptionsForFilter(values: IDictionary<ISubcategoryPageFilterValue>): string[] {
    const result: string[] = [];
    for(const key in values) {
      if(values[key]) result.push(values[key].value)
    }
    return result || []
  }

  public get internalFilters(): IDictionary<ISubcategoryPageFilter> {
    const result: IDictionary<ISubcategoryPageFilter> = {};
    for(const key in this.filters) {
      if(this.filters[key].values && Object.keys(this.filters[key].values).length > 1) {
        result[key] = { ...this.filters[key] };
      }
    }
    return result
  }

  public get isShowFiltersButton(): boolean {
    return Object.keys(this.internalFilters).length > 5
  }
}
</script>

<style lang="scss" scoped>
.product-filters {
  &__row {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;

    &:not(:first-child) {
      margin-top: 38px;
    }
  }

  &__btn {
    margin-top: 32px;
  }

  &__filter {
    flex-basis: 227px;
    flex-grow: 1;
    max-width: 300px;
  }
}
</style>
