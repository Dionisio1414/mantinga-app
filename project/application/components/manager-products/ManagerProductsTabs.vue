<template>
  <div class="manager-products-tabs">
    <NuxtLink
      :to="linkToAllProducts"
      class="manager-products-tabs__tab body-text1 body-text1--bold"
      :class="{ 'manager-products-tabs__tab--active': isAllProductsActive }"
    >
      <span v-html="$sanitize($t('page_manager_products.search_products'))" />
      <span>({{ totalItems }})</span>
    </NuxtLink>
    <NuxtLink
      :to="linkToFeaturedProducts"
      class="manager-products-tabs__tab body-text1 body-text1--bold"
      :class="{ 
        'manager-products-tabs__tab--active': !isAllProductsActive, 
        'manager-products-tabs__tab--disabled': !selectedProductsIds.length 
      }"
    >
      <span
        v-html="$sanitize($t('page_manager_products.recommended_products'))"
      />
      <span>({{ selectedProductsIds.length }})</span>
    </NuxtLink>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import { IManagerProductsGetParams } from '~/types/manager-products.interface'
import { IDictionary } from '~/types/dictionary.interface'

@Component({})
export default class ComponentManagerProductsTabs extends Vue {
  @Prop({ default: () => [] })
  public selectedProductsIds!: number[]

  @Prop({ default: 0 })
  public totalItems!: number

  @Prop({ default: true })
  public isShowAllProducts!: boolean

  @Prop({ default: () => ({}) })
  public allProductsParams!: IManagerProductsGetParams

  public toggleTabs(value: boolean): void {
    this.$emit('switchTabs', value)
  }

  private get formValueToRouteQuery(): IDictionary<string> {
    const query: IDictionary<string> = {}

    Object.entries({ ...this.allProductsParams }).forEach(([field, value]) => {
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

    return query
  }

  public get isAllProductsActive(): boolean {
    return this.$route.path === this.localePath({ name: 'manager-products' })
  }

  public localePath: any;

  public get linkToAllProducts(): any {
    const query = this.formValueToRouteQuery
    return {
      path: this.localePath({name: 'manager-products'}),
      query,
    }
  }

  public get linkToFeaturedProducts(): any {
    return {
      path: this.localePath({name: 'manager-products-featured'}),
      query: {
        id: [...this.selectedProductsIds],
      },
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/typography.scss';
.manager-products-tabs {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;

  &__tab {
    border-bottom: 4px solid transparent;
    padding-bottom: 8px;

    &--active {
      border-bottom-color: $color-golden;
    }

    &--disabled {
      pointer-events: none;
      opacity: 0.8;
    }
  }
}

@include media-lg {
  .manager-products-tabs {
    justify-content: flex-start;
    gap: 65px;

    &__tab {
      @include h6;
    }
  }
}
</style>
