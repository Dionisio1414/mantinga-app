<template>
    <div>
        <Breadcrumbs 
            :breadcrumbs="breadcrumbs"
        >
        </Breadcrumbs>
        <div class="page__wrapper page__wrapper--recipes">
            <div class="page__container">
                <div class="page-recipes">
                    <RecipesHeader
                        class="page-recipes__header"
                        :title="pageTitle"
                        :contentTypes="contentTypes"
                        :categories="recipesCategories"
                        :products="productsList"
                        :recipesCookingTimes="recipesCookingTimes"
                        :recipesList="recipesList"
                        :status="status"
                        @selectHandler="formSubmitHandler"
                        @ingredientsSearchHandler="ingredientsSearchHandler"
                    >
                    </RecipesHeader>
                    <RecipesSection 
                        :recipesList="recipesList"
                        :recipeItems="recipeItems"
                        :status="status"
                        class="page-recipes__section"
                        @showMore="showMoreHanlder"
                    >
                    </RecipesSection>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Getter, Action, Watch } from 'nuxt-property-decorator'
import Breadcrumbs from '~/components/common/Breadcrumbs.vue'
import { IBreadcrumb } from '~/types/breadcrumb.interface'

import {
    RecipesHeader,
    RecipesSection
} from '~/components/recipes'
import { EStatus } from '~/constants/status'
import { IRecipe, IRecipeCategories, IRecipeGetParams, IRecipeInnerProduct, IRecipesPayloadPaginate, IRecipeTimes } from '~/types/recipes.interface'
import { Context } from '@nuxt/types'
import { IContentType } from '~/types/content-type.interface'
import { IPagination } from '~/types/pagination.interface'
import { IDictionary } from '~/types/dictionary.interface'
import { IMetaInfo } from '~/types/meta.interface'

import getRouteForFetchPage  from '~/utils/get-route-for-fetch-page'

@Component({
  components: {
    Breadcrumbs,
    RecipesHeader,
    RecipesSection
  },
})
export default class PageRecipesIndex extends Vue {
    @Getter('page-recipes-list/recipesList') public recipesList!: IRecipe[]
    @Getter('page-recipes-list/recipesForm') public recipesForm!: IRecipeGetParams
    @Getter('page-recipes-list/recipeItems') public recipeItems!: number
    @Getter('page-recipes-list/status') public status!: EStatus
    @Getter('page-recipes-list/error') public error!: Error

    @Getter('products/productsList') public productsList!: IRecipeInnerProduct[]

    @Getter('page-recipes/contentTypes') public contentTypes!: IContentType[]
    @Getter('page-recipes/pageTitle') public pageTitle!: string | null
    @Getter('page-recipes-list/recipesPagination') public recipesPagination!: IPagination
    @Getter('page-recipes/metaInfo') public metaInfo!: IMetaInfo

    @Getter('page-recipes-categories/recipesCategories') public recipesCategories!: IRecipeCategories[] | null
    @Getter('page-recipes-times/recipesTimes') public recipesCookingTimes!: IRecipeTimes[]

    @Action('page-recipes-list/fetchRecipes') public fetchRecipes!: (payload: IRecipesPayloadPaginate) => Promise<any>
    @Action('page-recipes-list/updateForm') public updateForm!: (payload: any) => Promise<any>
      
    public $t: any

    public head(): any {
        return {
            title: this.metaInfo?.title || this.pageTitle || 'Mantinga',
            meta: [
                {
                hid: 'description',
                name: 'description',
                content: this.metaInfo?.metaDescription || ''
                },
                {
                hid: 'keywords',
                name: 'keywords',
                content: this.metaInfo?.metaKeywords || ''
                },
            ],
        }
    }

    public static routeQueryToFormValue(query: IDictionary<string>): IDictionary<string> {
        const formValue: any = {}
        
        Object
            .entries(query)
            .forEach(([field, value]) => {
                try {
                    if(field === 'cookingTime') formValue[field] = value
                    formValue[field] = JSON.parse(value)
                } catch (err) {
                    console.warn(`Can't parse field '${field}'`)
                }
        })

        return formValue
    }

    private get formValueToRouteQuery(): IDictionary<string> {
        const query: IDictionary<string> = {}
        
        Object
            .entries({ ...this.recipesForm })
            .forEach(([field, value]) => {

                if(value && typeof value !== 'object') {
                    query[field] = JSON.stringify(value)
                }

                if(value && typeof value === 'object' && value.length) {
                    query[field] = JSON.stringify(value)
                }

                if(value && typeof value === 'string') {
                    query[field] = value
                }
        })

        if(query.hasOwnProperty('order[date]')) delete query['order[date]']
        
        return query
    }

    public get breadcrumbs(): IBreadcrumb[] {
        return [
            {
                key: this.$t('breadcrumbs.recipes').toString(),
                title: this.$t('breadcrumbs.recipes').toString(),
                link: '/',
            }
        ]
    }

    public showMoreHanlder(): void {
        this.fetchRecipes({ params: this.recipesForm, paginate: true })
    }

    public ingredientsSearchHandler(): void {
        console.log('ingredientsSearchHandler')
    }

    public formSubmitHandler(): void {
        const query: IDictionary<string> = this.formValueToRouteQuery
        this.$router.push({ query })
    }

    public async asyncData({ store, error, from, query, route }: Context): Promise<any> {
        const recipesList: IRecipe[] = store.getters['page-recipes-list/recipesList']
        const fromFullPath = from?.fullPath || ''
        const fromId = from?.params?.id || ''
        const slug = getRouteForFetchPage(route.path);

        if(fromFullPath !== `/recipes/${fromId}` || (!recipesList || !recipesList.length)) {
            try {
                const parsedForm: IRecipeGetParams = PageRecipesIndex.routeQueryToFormValue(query as IDictionary<string>)

                await Promise.all([
                    store.dispatch('page-recipes-categories/fetchRecipeCategories'),
                    store.dispatch('page-recipes-times/fetchRecipeTimes', { 'order[position]': 'desc' }),
                    store.dispatch('products/fetchProducts'),
                    store.dispatch('page-recipes/fetchsPageRecipes', slug)
                ])

                await store.dispatch('page-recipes-list/updateForm', parsedForm)
                await store.dispatch('page-recipes-list/fetchRecipes', { 
                    params: { 
                        ...parsedForm,
                        'order[date]': 'desc' 
                    } 
                })
                
                const status: EStatus = store.getters['page-recipes-list/status']

                if(status === EStatus.ERROR) {
                    const err: any = store.getters['page-recipes-list/error']
                    throw err
                }
            } catch(e: any) {
                error(e)
            }
        }
    }

    @Watch('$route.query')
    public async onRouteQueryChanged(newValue: IDictionary<string>): Promise<any> {
        const parsedForm: any = PageRecipesIndex.routeQueryToFormValue(newValue)
        await this.updateForm(parsedForm)
        await this.fetchRecipes({ params: { ...parsedForm, 'order[date]': 'desc' } })
    }

}
</script>

<style lang="scss" scoped>
    .page {
        &__wrapper--recipes {
            overflow: visible;
            @include media-lg {
                padding-top: 45px;
            }
        }
    }

    .page-recipes {
        &__header {
            margin-bottom: 48px;
            @include media-lg {
                margin-bottom: 104px;
            }
        }
    }
</style>