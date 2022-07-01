<template>
  <div>
    <Breadcrumbs :breadcrumbs="breadcrumbs" />
    <div class="page__wrapper">
      <div class="page__container">
        <div class="products-subcategory-page">
          <ProductsHeaderBlock
            :title="pageName"
            :description="pageDescription"
            :image="subcategoryImage"
          />
          <ProductsFiltersBlock :products-count="products && products.length" />

          <div class="products-subcategory-page__grid">
            <ProductCard
              v-for="product in products"
              :key="product.id"
              :product="product"
              :category-slug="slugs.category"
              :subcategory-slug="slugs.subcategory"
              :with-shadow-on-mobile="false"
            />
          </div>

          <button
            v-if="pagination.page < pagination.pages"
            class="products-subcategory-page__btn btn btn--secondary"
            @click="loadMore"
          >
            <span
              class="btn-title"
              v-html="$sanitize($t('page_subcategory.more_products'))"
            />
          </button>
          <p class="products-subcategory-page__pagination body-text1">
            <span> {{ $t('news_page.product_view') }}</span
            >: <b>{{ products && products.length }}</b>
            <span>{{ $t('news_page.of') }}</span>
            {{ pagination && pagination.totalItems }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  Action,
  Component,
  Getter,
  Provide,
  ProvideReactive,
  Watch,
} from 'nuxt-property-decorator'
import Breadcrumbs from '~/components/common/Breadcrumbs.vue'
import ProductCard from '~/components/cards/ProductCard.vue'
import ProductsFiltersBlock from '~/components/products/ProductsFiltersBlock.vue'
import ProductsHeaderBlock from '~/components/products/ProductsHeaderBlock.vue'

import { IBreadcrumb } from '~/types/breadcrumb.interface'
import { EStatus } from '~/constants/status'
import {
  ICategoryPageBreadcrumb,
  ICategoryPageFilter,
  ICategoryPageProduct,
} from '~/types/category-page.interface'
import { IDictionary } from '~/types/dictionary.interface'
import { IPagination } from '~/types/pagination.interface'
import { ISubcategoryPageFilter } from '~/types/subcategory-page.interface'

import {
  TOKEN_SUBCATEGORY_PAGE_FILTERS,
  TOKEN_SUBCATEGORY_PAGE_FORM,
  TOKEN_SUBCATEGORY_PAGE_SORT,
  TOKEN_SUBCATEGORY_PAGE_UPDATE,
  TOKEN_SUBCATEGORY_PAGE_SORTS_VALUES
} from '~/constants/tokens/subcategory-page'
import { IUpdateFieldPayload } from '~/types/forms/update-field-payload.interface'
import storeFormMapper from '~/utils/store-form-mapper'
import { ITaxon } from '~/types/taxons'

@Component({
  components: {
    Breadcrumbs,
    ProductCard,
    ProductsFiltersBlock,
    ProductsHeaderBlock,
  },
  scrollToTop: true,
})
export default class PageProductsSubcategory extends Vue {
  public localePath: any

  @Getter('page-subcategory/form')
  public form!: IDictionary<string | number>

  @Getter('page-subcategory/slugs')
  public slugs!: IDictionary<string>

  @Getter('page-subcategory/filters')
  public filters!: IDictionary<ICategoryPageFilter>

  @Getter('page-subcategory/products')
  public products!: ICategoryPageProduct[]

  @Getter('page-subcategory/pagination')
  public pagination!: IPagination

  @Getter('page-subcategory/pageName')
  public pageName!: string

  @Getter('page-subcategory/image')
  public subcategoryImage!: string

  @Getter('page-subcategory/pageDescription')
  public pageDescription!: string

  @Getter('page-subcategory/breadcrumbs')
  public storeBreadcrumbs!: ICategoryPageBreadcrumb[]

  @Getter('categories-list/allCategories')
  public allCategories!: ITaxon[]

  @Getter('page-subcategory/sorts')
  public sorts!: string[];

  @Action('page-subcategory/fetchSubcategory')
  public fetchSubcategory!: (slug: string) => Promise<void>

  @Action('page-subcategory/updateFormField')
  public updateFormField!: (payload: IUpdateFieldPayload<any>) => void

  @Action('page-subcategory/updateForm')
  public updateForm!: (payoad: IUpdateFieldPayload<any>) => void

  @Provide(TOKEN_SUBCATEGORY_PAGE_FILTERS)
  public get providedFilters(): IDictionary<ISubcategoryPageFilter> {
    return this.filters
  }

  @Provide(TOKEN_SUBCATEGORY_PAGE_SORTS_VALUES)
  public get providedSorts(): string[] {
    return this.sorts
  }

  @ProvideReactive(TOKEN_SUBCATEGORY_PAGE_FORM)
  public get providedForm() {
    return storeFormMapper({
      store: this.$store,
      getter: 'page-subcategory/form',
      action: 'page-subcategory/updateFormField',
      fields: [...Object.keys(this.filters)],
    })
  }

  @Provide(TOKEN_SUBCATEGORY_PAGE_SORT)
  public get providedSort() {
    return storeFormMapper({
      store: this.$store,
      getter: 'page-subcategory/form',
      action: 'page-subcategory/updateFormField',
      fields: ['order_by'],
    })
  }

  @Provide(TOKEN_SUBCATEGORY_PAGE_UPDATE)
  public handleUpdateFilter(): void {
    const query: IDictionary<string> = this.formValueToRouteQuery

    this.$router.push({ query })
  }

  @Watch('$route.query')
  public async onRouteQueryChanged(
    newValue: IDictionary<string>
  ): Promise<any> {
    const parsedForm: any =
      PageProductsSubcategory.routeQueryToFormValue(newValue)
    const { subSlug } = this.$route.params

    this.updateForm(parsedForm)
    await this.fetchSubcategory(subSlug)
  }

  public created(): void {
    if(this.sorts && this.sorts.length) {
      this.updateFormField({ field: 'order_by', value: this.sorts[0] })
    }
  }

  public getCategoryBySlug(slug: string): ITaxon | null {
    return this.allCategories?.find((el: ITaxon) => el.slug === slug) || null
  }

  public get breadcrumbs(): IBreadcrumb[] {
    const category = this.getCategoryBySlug(this.slugs?.category)
    const breadcrumbs = [
      ...this.storeBreadcrumbs.map((b) => {
        return {
          key: b.id,
          title: b.name,
          link: '',
        }
      }),
    ]

    if (category) {
      breadcrumbs.unshift({
        key: category?.id,
        title: category?.name,
        link: this.localePath({ name: 'c-slug', params: { slug: category.slug }}),
      })
    }

    return breadcrumbs
  }

  public static routeQueryToFormValue(
    query: IDictionary<string>
  ): IDictionary<string> {
    const formValue: any = {}

    Object.entries(query).forEach(([field, value]) => {
      try {
        formValue[field] = value
      } catch (err) {
        console.warn(`Can't parse field '${field}'`)
      }
    })

    return formValue
  }

  private get formValueToRouteQuery(): IDictionary<string> {
    const query: IDictionary<string> = {}

    Object.entries({ ...this.form }).forEach(([field, value]) => {
      // @ts-ignore
      query[field] = value
    })

    delete query.page

    return query
  }

  public async asyncData({ store, error, params, query, from }: any) {
    const { subSlug, slug } = params
    const productsList: ICategoryPageProduct[] =
      store.getters['page-subcategory/products']

    const fromFullPath = from?.fullPath || ''
    const productSlug = from?.params?.slug || ''

    try {
      if (
        fromFullPath !== `/p/${productSlug}` ||
        !productsList ||
        !productsList.length
      ) {
        const parsedForm: any = PageProductsSubcategory.routeQueryToFormValue(
          query as IDictionary<string>
        )
        await store.dispatch('page-subcategory/updateForm', parsedForm)
        await store.dispatch('page-subcategory/fetchSubcategory', subSlug)

        store.dispatch('page-subcategory/setSlugs', {
          category: slug,
          subcategory: subSlug,
        })

        const status: EStatus = store.getters['page-subcategory/status']

        if (status === EStatus.ERROR) {
          const err: any = store.getters['page-subcategory/error']
          throw err
        }
      }
    } catch (err) {
      error(err)
    }
  }

  public loadMore(): void {
    const nextPage = +this.pagination.page + 1
    this.updateFormField({ field: 'page', value: nextPage })

    const query = this.formValueToRouteQuery

    this.$router.push({ query })
  }
}
</script>

<style lang="scss" scoped>
.page__wrapper {
  padding-top: 44px;
}
.products-subcategory-page {
  &__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
    margin-top: 48px;
  }

  &__btn {
    margin: 24px auto;
  }

  &__pagination {
    margin: 0 auto;
    text-align: center;
  }
}

@include media-md {
  .products-subcategory-page {
    &__grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}

@include media-lg {
  .products-subcategory-page {
    &__grid {
      grid-template-columns: repeat(4, 1fr);
      margin-top: 88px;
    }
  }
}
</style>
