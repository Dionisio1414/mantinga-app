<template>
  <div>
    <Breadcrumbs :breadcrumbs="breadcrumbs" />
    <div class="page__wrapper">
      <div class="page__container">
        <div class="products-categories-page">
          <ProductsHeaderBlock
            :title="pageName"
            :description="pageDescription"
          />
          <SelectProductCategories
            :category-slug="categorySlug"
            :subcategories="subcategories"
          />
          <ProductCategoryBlock
            v-for="(subcategory, i) in subcategoriesForLayout"
            :key="i"
            :subcategory="subcategory"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Getter } from 'nuxt-property-decorator'
import ProductCategories from '~/components/products/ProductCategories.vue'
import Breadcrumbs from '~/components/common/Breadcrumbs.vue'
import SelectProductCategories from '~/components/products/SelectProductCategories.vue'
import ProductCategoryBlock from '~/components/products/ProductCategoryBlock.vue'
import ProductsHeaderBlock from '~/components/products/ProductsHeaderBlock.vue'

import { IBreadcrumb } from '~/types/breadcrumb.interface'
import { EStatus } from '~/constants/status'
import { ISubTaxon } from '~/types/taxons'
import {
  ICategoryPageBreadcrumb,
  ICategoryPageProduct,
} from '~/types/category-page.interface'

@Component({
  components: {
    ProductCategories,
    Breadcrumbs,
    SelectProductCategories,
    ProductCategoryBlock,
    ProductsHeaderBlock,
  },
  scrollToTop: true
})
export default class PageProductsCategories extends Vue {
  public $t: any
  public localePath: any

  @Getter('page-category/subcategories')
  public subcategories!: ISubTaxon[]

  @Getter('page-category/breadcrumbs')
  public categoryBreadcrumbs!: ICategoryPageBreadcrumb[]

  @Getter('page-category/pageName')
  public pageName!: string

  @Getter('page-category/pageDescription')
  public pageDescription!: string

  @Getter('page-category/subcategoriesForLayout')
  public subcategoriesForLayout!: ICategoryPageProduct[]

  public get breadcrumbs(): IBreadcrumb[] {
    return [
      ...this.categoryBreadcrumbs.map((b) => {
        return {
          key: b.id,
          title: b.name,
          link: b.parentId
            ? this.localePath({ name: 'c-slug-subSlug', params: {slug: this.categorySlug, subSlug: b.slug }})
            : this.localePath({ name: 'c-slug', params: { slug: b.slug }}),
        }
      }),
    ]
  }

  public get categorySlug(): string {
    return this.$route.params?.slug || ''
  }

  public async asyncData({ store, error, params }: any) {
    const { slug } = params

    try {
      await store.dispatch('page-category/fetchCategory', slug)

      const status: EStatus = store.getters['page-category/status']

      if (status === EStatus.ERROR) {
        const err: any = store.getters['page-category/error']
        throw err
      }
    } catch (err) {
      error(err)
    }
  }
}
</script>

<style lang="scss" scoped>
.page__wrapper {
  padding-top: 44px;
}
</style>
