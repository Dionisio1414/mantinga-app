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

      <div
        v-for="(filter, key, index) in internalFilters"
        :key="key"
        class="modal-filters__filters"
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

    <div class="modal-filters__footer">
      <button class="btn btn--white-with-border" @click="closeModal">
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
import { Action, Component, Getter, mixins } from 'nuxt-property-decorator'
import ModalNewsletterForm from '~/components/forms/ModalNewsletterForm.vue'
import FormSelect from '~/components/inputs/FormSelect.vue'

import MixinModal from '~/mixins/modalMixin'
import { ICategoryPageFilter } from '~/types/category-page.interface'
import { IDictionary } from '~/types/dictionary.interface'
import {
  ISubcategoryPageFilter,
  ISubcategoryPageFilterValue,
  ISubcategoryPageForm,
} from '~/types/subcategory-page.interface'
import storeFormMapper from '~/utils/store-form-mapper'

@Component({
  components: {
    ModalNewsletterForm,
    FormSelect,
  },
})
export default class ComponentModalProductFilters extends mixins(MixinModal) {
  public $t: any

  @Getter('page-subcategory/form')
  public form!: ISubcategoryPageForm

  @Getter('page-subcategory/filters')
  public filters!: IDictionary<ICategoryPageFilter>

  @Action('page-subcategory/fetchSubcategory')
  public fetchSubcategory!: (slug: string) => Promise<void>

  public get filtersForm() {
    return storeFormMapper({
      store: this.$store,
      getter: 'page-subcategory/form',
      action: 'page-subcategory/updateFormField',
      fields: [...Object.keys(this.filters)],
    })
  }

  private get formValueToRouteQuery(): IDictionary<string> {
    const query: IDictionary<string> = {}

    Object.entries({ ...this.form }).forEach(([field, value]) => {
      // @ts-ignore
      query[field] = value
    })

    return query
  }

  public handleUpdateFilter(): void {
    const query: IDictionary<string> = this.formValueToRouteQuery

    this.$router.push({ query })
  }

  public getOptionsForFilter(
    values: IDictionary<ISubcategoryPageFilterValue>
  ): string[] {
    const result: string[] = []
    for (const key in values) {
      if (values[key]) result.push(values[key].value)
    }
    return result || []
  }

  public get internalFilters(): IDictionary<ISubcategoryPageFilter> {
    const result: IDictionary<ISubcategoryPageFilter> = {}
    for (const key in this.filters) {
      if (
        this.filters[key].values &&
        Object.keys(this.filters[key].values).length > 1
      ) {
        result[key] = { ...this.filters[key] }
      }
    }
    return result
  }

  public closeModal(): void {
    this.$emit('close')
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
