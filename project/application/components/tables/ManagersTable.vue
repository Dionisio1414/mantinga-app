<template>
  <div>
    <div class="managers-table">
      <div class="managers-table__wrapper">
        <ManagersTableHeader
          :is-selected-all="isSelectedAll"
          @toggleAll="toggleAll"
        />
        <ManagersTableRow
          v-for="product in products"
          :key="product.id"
          :product="product"
          :selected-products-ids="selectedProductsIds"
          @toggleRow="toggleRow"
          @onClickProduct="handleClickProduct"
          @downloadPresentation="downloadPresentation"
        />
        <div v-if="!products.length" class="managers-table__empty">
          <span
            class="subtitle managers-table__empty-text"
            v-html="$sanitize($t('page_manager_products.empty_table'))"
          />
        </div>
      </div>
    </div>
    <div class="managers-table__pagination">
      <div class="managers-table__pages text-center">
        <span
          class="body-text1"
          v-html="$sanitize($t('page_manager_products.shown_products'))"
        />
        <span
          ><b>{{ shownItemsCount }} - {{ itemsPerPage }} /</b>
          {{ pagination.totalItems }}</span
        >
      </div>
      <Pagination
        :current-page="pagination.page || 1"
        :total-pages="pagination.pages || 1"
        :sibling-pages-range="0"
        :hide-first-and-last-page-links="true"
        @onPageChange="pageChangeHandler"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import ManagersTableHeader from '~/components/tables/ManagersTableHeader.vue'
import ManagersTableRow from '~/components/tables/ManagersTableRow.vue'
import Pagination from '~/components/pagination/Pagination.vue'

import { IManagerTableRowToggle } from '~/types/manager-table.interface'
import { IManagerProduct } from '~/types/manager-products.interface'
import { IPagination } from '~/types/pagination.interface'

@Component({
  components: {
    ManagersTableHeader,
    ManagersTableRow,
    Pagination,
  },
})
export default class ManagersTable extends Vue {
  @Prop({ default: () => [] })
  public products!: IManagerProduct[]

  @Prop({ default: () => [] })
  public selectedProductsIds!: number[]

  @Prop()
  public pagination!: IPagination

  @Prop({ default: false })
  public isSelectedAll!: boolean

  public get shownItemsCount(): number {
    let result = 1

    if (this.pagination.page > 1) {
      result = (this.pagination.limitPerPage || 10) * this.pagination.page

      if (result > this.pagination.totalItems)
        result = this.pagination.totalItems
    }

    if(this.pagination.totalItems === 0) {
      result = 0
    }

    return result
  }

  public get itemsPerPage(): any {
    const result = this.pagination.page * (this.pagination.limitPerPage || 10)

    if (result > this.pagination.totalItems) return this.pagination.totalItems
    else return result
  }

  public toggleRow(value: IManagerTableRowToggle): void {
    this.$emit('toggleRow', value)
  }

  public toggleAll(value: boolean): void {
    this.$emit('toggleAll', value)
  }

  public pageChangeHandler(value: any): void {
    this.$emit('changePage', value)
  }

  public handleClickProduct(id: number): void {
    this.$emit('onClickProduct', id)
  }

  public downloadPresentation(id: number): void {
    this.$emit('downloadPresentation', id)
  }
}
</script>

<style lang="scss" scoped>
.managers-table {
  overflow-x: auto;
  padding-bottom: 16px;

  &__wrapper {
    min-width: 838px;
  }

  &__pagination {
    width: max-content;
    margin: 0 auto;
    margin-top: 32px;
  }

  &__pages {
    padding-bottom: 16px;
  }

  &__empty {
    margin: 64px auto 48px auto;
    color: $color-primary-light;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
