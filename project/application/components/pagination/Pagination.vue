<template>
  <div class="pagination">
    <ul class="pagination__list">
      <li v-for="page in pagination" :key="page.key" class="pagination__item">
        <template v-if="page.type === 'ELLIPSIS'">
          <span
            class="
              btn btn--white-with-border
              pagination__trigger pagination__ellipsis
            "
          >
            ...
          </span>
        </template>
        <button
          v-else
          class="btn btn--white-with-border pagination__trigger"
          :class="getTriggerClassAttr(page)"
          :disabled="getTriggerDisabled(page)"
          @click="handleChangePage(page)"
        >
          <template v-if="page.type === 'PAGE'">
            {{ page.value }}
          </template>
          <template v-else-if="page.type === 'PREVIOUS_PAGE_LINK'">
            <svg-icon name="chevron-left" width="16" height="16" />
          </template>
          <template v-else-if="page.type === 'NEXT_PAGE_LINK'">
            <svg-icon name="chevron-right" width="16" height="16" />
          </template>
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { mixins } from 'nuxt-property-decorator'
import { PaginationModelItem } from 'ultimate-pagination'

import MixinPagination from '~/mixins/pagination'

export default class ComponentPagination extends mixins(MixinPagination) {
  public getTriggerClassAttr(page: PaginationModelItem): string {
    if (page.isActive && page.type === 'PAGE') {
      return 'btn--white-with-golden-border'
    }

    return 'btn--white-with-grey-border'
  }

  public getTriggerDisabled(page: PaginationModelItem): boolean {
    return (
      (page.isActive &&
        (page.type === 'NEXT_PAGE_LINK' ||
          page.type === 'PREVIOUS_PAGE_LINK')) ||
      page.type === 'ELLIPSIS'
    )
  }

  public handleChangePage(page: PaginationModelItem): void {
    this.$emit('onPageChange', page.value)
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  &__list {
    display: flex;
    list-style: none;
    padding: 0;
  }

  &__item {
    margin: 0 4px;
  }

  &__trigger {
    padding: 0;
    height: 48px;
    width: 48px;
    display: flex;
    justify-content: center;
    align-items: center;

    &:disabled {
      background-color: $color-primary-disabled;
      border: 1px solid transparent;
    }
  }

  &__arrow {
    font-size: 8px;
  }

  &__ellipsis {
    &:hover,
    &:focus,
    &:active {
      background: $color-white;
      border: 1px solid $color-golden;
      cursor: default;
    }
  }
}
</style>
