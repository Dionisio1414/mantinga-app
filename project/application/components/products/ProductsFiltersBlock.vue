<template>
  <div class="products-filters-block">
    <div
      class="
        products-filters-block__filters-wrapper
        products-filters-block__filters-wrapper--desktop
      "
    >
      <ProductFilters class="products-filters-block__filters" />
      <div class="products-filters-block__sorting">
        <p
          class="products-filters-block__quantity body-text1 body-text1--bold"
          v-html="
            $sanitize(
              $t('page_subcategory.found_products', { n: productsCount })
            )"
        />
        <Multiselect 
          v-model="form['order_by']"
          class="form-select form-select--dark  products-filters-block__sort" 
          :placeholder="$sanitize($t('page_subcategory.sort_placeholder'))"  
          :searchable="false" 
          :options="sorts"
          :custom-label="sortsCustomLabel"
          @input="handleUpdateFilter"
        />
      </div>
    </div>
    <div
      class="
        products-filters-block__filters-wrapper
        products-filters-block__filters-wrapper--mobile
      "
    >
      <div class="products-filters-block__buttons">
        <Multiselect 
          v-model="form['order_by']"
          class="form-select form-select--dark  products-filters-block__sort" 
          :placeholder="$sanitize($t('page_subcategory.sort_placeholder'))" 
          :searchable="false" 
          :options="sorts"
          :custom-label="sortsCustomLabel"
          @input="handleUpdateFilter"
        />
        <button class="btn btn--alternative" @click="openFiltersModal">
          <span
            class="btn-title"
            v-html="$sanitize($t('common.buttons.filter'))"
          />
        </button>
      </div>
      <p
        class="products-filters-block__quantity body-text1 body-text1--bold"
        v-html="
          $sanitize($t('page_subcategory.found_products', { n: productsCount }))"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Inject, Prop } from 'nuxt-property-decorator'
import ProductFilters from '~/components/products/ProductFilters.vue'
import ModalProductFilters from '~/components/modals/ModalProductFilters.vue'
import Multiselect from 'vue-multiselect'

import { PRODUCT_FILTERS_MODAL_CONFIG } from '~/constants/modals-config'
import { ISubcategoryPageForm } from '~/types/subcategory-page.interface'
import { EProductSorting, PRODUCT_SORTING_VALUES } from '~/constants/product-sorting'
import { 
  TOKEN_SUBCATEGORY_PAGE_SORT, 
  TOKEN_SUBCATEGORY_PAGE_UPDATE, 
  TOKEN_SUBCATEGORY_PAGE_SORTS_VALUES 
} from '~/constants/tokens/subcategory-page'

@Component({
  components: {
    ProductFilters,
    Multiselect
  },
})
export default class ComponentProductsFiltersBlock extends Vue {
  public $modal: any
  public order_by = ''

  @Prop({ default: 0 })
  public productsCount!: number

  @Inject(TOKEN_SUBCATEGORY_PAGE_SORT)
  public form!: ISubcategoryPageForm;

  @Inject(TOKEN_SUBCATEGORY_PAGE_SORTS_VALUES)
  public sorts!: string[]

  @Inject(TOKEN_SUBCATEGORY_PAGE_UPDATE)
  public  handleUpdateFilter!: () => Promise<void>

  public openFiltersModal(): void {
    this.$modal.show(ModalProductFilters, null, PRODUCT_FILTERS_MODAL_CONFIG)
  }

  public get sortingOptions(): string[] {
    return PRODUCT_SORTING_VALUES
  }

  public sortsCustomLabel(option: string): string {
    if(option === 'product_created_at') return this.$t('page_subcategory.field_created_at').toString()
    else return option 
  }

  public orderCustomLabel(option: string): string {
    switch(option) {
      case EProductSorting.NAME:
        return 'name'
      case EProductSorting.PRICE:
        return 'price'
      case EProductSorting.CREATED_AT:
        return 'created_at'
      case EProductSorting.SOLD_UNITS:
        return 'sold_units'
      default: 
        return ''
    }
  }
}
</script>

<style lang="scss" scoped>
.products-filters-block {
  &__filters-wrapper {
    &--desktop {
      display: none;
    }

    &--mobile {
      margin-top: 24px;
    }
  }

  &__buttons {
    display: flex;
    gap: 24px;
    justify-content: center;
    align-items: center;
  }

  &__quantity {
    text-align: center;
    margin-top: 24px;
  }

  &__filters {
    margin-top: 24px;
  }

  &__sorting {
    margin-top: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__sort {
    width: max-content;
    min-width: 126px
  }
}

@include media-lg {
  .products-filters-block {
    &__filters-wrapper {
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
